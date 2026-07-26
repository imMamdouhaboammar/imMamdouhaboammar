import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectContributionWindows } from './lib/github.mjs';
import { replaceManagedBlock } from './lib/markers.mjs';
import { collectPushedLineWindows } from './lib/push-lines.mjs';
import { renderProfileMetricsBlock, renderPushonomicsBlock } from './lib/render.mjs';
import { aggregateContributionWindows, calculateStreaks } from './lib/streaks.mjs';
import { estimatePushonomics, mergeLineWindows } from './lib/tokenomics.mjs';

const token = process.env.PROFILE_METRICS_TOKEN;
const username = process.env.PROFILE_USERNAME || 'imMamdouhaboammar';
if (!token) throw new Error('PROFILE_METRICS_TOKEN is required to include token-visible private contributions.');

const systemRoot = path.dirname(fileURLToPath(import.meta.url));
const cachePath = path.resolve(process.env.PUSH_LINES_CACHE || path.join(systemRoot, 'generated/push-lines.json'));
const readmePath = path.resolve(process.env.TARGET_README || 'README.md');
const now = new Date();

async function readLineCache() {
  try {
    return JSON.parse(await fs.readFile(cachePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return { version: 1, years: {} };
    throw error;
  }
}

const windows = await collectContributionWindows({ username, token, now });
const totals = aggregateContributionWindows(windows);
const streaks = calculateStreaks(totals.days, now);
const currentYear = windows.find((window) => window.year === now.getUTCFullYear());
const updatedAt = now.toISOString().replace('.000Z', 'Z');
const metricsBlock = renderProfileMetricsBlock({
  commits: totals.commits,
  currentStreak: streaks.current,
  longestStreak: streaks.longest,
  yearContributions: currentYear?.calendarTotal || 0,
  updatedAt,
});

const existingCache = await readLineCache();
let lineCollection;
try {
  lineCollection = await collectPushedLineWindows({ username, token, now, cache: existingCache });
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, `${JSON.stringify(lineCollection.cache, null, 2)}\n`);
} catch (error) {
  const cachedWindows = Object.values(existingCache?.years || {});
  if (cachedWindows.length === 0) throw error;
  console.warn(`Pushed line scan unavailable; using aggregate cache: ${error.message}`);
  lineCollection = { windows: cachedWindows, cache: existingCache };
}

const lineTotals = mergeLineWindows(lineCollection.windows);
const estimate = estimatePushonomics(lineTotals);
const pushonomicsBlock = renderPushonomicsBlock({
  ...estimate,
  commitsScanned: lineTotals.commits,
  mergesExcluded: lineTotals.mergesExcluded,
  updatedAt,
});

const before = await fs.readFile(readmePath, 'utf8');
const withMetrics = replaceManagedBlock(before, 'profile-metrics', metricsBlock);
const after = replaceManagedBlock(withMetrics, 'pushonomics', pushonomicsBlock);
if (before !== after) await fs.writeFile(readmePath, after);

console.log(`Profile metrics ${before === after ? 'already current' : 'updated'}: ${totals.commits} commits, ${streaks.current}-day current streak, ${streaks.longest}-day longest streak.`);
console.log(`Pushonomics updated from ${lineTotals.commits} non-merge commits and ${lineTotals.changedLines} changed lines.`);
