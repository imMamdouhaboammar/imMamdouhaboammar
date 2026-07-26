import { githubRequest } from './github.mjs';

const MAX_SEARCH_RESULTS = 1000;
const SEARCH_PAGE_SIZE = 100;
const DETAIL_CONCURRENCY = 8;

function toIso(date) {
  return new Date(date).toISOString();
}

function midpoint(from, to) {
  return new Date((new Date(from).getTime() + new Date(to).getTime()) / 2);
}

async function mapConcurrent(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function searchCommitPage({ username, token, from, to, page }) {
  const query = `author:${username} committer-date:${toIso(from)}..${toIso(to)}`;
  return githubRequest(`/search/commits?q=${encodeURIComponent(query)}&sort=committer-date&order=asc&per_page=${SEARCH_PAGE_SIZE}&page=${page}`, {
    token,
    accept: 'application/vnd.github+json',
    logLabel: 'commit search',
  });
}

async function searchCommitsInRange({ username, token, from, to }) {
  const first = await searchCommitPage({ username, token, from, to, page: 1 });
  if (first.incomplete_results) {
    throw new Error('GitHub commit search returned incomplete results.');
  }

  if (first.total_count > MAX_SEARCH_RESULTS) {
    const split = midpoint(from, to);
    const [left, right] = await Promise.all([
      searchCommitsInRange({ username, token, from, to: split }),
      searchCommitsInRange({ username, token, from: split, to }),
    ]);
    const unique = new Map([...left, ...right].map((item) => [`${item.repository?.id || 'repo'}:${item.sha}`, item]));
    return [...unique.values()];
  }

  const items = [...first.items];
  const pageCount = Math.ceil(first.total_count / SEARCH_PAGE_SIZE);
  for (let page = 2; page <= pageCount; page += 1) {
    const result = await searchCommitPage({ username, token, from, to, page });
    if (result.incomplete_results) throw new Error('GitHub commit search returned incomplete results.');
    items.push(...result.items);
  }

  const unique = new Map(items.map((item) => [`${item.repository?.id || 'repo'}:${item.sha}`, item]));
  return [...unique.values()];
}

async function scanYear({ username, token, year, now }) {
  const from = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year + 1, 0, 1) - 1000);
  const to = endOfYear < now ? endOfYear : now;
  const commits = await searchCommitsInRange({ username, token, from, to });
  const details = await mapConcurrent(commits, DETAIL_CONCURRENCY, (item) => githubRequest(item.url, {
    token,
    logLabel: 'commit details',
  }));

  let additions = 0;
  let deletions = 0;
  let countedCommits = 0;
  let mergesExcluded = 0;

  for (const detail of details) {
    if ((detail.parents || []).length > 1) {
      mergesExcluded += 1;
      continue;
    }
    if (!detail.stats) throw new Error('GitHub commit details did not include line statistics.');
    additions += Number(detail.stats.additions || 0);
    deletions += Number(detail.stats.deletions || 0);
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
