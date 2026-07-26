import test from 'node:test';
import assert from 'node:assert/strict';

import { replaceManagedBlock } from '../lib/markers.mjs';
import { deterministicSummary } from '../lib/summarize.mjs';
import { renderProjectBlock, renderProfileMetricsBlock, renderPushonomicsBlock } from '../lib/render.mjs';
import { calculateStreaks, aggregateContributionWindows } from '../lib/streaks.mjs';
import { estimatePushonomics, mergeLineWindows } from '../lib/tokenomics.mjs';

const EMOJI_PATTERN = /[\u{1F300}-\u{1FAFF}]/u;

test('replaceManagedBlock changes only the selected marker range', () => {
  const source = ['before', '<!-- project-story:start -->', 'old', '<!-- project-story:end -->', 'after'].join('\n');
  const result = replaceManagedBlock(source, 'project-story', 'new');
  assert.equal(result, ['before', '<!-- project-story:start -->', 'new', '<!-- project-story:end -->', 'after'].join('\n'));
});

test('replaceManagedBlock rejects missing or duplicated markers', () => {
  assert.throws(() => replaceManagedBlock('plain README', 'project-story', 'new'), /marker/i);
  const duplicate = '<!-- x:start -->\na\n<!-- x:end -->\n<!-- x:start -->\nb\n<!-- x:end -->';
  assert.throws(() => replaceManagedBlock(duplicate, 'x', 'new'), /exactly one/i);
});

test('deterministicSummary always returns three to five useful bullets', () => {
  const bullets = deterministicSummary({
    commits: [{ message: 'Add architecture policy checks' }, { message: 'Fix dashboard escaping' }],
    pullRequests: [{ number: 42, title: 'Add provider approval broker', state: 'open' }],
    issues: [],
    releases: [{ tagName: 'v1.15.0', name: 'Agent Kernel 1.15.0' }],
    windowDays: 1,
  });
  assert.ok(bullets.length >= 3 && bullets.length <= 5);
  assert.match(bullets.join(' '), /architecture policy|provider approval|v1\.15\.0/i);
});

test('renderProjectBlock is expandable, minimal, and search friendly', () => {
  const block = renderProjectBlock({
    project: {
      name: 'Agent Kernel',
      repository: 'imMamdouhaboammar/agent-kernel',
      logo: './docs/brand/agent-kernel-logo.svg',
      problem: 'Coding agents repeatedly lose project context and architecture rules.',
      goal: 'Keep durable local memory and reviewed boundaries around existing agents.',
      audience: 'Developers using coding agents in real repositories.',
      keywords: ['AI coding agent memory', 'local agent governance', 'architecture guardrails'],
    },
    bullets: ['Added one policy check.', 'Fixed one report.', 'Documented one workflow.'],
    updatedAt: '2026-07-26T06:00:00.000Z',
    source: 'deterministic',
  });
  assert.match(block, /<details open>/);
  assert.match(block, /Why I built Agent Kernel/);
  assert.match(block, /Problem to project/);
  assert.match(block, /Coding agents repeatedly lose project context/);
  assert.match(block, /AI coding agent memory/);
  assert.match(block, /docs\/brand\/agent-kernel-logo\.svg/);
  assert.doesNotMatch(block, EMOJI_PATTERN);
  assert.doesNotMatch(block, /for-the-badge/i);
});

test('calculateStreaks returns current and longest cross-year activity streaks', () => {
  const days = [
    { date: '2026-07-20', contributionCount: 1 },
    { date: '2026-07-21', contributionCount: 2 },
    { date: '2026-07-23', contributionCount: 1 },
    { date: '2026-07-24', contributionCount: 3 },
    { date: '2026-07-25', contributionCount: 1 },
  ];
  const result = calculateStreaks(days, new Date('2026-07-26T06:00:00Z'));
  assert.deepEqual(result, { current: 3, longest: 3, lastActiveDate: '2026-07-25' });
});

test('aggregateContributionWindows sums totals and de-duplicates calendar days', () => {
  const result = aggregateContributionWindows([
    { commits: 5, issues: 1, pullRequests: 2, reviews: 3, restricted: 4, days: [{ date: '2025-12-31', contributionCount: 2 }] },
    { commits: 7, issues: 2, pullRequests: 1, reviews: 4, restricted: 5, days: [{ date: '2025-12-31', contributionCount: 2 }, { date: '2026-01-01', contributionCount: 1 }] },
  ]);
  assert.equal(result.commits, 12);
  assert.equal(result.restricted, 9);
  assert.deepEqual(result.days, [
    { date: '2025-12-31', contributionCount: 2 },
    { date: '2026-01-01', contributionCount: 1 },
  ]);
});

test('renderProfileMetricsBlock is compact and excludes private names', () => {
  const block = renderProfileMetricsBlock({
    commits: 1200,
    currentStreak: 9,
    longestStreak: 41,
    yearContributions: 356,
    updatedAt: '2026-07-26T06:00:00.000Z',
  });
  assert.match(block, /1,200/);
  assert.match(block, /Current streak/);
  assert.match(block, /Longest streak/);
  assert.doesNotMatch(block, /private\//i);
  assert.doesNotMatch(block, EMOJI_PATTERN);
  assert.doesNotMatch(block, /for-the-badge/i);
});

test('mergeLineWindows sums line totals without exposing repository names', () => {
  const merged = mergeLineWindows([
    { year: 2025, additions: 800, deletions: 200, commits: 10, mergesExcluded: 1 },
    { year: 2026, additions: 1200, deletions: 300, commits: 20, mergesExcluded: 2 },
  ]);
  assert.deepEqual(merged, {
    additions: 2000,
    deletions: 500,
    changedLines: 2500,
    commits: 30,
    mergesExcluded: 3,
  });
  assert.doesNotMatch(JSON.stringify(merged), /repository/i);
});

test('estimatePushonomics converts changed lines into transparent model scenarios', () => {
  const result = estimatePushonomics({ additions: 1000, deletions: 250 });
  assert.equal(result.changedLines, 1250);
  assert.equal(result.estimatedOutputTokens, 10000);
  assert.equal(result.estimatedInputTokens, 30000);
  assert.equal(result.estimatedSessionTokens, 40000);
  assert.equal(result.models['GPT-5.6 Sol'].estimatedCostUsd, 0.45);
  assert.equal(result.models['Claude Fable 5'].estimatedCostUsd, 0.8);
});

test('renderPushonomicsBlock keeps wordplay without side notes', () => {
  const estimate = estimatePushonomics({ additions: 1000, deletions: 250 });
  const block = renderPushonomicsBlock({
    ...estimate,
    commitsScanned: 30,
    mergesExcluded: 2,
    updatedAt: '2026-07-26T06:00:00.000Z',
  });
  assert.match(block, /Pushonomics/);
  assert.match(block, /Every line has a token tab/);
  assert.match(block, /GPT-5\.6 Sol/);
  assert.match(block, /Claude Fable 5/);
  assert.match(block, /estimate, not an invoice/i);
  assert.doesNotMatch(block, EMOJI_PATTERN);
  assert.doesNotMatch(block, /for-the-badge/i);
  assert.doesNotMatch(block, /How these|nutrition label|side note/i);
});
