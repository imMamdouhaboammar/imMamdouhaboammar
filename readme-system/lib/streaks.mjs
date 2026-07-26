function utcDateString(date) {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(dateString, amount) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return utcDateString(date);
}

export function aggregateContributionWindows(windows) {
  const totals = { commits: 0, issues: 0, pullRequests: 0, reviews: 0, restricted: 0 };
  const dayMap = new Map();

  for (const window of windows) {
    totals.commits += Number(window.commits || 0);
    totals.issues += Number(window.issues || 0);
    totals.pullRequests += Number(window.pullRequests || 0);
    totals.reviews += Number(window.reviews || 0);
    totals.restricted += Number(window.restricted || 0);
    for (const day of window.days || []) {
      const current = dayMap.get(day.date) || 0;
      dayMap.set(day.date, Math.max(current, Number(day.contributionCount || 0)));
    }
  }

  return {
    ...totals,
    days: [...dayMap.entries()]
      .map(([date, contributionCount]) => ({ date, contributionCount }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export function calculateStreaks(days, now = new Date()) {
  const active = [...new Set((days || [])
    .filter((day) => Number(day.contributionCount) > 0)
    .map((day) => day.date))]
    .sort();

  if (active.length === 0) {
    return { current: 0, longest: 0, lastActiveDate: null };
  }

  let longest = 1;
  let run = 1;
  for (let index = 1; index < active.length; index += 1) {
    if (active[index] === addUtcDays(active[index - 1], 1)) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  const today = utcDateString(now);
  const yesterday = addUtcDays(today, -1);
  const activeSet = new Set(active);
  const anchor = activeSet.has(today) ? today : activeSet.has(yesterday) ? yesterday : null;
  let current = 0;
  if (anchor) {
    let cursor = anchor;
    while (activeSet.has(cursor)) {
      current += 1;
      cursor = addUtcDays(cursor, -1);
    }
  }

  return { current, longest, lastActiveDate: active.at(-1) };
}
