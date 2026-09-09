# Use ChatGPT: Fast Router

Use this directory when you need the smallest correct plugin stack without loading the full `Use-ChatGPT.md` handbook.

The full copy-ready prompt library remains in [../Use-ChatGPT.md](../Use-ChatGPT.md).

Machine-readable capability metadata: [capabilities.yaml](capabilities.yaml)

Routing-regression corpus: [routing-evals.yaml](routing-evals.yaml)

The eval corpus defines expected behavior and failure vetoes. It must not be described as an executed model benchmark until an actual baseline/candidate run exists.

## Routing rule

```text
current state
-> one primary owner
-> one source of truth
-> one write owner per mutable surface
-> executable verification
-> one independent review path
-> one landing owner
```

Do not start with a flat list of `@mentions`.

Nominal owner and selected owner are different fields:

- nominal owner: the best capability for the job in principle
- selected owner: the nominal owner only when its current availability permits execution, otherwise the smallest safe fallback or an explicit evidence gap

Never invoke a blocked nominal owner merely to satisfy a routing recipe.

## Choose the primary owner

| Situation | Primary owner |
| --- | --- |
| Lifecycle stage is ambiguous | `@get-fable` |
| Agency-style multi-specialist engineering mission | `@Riqor` |
| Repository is intentionally operating on durable ZzzOps goals | `@ZzzOps` |
| Governed Product/Design/Build/Engineering harness is intentionally active | `@taskplane` |
| One modular gstack workflow clearly matches the job | `@gstack Workflows` |
| A bounded implementation already has a clear contract | `@Codex Engineering Guardrails code-work` |
| Read-only engineering validation is the main job | `@Codex Engineering Guardrails code-verification` |

Only one of these should normally be the mission owner.

## Source of truth

| Need | Source |
| --- | --- |
| Repository, Issue, PR, reviews, checks, merge state | `@GitHub` |
| Current framework/library/SDK contract | `@Context7` |
| Broad current external research | `@Parallel Search` |
| OpenAI-specific developer contract | `@OpenAI Developers` |
| GitBook site/page/change-request state | `@GitBook` |
| Tool governance policy | `@ArmorCodex` |

Current connected state outranks memory and handoff prose.

## Planning and contracts

Use the artifact you actually need:

- `@AI Task Brief Builder`: extract confirmed facts from supplied development material only
- `@Skillquiver engineer-prompts`: build a testable reusable agent prompt contract
- `@Matt Skills Curated writing-for-agents`: author agent-facing instructions with progressive disclosure
- `@get-fable fable-plan`: turn engineering evidence into bounded work cards
- `@taskplane Product/Design`: formal governed WHAT/HOW contracts
- `@gstack spec/autoplan`: modular specification or coordinated plan review

Do not ask a text analyzer to inspect a repository it cannot access.

## Implementation

Default bounded implementation stack:

```text
@GitHub / local workspace
-> @Codex Engineering Guardrails code-work
-> TDD method when behavior changes
-> focused tests
-> broader required gates
```

Useful process specialists:

- `@Superpowers`: planning, TDD, debugging, review handling, verification discipline
- `@Skillquiver`: durable execution, TDD, root-cause research, review handling, worktrees
- `@Riqor evidence-engineering`: observable acceptance, root-cause discipline, minimal verified change
- `@Codex Process Jobs`: finite long-running local tests/builds/evals only

## Static and structural analysis

Use `@Fallow Code Analysis` for supported TypeScript/JavaScript repositories when you need:

- changed-code blast radius
- dependency and public-API boundary signals
- circular dependencies
- complexity
- duplication
- design-system/style drift
- graph-grounded PR review

Fallow is not a runtime verifier and is not useful merely because a repository exists.

## Verification

Executable proof comes first:

```text
tests
build
typecheck
lint
runtime smoke
current-head CI
```

Process/evidence specialists:

- `@get-fable fable-verify`
- `@Skillquiver verification-before-completion`
- `@Skillquiver verify-work`
- `@Codex Engineering Guardrails code-verification`

Reviewer agreement is not executable proof.

## Independent review

Default:

```text
self-review
-> one primary independent reviewer
-> one second specialist lens only when risk justifies it
```

Choose by job:

- `@CodeRabbit`: general diff/PR review
- `@Fallow Review`: TS/JS graph-grounded structural review
- `code-verification`: requirement/risk/test assessment
- `@Codex Security`: nominal specialist for trust-boundary changes; invoke only when callable
- `@get-fable fable-security` or `@gstack cso`: callable security fallbacks when Codex Security is unavailable
- `@taskplane tp-engineering`: governed engineering sign-off only when taskplane is active

## PR lifecycle

```text
@GitHub live state
-> repair / verify
-> independent review
-> refresh current head
-> evidence packet
-> @PR Readiness Check when useful
-> @PR Completion for PR lifecycle ownership
-> exact-head landing confirmation when required
-> verify merged state
```

`@PR Readiness Check` judges supplied text. It does not inspect GitHub or run tests.

`@PR Completion` owns its own exact-head landing gate. A broad autonomous prompt does not override it.

## GitHub Apps

Treat Apps as bounded PR actors.

- CodeRabbit: resolve the active service-account handle before using reusable comment commands
- Cursor Bugbot: use only documented PR triggers
- autofix.ci: workflow-driven, not comment-driven
- Qlty: consume configured checks/findings; do not invent commands
- Sourcery: use its verified repository commands when needed
- Gitar: consume review output; enable auto-apply only with deliberate mutation ownership
- Cubic: consume verified inline findings; do not invent a comment trigger
- Mergify: landing/queue actor; queue enrollment still obeys the active exact-head landing authority
- ecc-tools: observed ECC bundle integration; invocation contract unresolved, so do not invent a trigger
- Qodo: unavailable means unavailable, not pass
- rate-limited reviewer: rate-limited means unavailable for that review attempt, not pass
- unknown app: inspect repo activity/config/docs before invocation

Any bot-authored commit invalidates prior current-head verification.

## Plugin / Skill engineering

```text
@Plugin Autopilot
-> @OpenAI Developers for current platform contract
-> @Skillquiver engineer-prompts
-> @Matt writing-for-agents / skill-conductor
-> @get-fable fable-skill-creator
-> eval
-> package
-> evidence-bound submission material
```

Use:

- `@Universal Plugin Installer` only for explicitly selected local candidate folders
- `@Skill Submission Pack Writer` only for Skills-only submission facts supported by completed evidence
- `@get-fable fable-eval` for baseline/candidate prompt, router, Skill, or policy evaluation

Never equate local package validity with marketplace approval or publication.

## UI / UX work

Use only the lenses required by the flow:

- `@ThoughtfulBits Skills test-ui-ux`: rigorous multi-method flow audit when justified
- `@Impeccable`: interface quality/accessibility hardening
- `@Testifly`: real browser/E2E evidence
- relevant Riqor design specialist when the task needs that exact specialty

A screenshot-only pass is not full accessibility or usability proof.

## Security-sensitive work

```text
@ArmorCodex policy/intent
-> source of truth
-> bounded implementation
-> security-specific verification
-> independent review
-> repository protection
-> landing gate
```

ArmorCodex governance does not replace repository branch protection or host approval.

## Long sessions

Use durable state only when it earns its cost:

- `@get-fable handoff`
- `@Skillquiver execute-durably`
- `@Matt handoff`
- `@Create State` where connected persistence helps

For long local commands, `@Codex Process Jobs` is the nominal runner only when its direct process-job surface is callable in the current host.

If that surface is unavailable, use a safe host-native foreground process only when same-turn execution is required and permitted. Otherwise record an explicit execution evidence gap. Never claim a detached process job was launched when it was not.

## Capability availability

A name must be classified as one of:

- `CALLABLE`
- `CONNECTED`
- `INSTALLED_BUT_NOT_CALLABLE_HERE`
- `KNOWN_NAME_UNRESOLVED`
- `UNAVAILABLE`
- `BLOCKED`

Use only the canonical availability vocabulary above. Put temporary details such as rate limiting, billing, auth, or an offline execution device in `block_reason`, not in a new state.

The registry snapshot must be refreshed before mutations or external actions.

At the 2026-09-09 refresh, these user-referenced names could not be resolved by exact canonical Plugin/Skill name:

- Codex Dev Workflows
- Code
- Codex Coordinator
- Codex Advisor

Do not invent responsibilities for them. Resolve them again from the current Plugin directory and Skill catalog before use.

## Full reference

For detailed capability tables, overlap rules, GitHub App commands, long workflows, anti-patterns, and copy-ready prompts, read [../Use-ChatGPT.md](../Use-ChatGPT.md).
