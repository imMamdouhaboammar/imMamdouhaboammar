# Developer Journey · 182 days

**October 3, 2026 to April 2, 2027** · Ten active products · Six evidence gates

[**Open the interactive calendar**](https://immamdouhaboammar.github.io/imMamdouhaboammar/dev-journey/)

## End state

By April 2, each product has either (a) a tested, documented release or limited beta backed by direct task-completion evidence, or (b) a written decision to pause or narrow its scope. No project graduates solely because a README, feature count, or badge looks impressive.

| Workstream | Projects | Planned cadence |
| --- | --- | --- |
| MVP | get-fable, motion-graphics-skills, agent-kernel | One primary MVP focus per working day, each twice weekly |
| Advanced POC | PyMC Marketing MCP, AutoTok, Teolaa, Rafiq-Bot, delegate-team, PrePilot | Two sessions per project per week |
| Advanced Concept | Oh-My-X-Tweets | One bounded session each Saturday |
| Reflection | All projects | 30-minute Sunday review |

This is **not** 10 simultaneous daily commitments. Monday through Saturday have one 90-minute MVP session and two 50-minute POC sessions; Saturday adds a 30-minute experimental session. Sundays reserve 30 minutes for review or can be treated as recovery time. Sessions are suggestions, not tracked hours.

## Six phase gates

1. **Oct 3 to Nov 2:** Baseline and acceptance criteria
2. **Nov 3 to Dec 2:** Reproducible core journeys
3. **Dec 3 to Jan 2:** User or operator pilots
4. **Jan 3 to Feb 2:** Reliability, security and failure recovery
5. **Feb 3 to Mar 2:** Real-use measurement
6. **Mar 3 to Apr 2:** Tested releases and stop/continue decisions

Each project has a specific deliverable under every gate. The calendar uses deterministic day-to-project assignment, so the schedule works offline and does not require GitHub API access or permissions.

## Progress and privacy

- Daily session completion, notes, evidence links, and milestone decisions are stored **only in this browser's localStorage**, not committed to GitHub and not synced across devices.
- **Export JSON** periodically to keep a backup or transfer progress to another browser. Import replaces the local snapshot after confirmation.
- Anyone opening the public site sees the same proposed plan, but **not your private completion state**.
- Task checkmarks are personal tracking, not proof of passing CI or commercial readiness. Always link to actual PRs, test runs, user results, or documented decisions when available.

## Implementation

Static GitHub Pages content under \`dev-journey/\`:

- \`plan.mjs\`: Pure, deterministic scheduling logic and project objectives
- \`app.mjs\`: Calendar UI, filtering, local progress, notes, import/export
- \`styles.css\`: Responsive, accessible visual layout
- \`tests/plan.test.mjs\`: Date, cadence and boundary tests using Node built-ins

Run the tests with \`node --test dev-journey/tests/*.test.mjs\` from the repository root. No build step or external dependencies.
