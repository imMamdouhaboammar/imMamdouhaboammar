#!/usr/bin/env node
// Builds every valid fixture, runs the checks, and confirms the invalid
// fixture is rejected. Browser checks run only with --browser.
//   node scripts/selftest.mjs [--browser]

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fx = (n) => join(root, 'evals', 'fixtures', n);
const run = (script, args) => execFileSync(process.execPath, [join(root, 'scripts', script), ...args], { encoding: 'utf8', stdio: 'pipe' });
const browser = process.argv.includes('--browser') ? [] : ['--no-browser'];
const work = mkdtempSync(join(tmpdir(), 'portfolio-selftest-'));
let failed = 0;

function expect(ok, label) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`);
  if (!ok) failed++;
}

try {
  for (const name of ['designer-bilingual.json', 'lawyer-arabic.json']) {
    const out = join(work, name.replace('.json', ''));
    run('build.mjs', [fx(name), '--out', out]);
    expect(existsSync(join(out, 'index.html')) && existsSync(join(out, 'llms.txt')), `${name} builds`);
    try {
      run('check.mjs', [fx(name), out, '--shots', join(work, 'shots'), ...browser]);
      expect(true, `${name} passes checks`);
    } catch (e) {
      expect(false, `${name} passes checks\n${e.stdout || e.message}`);
    }
  }
  expect(existsSync(join(work, 'designer-bilingual', 'ar', 'index.html')), 'second locale lands in /ar/');

  const bad = join(work, 'invalid');
  run('build.mjs', [fx('invalid-copy.json'), '--out', bad]);
  let output = '';
  try { run('check.mjs', [fx('invalid-copy.json'), bad, '--no-browser']); } catch (e) { output = e.stdout || ''; }
  for (const needle of ['em dash', 'not just', 'banned word "unlock"', 'ده مش X', 'has no source', 'must be an absolute https', 'has no name']) {
    expect(output.includes(needle), `invalid fixture is rejected for: ${needle}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (failed) { console.log(`\n${failed} failure(s)`); process.exit(1); }
console.log('\nselftest passed');
