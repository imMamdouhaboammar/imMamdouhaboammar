# Reviewer preparation: proposed tests, not a submission claim

Package version: 2.1.0. Route: Skills-only, no bundled MCP or app mapping. Source: this repository's canonical creative skill.

The five positive and three negative prompts in proposed-reviewer-cases.json are **planned** tests. They need to be executed against the exact packaged version with saved outputs and a reviewer assessment. Passing structural validation or GitHub Actions does not demonstrate that the plugin's actual humor, cultural accuracy or visual production quality meets these expectations.

## Product boundaries

Supported: create, audit, localize and plan memes; write captions and visual briefs; propose a portable taste profile from user-supplied feedback. Actual image generation, trend research and saving files depend on current host capabilities and the user's authorization. No account-level learning, MCP, OAuth, user-data scraping, telemetry, or automatic publication is bundled.

This repository contains an existing authored Skill and a newly packaged mirror. The original user-supplied PPTX and third-party visual materials are deliberately omitted. Image rights must be verified before any particular visual is published.

## Pre-publication evidence still required

- The publisher must select the actual verified developer identity within the OpenAI submission portal; repository ownership is not proof of verification
- The repository currently has no confirmed root LICENSE file for the redistributed Skill; a rights decision must be made before asserting a license
- Confirm the supported plugin listing category, availability regions and any legal/support URL requirements at submission time
- Run the eight proposed reviewer cases against a fresh installed version and save actual results
- Conduct image-rights, cultural/dialect, user-privacy and content-policy reviews of the output examples
- Complete independent Plugin Eval if the plugin-eval CLI is available; repo CI runs its own structural checks but does not impersonate that CLI
- Perform real installation smoke tests in ChatGPT desktop and Codex; CI package validation is not a host install
- Only then produce the formal submission pack, submit through the portal and record separate approval/publication outcomes

Status: NOT_READY_FOR_PUBLIC_SUBMISSION. Local package tests can pass independently of these remaining items.
