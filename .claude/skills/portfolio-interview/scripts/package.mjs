#!/usr/bin/env node
// Packs the skill into a ZIP for claude.ai (Customize > Skills > Upload a skill)
// or any host that imports a zipped skill folder.
//   node scripts/package.mjs [out.zip]
// The archive holds one top-level folder named after the skill. Evals and
// fixtures stay out: the uploaded skill only needs what it runs.

import { execFileSync } from 'node:child_process';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rmSync, existsSync } from 'node:fs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const name = basename(root);
const out = resolve(process.argv[2] || join(process.cwd(), `${name}.zip`));
rmSync(out, { force: true });

const include = ['SKILL.md', 'README.md', 'references', 'scripts', 'assets', 'agents'].filter((p) => existsSync(join(root, p)));
try {
  execFileSync('zip', ['-rqX', out, ...include.map((p) => join(name, p))], { cwd: dirname(root), stdio: 'inherit' });
} catch {
  // No zip binary (common on Windows): fall back to Python's zipfile.
  const py = `import os,sys,zipfile
root,name,out=sys.argv[1],sys.argv[2],sys.argv[3]
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for top in sys.argv[4:]:
        p=os.path.join(root,top)
        files=[p] if os.path.isfile(p) else [os.path.join(d,f) for d,_,fs in os.walk(p) for f in fs]
        for f in sorted(files):
            z.write(f, os.path.join(name, os.path.relpath(f, root)))`;
  execFileSync(process.platform === 'win32' ? 'python' : 'python3', ['-c', py, root, name, out, ...include], { stdio: 'inherit' });
}
console.log(`packed ${name} -> ${out}`);
