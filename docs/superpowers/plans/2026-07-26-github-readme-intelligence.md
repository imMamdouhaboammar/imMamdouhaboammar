# GitHub README Intelligence System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and roll out one tested README intelligence system across Mamdouh Aboammar’s profile and ten public repositories.

**Architecture:** Keep all rendering, GitHub API access, summarization, and metrics logic in the public profile repository. Project repositories call one reusable workflow and contain only their initial managed block plus a scheduled caller workflow.

**Tech Stack:** Node.js 22, ECMAScript modules, Node built-in test runner, GitHub REST API, GitHub GraphQL API, GitHub Actions, optional OpenAI Responses API.

## Global Constraints
- README interaction uses native `<details>` and `<summary>` only.
- Daily summaries contain three to five bullets.
- Private repository names and activity details never enter generated output.
- OpenAI is optional and deterministic output is mandatory.
- Default branches are changed only through pull requests.
- Generated commits use the GitHub Actions bot identity.

---

### Task 1: Central contracts and tests

**Files:**
- Create: `readme-system/test/readme-system.test.mjs`
- Create: `.github/workflows/readme-system-ci.yml`

- [ ] Write failing tests for managed markers, deterministic summaries, project rendering, and contribution streaks.
- [ ] Run `node --test readme-system/test/*.test.mjs` and confirm failure because implementation modules do not exist.
- [ ] Commit the red test baseline.

### Task 2: Central implementation

**Files:**
- Create: `readme-system/lib/markers.mjs`
- Create: `readme-system/lib/github.mjs`
- Create: `readme-system/lib/summarize.mjs`
- Create: `readme-system/lib/render.mjs`
- Create: `readme-system/lib/streaks.mjs`
- Create: `readme-system/update-project.mjs`
- Create: `readme-system/update-profile.mjs`
- Create: `readme-system/projects.json`

- [ ] Implement the smallest functions required by the tests.
- [ ] Add public activity collection with a seven-day fallback.
- [ ] Add optional OpenAI summarization with deterministic fallback.
- [ ] Add yearly GraphQL aggregation and private-safe streak calculation.
- [ ] Run the complete Node test suite and confirm all tests pass.

### Task 3: Reusable automation and profile README

**Files:**
- Create: `.github/workflows/update-project-story-card.yml`
- Create: `.github/workflows/update-profile-metrics.yml`
- Modify: `README.md`
- Create: `readme-system/README.md`

- [ ] Add minimum workflow permissions and concurrency guards.
- [ ] Render the initial profile metrics block with honest setup state.
- [ ] Rewrite the profile introduction around real problems turned into public tools.
- [ ] Document `PROFILE_METRICS_TOKEN` and optional `OPENAI_API_KEY` setup.
- [ ] Run tests and a dry-run render against a temporary README.

### Task 4: Ten repository rollouts

**Files in each repository:**
- Create: `.github/workflows/readme-story-card.yml`
- Modify: `README.md`

- [ ] Create one feature branch per repository.
- [ ] Insert the managed card after the existing hero or opening description.
- [ ] Point the scheduled caller at the central reusable workflow.
- [ ] Validate markers, project configuration, and YAML syntax.
- [ ] Commit one focused rollout change per repository.

### Task 5: Verification and pull requests

- [ ] Run the central tests.
- [ ] Run YAML parsing against all added workflows.
- [ ] Verify every branch diff contains only the managed README block and workflow.
- [ ] Push all feature branches.
- [ ] Open one documented pull request per repository.
- [ ] Report secret setup steps and any repository-specific caveats.
