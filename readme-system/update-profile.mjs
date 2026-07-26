import fs from 'node:fs/promises';
import path from 'node:path';

import { collectContributionWindows } from './lib/github.mjs';
import { replaceManagedBlock } from './lib/markers.mjs';
import { renderProfileMetricsBlock } from './lib/render.mjs';
import { aggregateContributionWindows, calculateStreaks } from './lib/streaks.mjs';

const token = process.env.PROFILE_METRICS_TOKEN;
const username = process.env.PROFILE_USERNAME || 'imMamdouhaboammar';
if (!token) throw new Error('PROFILE_METRICS_TOKEN is required to include token-visible private contributions.');

const now = new Date();
const windows = await collectContributionWindows({ username, token, now });
const totals = aggregateContributionWindows(windows);
const streaks = calculateStreaks(totals.days, now);
const currentYear = windows.find((window) => window.year === now.getUTCFullYear());
const block = renderProfileMetricsBlock({
  commits: totals.commits,
  currentStreak: streaks.current,
  longestStreak: streaks.longest,
  yearContributions: currentYear?.calendarTotal || 0,
  updatedAt: now.toISOString().replace('.000Z', 'Z'),
});
const readmePath = path.resolve(process.env.TARGET_README || 'README.md');
const before = await fs.readFile(readmePath, 'utf8');
const after = replaceManagedBlock(before, 'profile-metrics', block);
if (before !== after) await fs.writeFile(readmePath, after);
console.log(`Profile metrics ${before === after ? 'already current' : 'updated'}: ${totals.commits} commits, ${streaks.current}-day current streak, ${streaks.longest}-day longest streak.`);
