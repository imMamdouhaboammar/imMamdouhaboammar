# Reviewer preparation (not a submission claim)

Product: Portfolio Interview, version 1.3.0. Submission route: **Skills-only**. Package root: `plugins/portfolio-interview`.

The attached `proposed-reviewer-cases.json` lists five positive and three negative **proposed** agent-invocation scenarios. They have not been run as live ChatGPT/Codex agent conversations. The repository-native Node.js fixtures exercise generator and validation behavior, not model invocation. Do not present structural CI or test fixtures as real user acceptance evidence.

## Confirmed distribution boundaries

- `plugin.json` is the portable root manifest and `.codex-plugin/plugin.json` is a compatibility overlay. No bundled MCP server or app registration.
- A single domain Skill handles the interview, writing, build and QA. `host-workspace-operator` maps host-native file/search/patch/shell capabilities without granting any permission.
- The Claude Code plugin remains separate with its Claude subagents and hooks. They are not silently mirrored to OpenAI surfaces.
- The site generator requires Node.js 18+. Playwright browser QA and social image rendering are optional. Non-executable ChatGPT sessions produce an approved `profile.json` and instructions rather than falsely claiming HTML/screenshots were generated.
- CVs, contact information, testimonials and photos require explicit publication approval. No hidden network telemetry or auto deployment is bundled.

## Still required before public submission

1. Run all eight proposed live agent cases on the exact installed Plugin and capture actual outputs and activation decisions.
2. Confirm verified publisher identity and current allowed category and complete any portal-required support/legal fields. GitHub ownership proves neither portal verification nor terms/privacy coverage.
3. Inspect current rights and license status before making a public redistribution license assertion. The repository did not expose a confirmed LICENSE file when this package was prepared.
4. Run the Plugin Eval CLI when installed and record its actual command output; our CI implements independent local checks, not an impersonation of that tool.
5. Run a fresh install in available ChatGPT Desktop/Codex environments, test Node.js and no-Node fallback, and independently review security and privacy behavior.
6. Prepare the formal Skill Submission Pack **after** current-version agent evidence exists; then complete the portal safety scan, submission, approval and publication as separate owner actions.

Status: **local build candidate** pending executed CI, independent review and the listed publication gates.
