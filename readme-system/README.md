# README Intelligence System

This directory powers the managed project cards and aggregate contribution metrics used across Mamdouh Aboammar's public GitHub repositories.

## What it does

- Explains the recurring real-world problem behind each project.
- Produces a three-to-five point public activity summary.
- Uses the OpenAI Responses API only when an optional key is available.
- Falls back to deterministic wording when AI is unavailable.
- Counts GitHub-recognized commit contributions across yearly windows.
- Calculates current and longest streaks from commits, pull requests, issues, and reviews.
- Never writes private repository names or private activity details.

## Required profile secret

Create a repository secret named `PROFILE_METRICS_TOKEN` in the profile repository. Use a token owned by `imMamdouhaboammar` that can read the private repositories whose aggregate contributions should count. For a classic personal access token, `repo` plus `read:user` provides the required private repository and contribution visibility. Authorize the token for organization SSO where applicable.

Do not paste the token into a workflow file, README, issue, pull request, or command history.

## Optional project secret

Each project may define `OPENAI_API_KEY`. When absent, the workflow still succeeds with the tested deterministic summarizer. The AI prompt contains only public activity from the target public repository.

## Managed markers

Project repositories must contain exactly one pair:

```html
<!-- project-story:start -->
<!-- project-story:end -->
```

The profile README must contain exactly one pair:

```html
<!-- profile-metrics:start -->
<!-- profile-metrics:end -->
```

The updater refuses to write when markers are missing, duplicated, or reversed.

## Local verification

```bash
node --test readme-system/test/*.test.mjs
node --check readme-system/update-project.mjs
node --check readme-system/update-profile.mjs
```

To refresh profile metrics locally without storing the token in files:

```bash
PROFILE_METRICS_TOKEN="$(gh auth token)" node readme-system/update-profile.mjs
```
