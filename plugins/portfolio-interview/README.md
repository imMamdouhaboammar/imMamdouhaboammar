# Portfolio Interview for ChatGPT and Codex

A Skills-only OpenAI Plugin that interviews someone about their work, prepares a source-backed profile, and builds a static personal website with English/Arabic and RTL support when Node.js is available.

The canonical generator, schema, example profiles and Claude Code integration live in [`.claude/skills/portfolio-interview/`](../../.claude/skills/portfolio-interview/). The packaged OpenAI Plugin is fully self-contained under this folder. Runtime files are mirrored through `scripts/sync-openai.mjs`; CI fails if they drift.

## Install from this repository

The repository's `.agents/plugins/marketplace.json` includes `portfolio-interview` and points to `./plugins/portfolio-interview`. In a trusted local Codex project, add this repository as a local marketplace through the plugin marketplace workflow, select the Portfolio Interview plugin and enable it. In the ChatGPT desktop app, add this repository as a local plugin source in a supported environment, then install it from the personal Plugins section. The exact available flows depend on your host and permissions.

For offline ZIP packaging from a repository checkout:

```bash
node .claude/skills/portfolio-interview/scripts/sync-openai.mjs --check
node .claude/skills/portfolio-interview/scripts/check-openai.mjs
node .claude/skills/portfolio-interview/scripts/package-openai.mjs /tmp/portfolio-interview-plugin.zip
unzip -tq /tmp/portfolio-interview-plugin.zip
```

The archive has a single `portfolio-interview/` folder containing `plugin.json`, `.codex-plugin/plugin.json`, `skills/` and branding. Import or upload it only through a ChatGPT/Codex surface that supports local/Skills-only Plugin installation; an archive is not an automatic installation.

For standalone Codex Skill installs, the original `.claude/skills/portfolio-interview` also remains available through `npx skills add`. For Claude Code, use the root Claude marketplace and its original hooks/subagents. This OpenAI package does **not** promise that those Claude integrations run in ChatGPT or Codex.

## What it needs

- Host-native file access to prepare `profile.json`; Node.js 18+ and executable shell access to build and check the full site.
- Playwright/Chromium is optional for screenshot-based browser QA and a generated Open Graph image.
- No plugin-level OAuth, MCP server or hosted account is required.
- Without executable Node.js, the Skill still completes the interview, assembles an approved profile and provides commands to build locally. It must label the build and visual checks as not executed.

The actual steps and privacy protections are in [the portable Skill](skills/portfolio-interview/SKILL.md) and [host compatibility](skills/portfolio-interview/references/host-compatibility.md).

## Quality and distribution

`node .claude/skills/portfolio-interview/scripts/selftest.mjs` tests the existing generator. `check-openai.mjs` checks the OpenAI manifest, mirrored runtime, branding, marketplace registration, portable paths and proposed reviewer-case shapes. GitHub Actions also packages twice, compares bytes, extracts a clean ZIP and builds a fixture from the extracted package. Browser QA is not a CI requirement unless run with `--browser`.

[Reviewer notes](submission/REVIEWER.md) separate proposed prompt cases, local machine tests and OpenAI portal review. GitHub merging does not install the Plugin in anyone's account or publish it to the public Plugins Directory.
