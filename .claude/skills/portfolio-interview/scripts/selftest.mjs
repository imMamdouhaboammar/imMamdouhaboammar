#!/usr/bin/env node
// Builds every valid fixture, runs the checks, and confirms the invalid
// fixture is rejected. Browser checks run only with --browser.
//   node scripts/selftest.mjs [--browser]

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
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

  // Variants of the bilingual fixture for edge cases found in review.
  const base = JSON.parse(readFileSync(fx('designer-bilingual.json'), 'utf8'));
  const variant = (name, mutate) => {
    const p = structuredClone(base);
    mutate(p);
    const file = join(work, `${name}.json`);
    writeFileSync(file, JSON.stringify(p));
    return file;
  };

  // External avatar + no site.url: localized pages keep the absolute URL and
  // no page links to a sitemap that was never written.
  const extFile = variant('external-avatar', (p) => {
    p.person.avatar = 'https://github.com/octocat.png?size=600';
    delete p.site.url;
    p.work = p.work.map(({ image, ...w }) => w);
  });
  const extOut = join(work, 'external-avatar');
  run('build.mjs', [extFile, '--out', extOut]);
  const arHtml = readFileSync(join(extOut, 'ar', 'index.html'), 'utf8');
  expect(!arHtml.includes('../https://'), 'external avatar is not prefixed with ../ on /ar/');
  expect(!arHtml.includes('sitemap.xml') && !existsSync(join(extOut, 'sitemap.xml')), 'no sitemap link or file without site.url');
  try {
    run('check.mjs', [extFile, extOut, '--no-browser']);
    expect(true, 'external avatar + no site.url passes checks');
  } catch (e) {
    expect(false, `external avatar + no site.url passes checks\n${e.stdout || e.message}`);
  }

  // Dropping a locale removes its old page from the same output folder.
  const enOnly = variant('en-only', (p) => { p.locales = ['en']; });
  run('build.mjs', [enOnly, '--out', extOut]);
  expect(!existsSync(join(extOut, 'ar')), 'rebuild without Arabic removes the stale /ar/ page');

  // A hidden email alone is not a contact route.
  const hidden = variant('hidden-email', (p) => { p.person.showEmail = false; delete p.person.whatsapp; p.socials = []; });
  let hiddenOut = '';
  try { run('check.mjs', [hidden, join(work, 'designer-bilingual'), '--no-browser']); } catch (e) { hiddenOut = e.stdout || ''; }
  expect(hiddenOut.includes('no public contact route'), 'hidden email with no other route is rejected');

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
