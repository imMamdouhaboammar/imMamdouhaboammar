import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectRepositoryActivity } from './lib/github.mjs';
import { replaceManagedBlock } from './lib/markers.mjs';
import { renderProjectBlock } from './lib/render.mjs';
import { createSummary } from './lib/summarize.mjs';

const systemRoot = path.dirname(fileURLToPath(import.meta.url));
const projects = JSON.parse(await fs.readFile(path.join(systemRoot, 'projects.json'), 'utf8'));
const repository = process.env.TARGET_REPOSITORY || process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
if (!repository || !projects[repository]) throw new Error(`No README project configuration found for ${repository || 'unknown repository'}.`);
if (!token) throw new Error('GITHUB_TOKEN is required.');

const project = projects[repository];
const activity = await collectRepositoryActivity({ repository, token });
const summary = await createSummary({
  project,
  activity,
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_SUMMARY_MODEL || 'gpt-5-mini',
});
const updatedAt = new Date().toISOString().replace('.000Z', 'Z');
const block = renderProjectBlock({ project, bullets: summary.bullets, updatedAt, source: summary.source });
const readmePath = path.resolve(process.env.TARGET_README || 'README.md');
const before = await fs.readFile(readmePath, 'utf8');
const after = replaceManagedBlock(before, 'project-story', block);
if (before !== after) await fs.writeFile(readmePath, after);
console.log(`README project card ${before === after ? 'already current' : 'updated'} using ${summary.source} summary.`);
