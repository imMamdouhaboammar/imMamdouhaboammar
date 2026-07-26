const API_ROOT = 'https://api.github.com';

export async function githubRequest(path, {
  token,
  method = 'GET',
  body,
  accept = 'application/vnd.github+json',
  logLabel,
} = {}) {
  const response = await fetch(path.startsWith('http') ? path : `${API_ROOT}${path}`, {
    method,
    headers: {
      accept,
      authorization: token ? `Bearer ${token}` : undefined,
      'content-type': body ? 'application/json' : undefined,
      'x-github-api-version': '2022-11-28',
      'user-agent': 'mamdouh-readme-intelligence',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    const safeTarget = logLabel || (path.startsWith('http') ? 'GitHub resource' : path);
    throw new Error(`GitHub API ${method} ${safeTarget} failed with HTTP ${response.status}: ${text.slice(0, 180)}`);
  }
  return response.json();
}

function asDate(value) {
  return value ? new Date(value) : new Date(0);
}

export async function collectRepositoryActivity({ repository, token, now = new Date(), primaryWindowDays = 1, fallbackWindowDays = 7 }) {
  const fallbackSince = new Date(now.getTime() - fallbackWindowDays * 86_400_000);
  const primarySince = new Date(now.getTime() - primaryWindowDays * 86_400_000);
  const encoded = encodeURIComponent(fallbackSince.toISOString());

  const [rawCommits, rawPulls, rawIssues, rawReleases] = await Promise.all([
    githubRequest(`/repos/${repository}/commits?since=${encoded}&per_page=100`, { token }),
    githubRequest(`/repos/${repository}/pulls?state=all&sort=updated&direction=desc&per_page=100`, { token }),
    githubRequest(`/repos/${repository}/issues?state=all&since=${encoded}&per_page=100`, { token }),
    githubRequest(`/repos/${repository}/releases?per_page=30`, { token }),
  ]);

  const commits = rawCommits
    .filter((item) => item.author?.type !== 'Bot' && !/\[bot\]/i.test(item.commit?.author?.name || ''))
    .map((item) => ({
      message: String(item.commit?.message || '').split('\n')[0],
      date: item.commit?.author?.date,
      sha: item.sha,
      url: item.html_url,
    }));
  const pullRequests = rawPulls.map((item) => ({
    number: item.number,
    title: item.title,
    state: item.merged_at ? 'merged' : item.state,
    updatedAt: item.updated_at,
    url: item.html_url,
  }));
  const issues = rawIssues
    .filter((item) => !item.pull_request)
    .map((item) => ({ number: item.number, title: item.title, state: item.state, updatedAt: item.updated_at, url: item.html_url }));
  const releases = rawReleases.map((item) => ({ tagName: item.tag_name, name: item.name, publishedAt: item.published_at, url: item.html_url }));

  const select = (since) => ({
    commits: commits.filter((item) => asDate(item.date) >= since),
    pullRequests: pullRequests.filter((item) => asDate(item.updatedAt) >= since),
    issues: issues.filter((item) => asDate(item.updatedAt) >= since),
    releases: releases.filter((item) => asDate(item.publishedAt) >= since),
  });
  const primary = select(primarySince);
  const primaryTotal = Object.values(primary).reduce((sum, items) => sum + items.length, 0);
  return primaryTotal > 0
    ? { ...primary, windowDays: primaryWindowDays }
    : { ...select(fallbackSince), windowDays: fallbackWindowDays };
}

const CONTRIBUTIONS_QUERY = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

export async function collectContributionWindows({ username, token, now = new Date() }) {
  if (!token) throw new Error('PROFILE_METRICS_TOKEN is required.');
  const user = await githubRequest(`/users/${username}`, { token });
  const firstYear = new Date(user.created_at).getUTCFullYear();
  const lastYear = now.getUTCFullYear();
  const windows = [];

  for (let year = firstYear; year <= lastYear; year += 1) {
    const from = new Date(Date.UTC(year, 0, 1));
    const endOfYear = new Date(Date.UTC(year + 1, 0, 1) - 1_000);
    const to = endOfYear < now ? endOfYear : now;
    const payload = await githubRequest('/graphql', {
      token,
      method: 'POST',
      body: { query: CONTRIBUTIONS_QUERY, variables: { login: username, from: from.toISOString(), to: to.toISOString() } },
    });
    if (payload.errors?.length) throw new Error(`GitHub GraphQL contribution query failed: ${payload.errors[0].message}`);
    const collection = payload.data?.user?.contributionsCollection;
    if (!collection) throw new Error(`No contribution collection returned for ${year}.`);
    windows.push({
      year,
      commits: collection.totalCommitContributions,
      issues: collection.totalIssueContributions,
      pullRequests: collection.totalPullRequestContributions,
      reviews: collection.totalPullRequestReviewContributions,
      restricted: collection.restrictedContributionsCount,
      calendarTotal: collection.contributionCalendar.totalContributions,
      days: collection.contributionCalendar.weeks.flatMap((week) => week.contributionDays),
    });
  }
  return windows;
}
