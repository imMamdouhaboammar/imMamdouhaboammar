import { githubRequest } from './github.mjs';

const MAX_SEARCH_RESULTS = 1000;
const SEARCH_PAGE_SIZE = 100;
const SEARCH_INTERVAL_MS = 2200;
const GRAPHQL_BATCH_SIZE = 100;

let lastSearchRequestAt = 0;

function toIso(date) {
  return new Date(date).toISOString();
}

function midpoint(from, to) {
  return new Date((new Date(from).getTime() + new Date(to).getTime()) / 2);
}

function chunk(items, size) {
  const groups = [];
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }
  return groups;
}

async function waitForSearchSlot() {
  const elapsed = Date.now() - lastSearchRequestAt;
  const delay = Math.max(0, SEARCH_INTERVAL_MS - elapsed);
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  lastSearchRequestAt = Date.now();
}

async function searchCommitPage({ username, token, from, to, page }) {
  await waitForSearchSlot();
  const query = `author:${username} committer-date:${toIso(from)}..${toIso(to)}`;
  return githubRequest(`/search/commits?q=${encodeURIComponent(query)}&sort=committer-date&order=asc&per_page=${SEARCH_PAGE_SIZE}&page=${page}`, {
    token,
    accept: 'application/vnd.github+json',
    logLabel: 'commit search',
  });
}

function uniqueCommits(items) {
  return [...new Map(items.map((item) => [item.node_id || `${item.repository?.id || 'repo'}:${item.sha}`, item])).values()];
}

async function searchCommitsInRange({ username, token, from, to }) {
  const first = await searchCommitPage({ username, token, from, to, page: 1 });
  if (first.incomplete_results) {
    throw new Error('GitHub commit search returned incomplete results.');
  }

  if (first.total_count > MAX_SEARCH_RESULTS) {
    const split = midpoint(from, to);
    if (split <= from || split >= to) {
      throw new Error('Commit search range could not be split below the GitHub result limit.');
    }
    const left = await searchCommitsInRange({ username, token, from, to: new Date(split.getTime() - 1) });
    const right = await searchCommitsInRange({ username, token, from: split, to });
    return uniqueCommits([...left, ...right]);
  }

  const items = [...first.items];
  const pageCount = Math.ceil(first.total_count / SEARCH_PAGE_SIZE);
  for (let page = 2; page <= pageCount; page += 1) {
    const result = await searchCommitPage({ username, token, from, to, page });
    if (result.incomplete_results) throw new Error('GitHub commit search returned incomplete results.');
    items.push(...result.items);
  }

  return uniqueCommits(items);
}

const COMMIT_STATS_QUERY = `
query($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Commit {
      oid
      additions
      deletions
      parents(first: 2) { totalCount }
    }
  }
}`;

async function collectCommitStats({ commits, token }) {
  const stats = [];
  for (const group of chunk(commits, GRAPHQL_BATCH_SIZE)) {
    const ids = group.map((item) => item.node_id).filter(Boolean);
    if (ids.length !== group.length) {
      throw new Error('GitHub commit search omitted one or more commit node IDs.');
    }
    const payload = await githubRequest('/graphql', {
      token,
      method: 'POST',
      body: { query: COMMIT_STATS_QUERY, variables: { ids } },
      logLabel: 'commit stats batch',
    });
    if (payload.errors?.length) {
      throw new Error(`GitHub commit stats query failed: ${payload.errors[0].message}`);
    }
    if (!Array.isArray(payload.data?.nodes) || payload.data.nodes.some((node) => !node)) {
      throw new Error('GitHub commit stats query returned incomplete nodes.');
    }
    stats.push(...payload.data.nodes);
  }
  return stats;
}

async function scanYear({ username, token, year, now }) {
  const from = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year + 1, 0, 1) - 1000);
  const to = endOfYear < now ? endOfYear : now;
  const commits = await searchCommitsInRange({ username, token, from, to });
  const details = await collectCommitStats({ commits, token });

  let additions = 0;
  let deletions = 0;
  let countedCommits = 0;
  let mergesExcluded = 0;

  for (const detail of details) {
    if (Number(detail.parents?.totalCount || 0) > 1) {
      mergesExcluded += 1;
      continue;
    }
    additions += Number(detail.additions || 0);
    deletions += Number(detail.deletions || 0);
    countedCommits += 1;
  }

  return {
    year,
    additions,
    deletions,
    commits: countedCommits,
    mergesExcluded,
    complete: year < now.getUTCFullYear(),
  };
}

export async function collectPushedLineWindows({
  username,
  token,
  now = new Date(),
  cache = { version: 1, years: {} },
} = {}) {
  if (!username) throw new Error('A GitHub username is required for pushed line metrics.');
  if (!token) throw new Error('PROFILE_METRICS_TOKEN is required for pushed line metrics.');

  const user = await githubRequest(`/users/${username}`, { token, logLabel: 'profile lookup' });
  const firstYear = new Date(user.created_at).getUTCFullYear();
  const lastYear = now.getUTCFullYear();
  const windows = [];

  for (let year = firstYear; year <= lastYear; year += 1) {
    const cached = cache?.years?.[String(year)];
    if (year < lastYear && cached?.complete) {
      windows.push({ ...cached, year });
      continue;
    }
    windows.push(await scanYear({ username, token, year, now }));
  }

  return {
    windows,
    cache: {
      version: 1,
      updatedAt: now.toISOString(),
      years: Object.fromEntries(windows.map((window) => [String(window.year), window])),
    },
  };
}
