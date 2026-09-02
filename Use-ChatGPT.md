# Use ChatGPT with My Installed Plugins

A mature, copy-ready workflow library for using installed ChatGPT plugins as coordinated roles rather than a flat list of @mentions

The objective of this file is simple:

```text
right source of truth
+ right planner
+ right executor
+ right specialist
+ right reviewer
+ right runtime verification
+ explicit completion gate
```

A plugin should have a job inside the workflow. If two plugins perform the same job, choose one unless a second independent perspective is materially useful.

---

# 0. Operating Contract

Use this contract with every workflow in this file.

```text
Use the listed @plugins when they are actually available and materially useful.

Do not claim that a plugin, skill, search, review, test, deployment, code change, file edit, commit, PR action, account action, migration, or external action happened unless it was actually executed.

If a named plugin is installed but its callable interface is not available in the current session:
1. continue with the useful available stack
2. do not simulate its output
3. state the missing capability only if it materially affects confidence or completion

Always identify the source of truth before acting.

For continuation work:
- inspect live state first
- reconcile previous handoffs with current reality
- never restart completed work
- never duplicate existing implementation
- preserve user changes

For implementation work:
- inspect before editing
- keep changes coherent and reversible
- test the changed behavior
- test nearby regression risk
- review the final diff
- verify acceptance criteria using evidence

For risky work:
- identify trust boundaries
- protect credentials and production data
- avoid destructive operations unless explicitly required
- prefer staging or non-production verification when possible

For research:
- prefer current primary sources
- compare publication date with event date
- separate verified facts from claims, estimates, and opinions
- cite material factual claims

For final reporting, always distinguish:
- completed
- verified
- partially verified
- blocked
- not started

Never use vague completion language such as "should be done" or "looks complete" when stronger verification is possible.
```

---

# 1. Plugin Role Model

Use plugins by role, not by popularity.

## 1.1 Source of Truth / Connected State

Use these when the answer depends on live external state.

```text
@GitHub
Repository state, branches, files, PRs, issues, CI evidence, review state

@Remote Desktop Commander
Authorized local machine, local repo, filesystem, terminal, runtime execution

@Supabase
Live Supabase projects, schema, SQL, RLS, functions, logs, advisors

@Vercel
Live projects, deployments, build/runtime state

@Gmail
Mailbox messages, threads, drafts, email actions

@Hostinger Mail
Hostinger mailbox state and mail actions

@Google Drive
Drive files and source documents

@Notion
Workspace pages and databases

@GitBook
Documentation spaces and published docs

@Adobe Marketing Agent
Adobe marketing/account data when connected

@LinkedIn Ads
LinkedIn advertising account data

@ChatGPT Ads Manager
Connected ad account/campaign data supported by the plugin

@Hugging Face
Models, datasets, Spaces, metadata

@Manufact
MCP server and deployment state
```

Rule:

```text
When live connected state exists, inspect it before reasoning from old context.
```

## 1.2 Current Documentation / External Research

```text
@Context7
Current framework/library documentation and version-specific implementation guidance

@Parallel Search
Broad current web research and source discovery

@Tavily AI
Targeted web search, extraction, crawling, and source retrieval

@Deep Research
Multi-source research where synthesis and conflicting evidence matter
```

Rule:

```text
Use research plugins to remove uncertainty, not as decoration.
```

## 1.3 Planning / Orchestration / Long-Running State

```text
@Superpowers
Disciplined engineering process, planning, TDD, debugging, verification, review discipline

@get-fable
Long-running engineering workflow discipline and stateful continuation when available

@Adaptive Codex Orchestrator
Split and coordinate multi-part engineering work when parallelization or orchestration is justified

@AI Task Brief Builder
Convert supplied evidence into goals, scope, tests, risks, and implementation-ready task briefs

@taskplane
Structured project/task planning and dependency tracking when available

@Create State
Persist durable project decisions, state, and handoff information

@Codex Process Jobs
Use for process/job-style coding workflows when its callable surface is available and the task matches
```

Rule:

```text
Planning plugins do not replace execution evidence.
```

## 1.4 Engineering Execution

```text
@Remote Desktop Commander
Primary executor for authorized local code, shell, tests, local builds, migrations, and runtime checks

@GitHub
Repository writes, branches, PR/issue actions, remote source state

@Supabase
Database, SQL, RLS, functions, project-level backend actions

@Vercel
Deployment and runtime operations

@Build Web Apps
Frontend implementation and app-building workflows

@3Min API
Rapid API creation when its model fits the requirement

@FastAPI Cloud
FastAPI-oriented backend execution and deployment workflows

@Temporal
Durable workflow/orchestration implementation when the product needs retries, state, recovery, or long-running jobs

@Canva
Canva design execution

@Remotion
Programmatic video execution

@Mermaid Chart
Diagram validation and rendering

@IcePanel
Software architecture modeling
```

Rule:

```text
Only one plugin should own a write surface at a time unless the writes are clearly independent.
```

## 1.5 Code Review / Quality / Readiness

```text
@CodeRabbit
Code review and concrete findings after implementation or on an existing diff/PR

@Codex Engineering Guardrails
Engineering constraints, implementation discipline, and review guardrails

@Fallow Code Analysis
Focused static/code analysis when available

@SonarQube
Static analysis and code quality/security findings when connected

@PR Readiness Check
Evidence-based readiness assessment before human review or merge

@PR Completion
Final PR completion/closure workflow when available and the PR is already proven ready
```

Rule:

```text
Do not run release/readiness judgment before implementation evidence exists.
```

## 1.6 Security

```text
@Codex Security
Security-focused code and architecture review

@ArmorCodex
Agent/tool policy and security control review

@SonarQube
Static findings that materially affect security or maintainability
```

Rule:

```text
Security review should inspect changed trust boundaries, not generically scan everything unless a full audit is requested.
```

## 1.7 Runtime QA / UX Verification

```text
@Testifly
Browser/E2E website testing and runtime validation

@Impeccable
UI quality, interaction states, accessibility, hierarchy, and visual hardening

@Agent Ready
Agent readability, crawlability, llms.txt and machine-consumption quality

@Test Android Apps
Android emulator QA, UI inspection, logs, screenshots, performance evidence

@01 Superdesign
Frontend visual direction and design execution support

@Frontend Design Premium
Frontend design quality when its callable interface is available
```

Rule:

```text
Runtime QA verifies user-visible behavior. It does not replace unit/integration tests.
```

## 1.8 Marketing / Content / Creative

```text
@Marketing Council
Strategic marketing reasoning and challenge

@Marketing Swarm
Multi-angle marketing analysis when broader parallel analysis is useful

@Creator Workspace
Content/creator workflow and publish-ready asset development

@Conversational Narrative
Natural narrative flow and spoken-feeling copy

@Slop Curator
Remove generic AI phrasing, visual/textual slop, repetition, and artificial structure

@AI Humanizer
Humanize existing copy while preserving meaning

@Designly
Creative direction and visual concept development

@Creative Production
Creative production support when available

@LinkedIn Animated Infographics
LinkedIn motion/infographic production workflow

@Presentations
Presentation creation and editing

@Canva
Design creation/editing in Canva

@Remotion
Motion/video implementation
```

## 1.9 Plugin / Skill Engineering

```text
@OpenAI Developers
OpenAI API, Agents SDK, ChatGPT Apps, and OpenAI developer workflows

@Plugin Autopilot
Plugin routing/build workflow support when available

@Plugin Eval
Evaluate skills/plugins and identify quality gaps

@Plugin Management
Installed plugin permissions, management, and capability-related administration

@Universal Plugin Installer
Installation-oriented flows when explicitly requested and supported

@Skill Submission Pack Writer
Submission/listing package preparation for skills/plugins

@Matt Skills Curated
Skill discovery/curation guidance when available

@Skillquiver
Skill-oriented workflow support when available

@ThoughtfulBits Skills
Skill-oriented workflow support when available
```

## 1.10 Conditional Specialists

Do not auto-route these purely from the name unless their capability is visible in the current session, documented in the task, or explicitly requested:

```text
@AgentProof
@CompText Guard
@Develoop
@gstack Workflows
@Keystone
@OGENIC GOD TOOLKIT
@pipeboard
@PrePilot Lite
@prepilot Working
@pstack
@Riqor
@Shiro
@Template Creator
@ZzzOps
```

This is deliberate. Mature routing means avoiding invented plugin behavior.

---

# 2. Universal Workflow State Machine

Every serious task should pass through only the stages it actually needs.

```text
STAGE 0 - CLASSIFY
Identify domain, current stage, source of truth, risk, write surfaces, and completion criteria

STAGE 1 - RESTORE
Load live repo/account/files/runtime state and reconcile previous context

STAGE 2 - INVESTIGATE
Collect only the evidence needed to understand the task or remove uncertainty

STAGE 3 - PLAN
Define smallest complete scope, dependencies, acceptance criteria, tests, risks, rollback

STAGE 4 - EXECUTE
Perform the change using the correct write owner

STAGE 5 - VERIFY
Run tests and runtime checks that prove the requested behavior

STAGE 6 - REVIEW
Review code, security, UX, regressions, and requirement coverage as relevant

STAGE 7 - RELEASE / CLOSE
Merge, deploy, publish, or close only after gates pass

STAGE 8 - HANDOFF
Persist current truth only when work remains or the session must continue later
```

Do not force every task through every stage.

Example:

```text
A copy rewrite may only need CLASSIFY -> EXECUTE -> REVIEW
A production migration may need all stages
```

---

# 3. Evidence and Completion Protocol

Every engineering workflow should maintain a compact evidence ledger.

```text
Evidence ledger

Source of truth inspected:
[WHAT WAS ACTUALLY READ]

Changes made:
[FILES / SQL / CONFIG / PR ACTIONS]

Tests executed:
[EXACT TESTS OR COMMANDS]

Runtime checks:
[FLOW / URL / ENVIRONMENT]

Review evidence:
[CODERABBIT / STATIC ANALYSIS / SECURITY / MANUAL REVIEW]

Known limitations:
[UNVERIFIED OR BLOCKED ITEMS]
```

Use one of these verdicts:

```text
COMPLETE
All requested scope and required gates are verified

COMPLETE WITH FOLLOW-UPS
Requested scope is complete; remaining items are explicitly non-blocking

PARTIAL
Meaningful progress exists, but one or more requested completion gates remain

BLOCKED
A real external dependency prevents further safe progress

NOT STARTED
No execution occurred
```

Never report `COMPLETE` when the only evidence is code inspection.

---

# 4. Master Router Prompt

Use this when you do not know which workflow below fits.

```text
@Plugin Management @Superpowers

Use my installed plugin stack intelligently for the task below.

Task:
[TASK]

Context:
[INPUT]

Before doing work, classify:
1. domain
2. current stage
3. source of truth
4. whether live connected data is required
5. whether local execution is required
6. whether external research is required
7. write surfaces
8. security risk
9. runtime verification needs
10. final completion gate

Then choose the smallest useful plugin stack using exact installed @Plugin Name syntax.

Assign explicit roles:
- Source
- Planner
- Executor
- Specialist
- Reviewer
- Security Gate
- Runtime QA
- Release Gate
- State/Handoff

Not every role must be filled.

Routing rules:
- inspect connected source plugins before relying on remembered state
- use @GitHub for repository truth
- use @Remote Desktop Commander for authorized local execution
- use @Context7 for current framework/library behavior
- use @Superpowers for engineering process discipline
- use @CodeRabbit after a meaningful diff exists
- use @PR Readiness Check only when there is evidence to judge readiness
- use @Codex Security and/or @ArmorCodex when trust boundaries change
- use @Testifly for real browser flows
- use @Impeccable for UI/interaction/accessibility hardening
- use research plugins only when external verification materially affects the answer
- do not call unrelated plugins
- do not invent capabilities for plugins whose callable surface is unavailable

Execute the task after routing. Do not stop after merely selecting plugins.

Finish with the evidence ledger and a completion verdict.
```

---

# 5. Engineering Workflows

## 5.1 Continue a Long Existing Repository Session

```text
@get-fable @Superpowers @Adaptive Codex Orchestrator @Create State @GitHub @Remote Desktop Commander @Context7 @CodeRabbit

Mission:
[TASK]

Repository:
[REPO]

Local checkout:
[LOCAL_PATH]

Plugin Roles:
- Source: @GitHub + @Remote Desktop Commander
- Process: @Superpowers
- Long-session orchestration: @get-fable + @Adaptive Codex Orchestrator
- Current docs: @Context7 only when version-specific behavior matters
- Reviewer: @CodeRabbit after meaningful implementation
- State: @Create State when a resumable handoff is useful

Workflow:
1. Inspect current default branch, active branch, working tree, recent commits, open PRs, relevant issues, CI, and local uncommitted changes
2. Restore the latest useful project state or handoff
3. Reconcile handoff claims with live state
4. Build a completion matrix: complete / in progress / blocked / not started
5. Select the highest-value unfinished item that can safely progress now
6. Inspect only the relevant architecture and current docs
7. Implement the smallest complete slice
8. Test changed behavior
9. Test nearby regressions
10. Review the resulting diff
11. Update completion matrix using evidence
12. Continue to the next item while useful work remains and no real blocker exists
13. Persist a handoff only if work is still unfinished

Rules:
- never restart from zero
- never reimplement completed features
- preserve local changes
- avoid touching unrelated modules
- do not stop at planning when implementation is safe and requested
- never claim 100% without verified gates

Completion gate:
The mission is COMPLETE only when the live repo state, tests, runtime checks, review evidence, and requested acceptance criteria agree.
```

## 5.2 Build a Product Feature End to End

```text
@AI Task Brief Builder @Superpowers @GitHub @Remote Desktop Commander @Context7 @Codex Engineering Guardrails @CodeRabbit @Testifly @PR Readiness Check

Feature:
[TASK]

Repository:
[REPO]

Plugin Roles:
- Source: @GitHub + local repo through @Remote Desktop Commander
- Requirements: @AI Task Brief Builder
- Process: @Superpowers
- Docs: @Context7 when needed
- Engineering constraints: @Codex Engineering Guardrails
- Reviewer: @CodeRabbit
- Runtime QA: @Testifly when user-facing behavior changes
- Readiness Gate: @PR Readiness Check

Workflow:
1. Restore current product/repo state
2. Convert the feature request into confirmed requirements, assumptions, out-of-scope items, acceptance criteria, and tests
3. Trace affected data, API, auth, state, UI, and analytics paths
4. Identify the smallest complete implementation slice
5. Add or update tests before or alongside implementation as appropriate
6. Implement the feature using existing architecture unless evidence requires change
7. Run targeted tests
8. Run regression checks on neighboring paths
9. Test real user flow when applicable
10. Review the final diff
11. Map every acceptance criterion to evidence
12. Check PR readiness only after the evidence exists

Output:
Return a requirement-by-requirement completion matrix and evidence ledger.
```

## 5.3 Debug a Real Bug

```text
@Superpowers @Remote Desktop Commander @GitHub @Context7 @Fallow Code Analysis @CodeRabbit

Bug:
[TASK]

Environment / reproduction context:
[INPUT]

Plugin Roles:
- Runtime evidence: @Remote Desktop Commander
- Source: @GitHub
- Debugging process: @Superpowers
- Current framework docs: @Context7 if behavior may be version-specific
- Analysis: @Fallow Code Analysis when useful
- Reviewer: @CodeRabbit after the fix

Workflow:
1. Reproduce before editing whenever possible
2. Record actual vs expected behavior
3. Capture relevant logs, errors, network/database behavior, and recent changes
4. Form ranked hypotheses
5. Eliminate hypotheses with evidence
6. Identify root cause, not just the visible symptom
7. Add regression coverage when practical
8. Apply the smallest correct fix
9. Re-run the original reproduction
10. Run nearby regression tests
11. Review the final change

Rules:
- do not shotgun-edit multiple causes at once
- do not call a symptom patch a root-cause fix
- if reproduction is impossible, clearly downgrade confidence
```

## 5.4 Fix CI / Build Failure

```text
@GitHub @Remote Desktop Commander @Superpowers @Context7 @Codex Engineering Guardrails @CodeRabbit

Repository:
[REPO]

Failing workflow / job:
[INPUT]

Workflow:
1. Inspect the failed workflow run and identify the first meaningful failure
2. Distinguish product failure from environment/tooling failure
3. Reproduce locally when feasible
4. Check version/runtime/action changes with @Context7 when relevant
5. Apply the narrowest root-cause fix
6. Run the equivalent local check
7. Push/update only when appropriate
8. Verify CI rerun/result
9. Review any dependency or config side effects

Completion gate:
Do not mark complete until the previously failing gate is actually green or a verified external infrastructure issue is identified.
```

## 5.5 PR Triage -> Repair -> Verify -> Merge -> Close

```text
@GitHub @Superpowers @CodeRabbit @PR Readiness Check @PR Completion @Remote Desktop Commander @Codex Engineering Guardrails @Codex Security

Repository:
[REPO]

Scope:
[ALL OPEN PRS / SELECTED PRS]

Plugin Roles:
- Source and PR actions: @GitHub
- Process: @Superpowers
- Local verification/fixes: @Remote Desktop Commander
- Code review: @CodeRabbit
- Engineering constraints: @Codex Engineering Guardrails
- Security review: @Codex Security only for security-sensitive changes
- Readiness verdict: @PR Readiness Check
- Final close/merge workflow: @PR Completion when available and appropriate

For each PR:
1. Read title, description, linked issue/spec, changed files, checks, review threads, and branch state
2. Classify:
   - valid and likely useful
   - useful but failing
   - stale/conflicting
   - duplicate/superseded
   - unsafe
   - no longer valuable
3. For valid PRs, verify requirements against the actual diff
4. Reproduce/test locally when risk justifies it
5. Repair concrete blockers in the correct branch/worktree when authorized
6. Re-run targeted tests and CI-equivalent checks
7. Run code review on the final diff
8. Run security review only when relevant
9. Ask @PR Readiness Check for a readiness verdict using actual evidence
10. Merge only if required gates pass and repository policy permits
11. Close invalid, duplicate, superseded, or unrecoverable PRs only with a concrete reason
12. Verify post-merge branch/default-branch state

Rules:
- do not merge based only on green CI
- do not close a failing PR if a small safe repair makes it valuable
- do not endlessly repair a PR whose purpose is obsolete or destructive
- never claim a merge occurred unless @GitHub confirms it
```

## 5.6 Enterprise / Production Readiness Audit

```text
@GitHub @Remote Desktop Commander @Superpowers @Codex Engineering Guardrails @Codex Security @ArmorCodex @SonarQube @Testifly @PR Readiness Check

Repository / product:
[REPO]

Target standard:
[TASK]

Audit dimensions:
- architecture and maintainability
- auth and authorization
- data protection and RLS
- secret/config handling
- input validation
- error handling
- observability/logging
- tests and CI
- release/rollback
- performance-sensitive paths
- accessibility
- responsive/runtime behavior
- dependency health
- deployment configuration
- documentation and operator readiness

Workflow:
1. Inspect live repo and runtime evidence
2. Build an explicit readiness rubric before scoring
3. Score only dimensions with evidence
4. Separate confirmed gaps from assumptions
5. Rank gaps P0/P1/P2 by production risk
6. Fix only if implementation is requested
7. Re-audit changed dimensions after fixes

Output:
- evidence-backed percentage only if the rubric makes percentages meaningful
- passed dimensions
- failed dimensions
- unknown/unverified dimensions
- prioritized closure plan
```

## 5.7 Supabase Migration + Privacy / RLS Verification

```text
@Supabase @Remote Desktop Commander @Superpowers @Context7 @Codex Security @ArmorCodex

Repository:
[REPO]

Migration / data change:
[TASK]

Environment:
[NON_PRODUCTION_PROJECT]

Plugin Roles:
- Live database source/executor: @Supabase
- Local migration files/tests: @Remote Desktop Commander
- Process: @Superpowers
- Current provider guidance: @Context7 when required
- Security gate: @Codex Security + @ArmorCodex for auth/RLS/public-private boundaries

Workflow:
1. Inspect existing migrations, schema, functions, policies, grants, and application contracts
2. Confirm the target project/environment before applying anything
3. Review migration for forward compatibility, data loss risk, locking risk, reversibility, and public/private exposure
4. Apply to an approved non-production project first when available
5. Verify resulting schema and constraints
6. Test expected authorized reads/writes
7. Test denied anonymous/viewer/unauthorized paths
8. Test RPC/function return shape and grants
9. Run security/performance advisors when available
10. Run application integration tests against the migrated environment
11. Compare behavior with acceptance criteria
12. Prepare rollback or recovery steps

Rules:
- never infer RLS safety from SQL text alone when runtime verification is possible
- never expose private numeric/commercial fields through public RPCs, views, payloads, logs, or generated types unless explicitly intended
- do not run destructive production migration without explicit authorization
```

## 5.8 Forms / Validation / Feedback Hardening Across an App

```text
@Build Web Apps @Impeccable @Testifly @Superpowers @GitHub @Remote Desktop Commander

Application:
[REPO / URL]

Goal:
Audit and harden every meaningful form and submission flow.

Plugin Roles:
- Source/code: @GitHub + @Remote Desktop Commander
- Engineering process: @Superpowers
- UI/UX quality: @Impeccable
- Runtime verification: @Testifly
- Frontend implementation: @Build Web Apps when useful

Audit every form for:
- required-field indicators
- field-level validation
- actionable error copy
- success feedback
- failure feedback
- loading/submitting state
- disabled/duplicate-submit protection
- server error handling
- incomplete-form guidance
- help / ? guidance where the user may not understand what is requested
- focus movement to the first invalid field
- keyboard behavior
- screen-reader labels
- preserved user input after recoverable failure
- optimistic updates only where safe
- retry/recovery path
- no silent failure

Workflow:
1. Inventory all forms and mutation surfaces
2. Rank by business/user risk
3. Define one consistent feedback pattern
4. Implement shared primitives where duplication exists
5. Fix form-by-form without breaking domain-specific behavior
6. Test happy path, missing field, invalid field, server failure, slow response, retry, and duplicate click
7. Verify mobile and keyboard behavior
8. Re-run the inventory and mark each form pass/fail

Completion gate:
Every inventoried form must have evidence or be explicitly out of scope.
```

## 5.9 Frontend UI Hardening / Remove AI UI Slop

```text
@Impeccable @01 Superdesign @Frontend Design Premium @Build Web Apps @Testifly

Page / app:
[INPUT]

Goal:
[TASK]

Workflow:
1. Identify the user job and primary action of each surface
2. Audit hierarchy, typography, spacing, density, alignment, color, border usage, cards, gradients, shadows, empty states, microcopy, motion, and responsive behavior
3. Identify repeated AI-looking patterns such as unnecessary cards, excessive badges, decorative gradients, fake dashboards, oversized hero copy, random glass effects, redundant helper text, and uniform component repetition
4. Preserve useful information architecture
5. Simplify components without removing necessary states
6. Strengthen interaction feedback and accessibility
7. Test responsive layouts and real flows
8. Compare before/after against the product's design language

Do not redesign for novelty.
Do not replace one visual fad with another.
```

## 5.10 Architecture / System Design

```text
@Superpowers @IcePanel @Mermaid Chart @Context7 @Codex Engineering Guardrails @Codex Security

System / feature:
[TASK]

Inputs:
[INPUT]

Workflow:
1. Define actors, workloads, constraints, SLOs, trust boundaries, and failure expectations
2. Inspect existing architecture when this is not greenfield
3. Map current state before proposing target state
4. Define component ownership and interfaces
5. Define data flow and control flow
6. Define consistency, idempotency, retry, and failure behavior where relevant
7. Define security boundaries
8. Compare realistic options and migration cost
9. Choose one recommended architecture with explicit tradeoffs
10. Render diagrams only after the model is coherent
11. Produce implementation slices and acceptance criteria
```

## 5.11 Dependency / Framework Upgrade

```text
@Dependency Upgrade Plan @Context7 @GitHub @Remote Desktop Commander @Superpowers @CodeRabbit

Upgrade:
[PACKAGE / FRAMEWORK / VERSION]

Repository:
[REPO]

Workflow:
1. Inspect current dependency/version and actual usage
2. Read current release/migration/breaking-change guidance
3. Produce an evidence-based upgrade plan
4. Identify affected APIs, config, build, runtime, and tests
5. Upgrade in the smallest safe increments
6. Fix incompatibilities
7. Run tests/build/typecheck/lint as applicable
8. Inspect generated lockfile/config changes
9. Test important runtime flows
10. Review final diff
11. Document rollback or downgrade path when risk is material
```

## 5.12 Vercel Deployment / Runtime Verification

```text
@Vercel @GitHub @Remote Desktop Commander @Superpowers @Testifly

Project:
[INPUT]

Revision / branch:
[REF]

Workflow:
1. Inspect linked repository and current deployment state
2. Confirm target environment
3. Verify required config/environment variables without exposing secret values
4. Build/test locally when feasible
5. Deploy the intended revision only
6. Inspect build logs and deployment status
7. Smoke-test critical routes
8. Run browser flow checks where relevant
9. Inspect runtime errors/logs after deployment
10. Report exact deployment evidence and remaining risk
```

---

# 6. AI Agents, Skills, and Plugin Engineering

## 6.1 Build or Improve a ChatGPT / Codex Plugin

```text
@OpenAI Developers @Plugin Autopilot @Plugin Eval @Superpowers @GitHub @Context7 @Skill Submission Pack Writer

Plugin / repository:
[REPO]

Goal:
[TASK]

Plugin Roles:
- Platform guidance: @OpenAI Developers + @Context7
- Process: @Superpowers
- Source/write surface: @GitHub
- Routing/build support: @Plugin Autopilot when available
- Evaluation: @Plugin Eval
- Submission packaging: @Skill Submission Pack Writer only after implementation/evaluation

Workflow:
1. Inspect current manifest, tools, skills, routing, docs, and release state
2. Define real user jobs
3. Map each user job to a tool or skill
4. Remove overlap and unreachable skills
5. Define positive triggers and exclusions
6. Define safe tool boundaries and mutation behavior
7. Implement focused capabilities
8. Test realistic prompts, ambiguous prompts, and negative prompts
9. Evaluate routing and skill quality
10. Fix evaluation findings
11. Re-test
12. Prepare listing/submission metadata only after behavior is proven
```

## 6.2 Build / Improve an Agent Skill Pack

```text
@Superpowers @Matt Skills Curated @ThoughtfulBits Skills @Skillquiver @Plugin Eval @Skill Submission Pack Writer @GitHub

Skill pack:
[REPO / INPUT]

Workflow:
1. Define user jobs and non-goals
2. Inspect existing skills and router
3. Detect overlap, dead skills, ambiguous triggers, missing exclusions, and weak examples
4. Design one clear router and focused specialist skills
5. Define trigger language, exclusions, handoffs, and companion skills
6. Add realistic workflows and failure cases
7. Test skill invocation with representative prompts
8. Run @Plugin Eval
9. Fix routing/instruction findings
10. Re-run evaluation
11. Prepare submission package only after quality gates pass
```

## 6.3 Evaluate a Plugin or Skill

```text
@Plugin Eval @GitHub

Target:
[REPO / SKILL]

Goal:
[TASK]

Evaluate:
- clarity of job
- trigger precision
- exclusion precision
- routing ambiguity
- instruction quality
- tool discipline
- context efficiency
- failure handling
- examples
- maintainability
- measurable evaluation gaps

Return:
1. highest-impact failures
2. why they matter
3. exact rewrite recommendations
4. suggested benchmark prompts
5. retest criteria
```

## 6.4 Agent Tool Security Policy

```text
@ArmorCodex @Codex Security @Superpowers @Codex Engineering Guardrails

Agent / workflow:
[TASK]

Workflow:
1. Enumerate available tools and data surfaces
2. Classify reads, writes, destructive actions, credential access, production access, and external communication
3. Define allowed, approval-required, and denied actions
4. Define trust boundaries and prompt-injection exposure
5. Protect production, credentials, user data, and irreversible operations
6. Test policy against realistic tool-call scenarios
7. Review bypass paths
8. Document expected safe behavior
```

## 6.5 Audit My Plugin Stack for a Specific Job

```text
@Plugin Management @Plugin Autopilot

Task category:
[INPUT]

Goal:
Choose the smallest useful subset of installed plugins for this job.

For every relevant plugin classify it as:
- Source
- Research
- Planner
- Executor
- Specialist
- Reviewer
- Security Gate
- Runtime QA
- Release Gate
- State/Handoff
- Conditional/Not Needed

Then produce:
1. default stack
2. stage-by-stage invocation order
3. plugins that should not be used together because of overlap
4. optional specialists and exactly when they become useful
5. any plugin whose capability cannot be safely inferred and therefore should not be auto-routed

Use exact installed @Plugin Name syntax.
Do not invent plugin behavior.
```

---

# 7. QA, Security, and Release Workflows

## 7.1 Website QA

```text
@Testifly @Impeccable @Agent Ready

Website:
[URL]

Critical flows:
[INPUT]

Plugin Roles:
- Browser/E2E: @Testifly
- UX/accessibility/visual review: @Impeccable
- Agent readability: @Agent Ready only when relevant

Test:
- navigation
- forms
- authentication where authorized
- validation
- loading/error/success states
- browser console/runtime errors
- responsive behavior
- keyboard accessibility
- focus management
- broken links
- empty states
- persistence/back navigation
- duplicate submit protection
- recovery paths
- machine/agent readability where relevant

For every defect return:
severity
steps
expected
actual
evidence
likely ownership

Retest after fixes.
```

## 7.2 Security Review of a Change

```text
@Codex Security @ArmorCodex @Fallow Code Analysis @SonarQube @GitHub

Target:
[PR / DIFF / COMPONENT]

Workflow:
1. Understand intended behavior and changed attack surface
2. Map trust boundaries
3. Inspect authn/authz
4. Inspect ownership/role checks
5. Inspect secrets and configuration exposure
6. Inspect input validation and dangerous execution paths
7. Inspect data exposure, logs, public payloads, storage policies, and database grants
8. Inspect dependency/security findings where relevant
9. Distinguish confirmed vulnerabilities from hypotheses
10. Rank findings by exploitability and impact
11. Provide concrete remediation and a verification test
```

## 7.3 Release Readiness

```text
@PR Readiness Check @PR Completion @GitHub @CodeRabbit @Superpowers @Testifly

Release / PR:
[INPUT]

Verify:
- requested scope complete
- acceptance criteria mapped to evidence
- targeted tests passing
- regression checks passing
- CI passing
- unresolved review blockers handled
- migrations safe and applied to required environment
- rollback/recovery known where material
- docs/config changes complete
- critical user flows smoke-tested
- security-sensitive changes reviewed
- no known P0/P1 blocker

Verdict must be exactly one of:
READY
READY WITH NON-BLOCKING FOLLOW-UPS
NOT READY

Every verdict requires evidence.
```

## 7.4 Android QA

```text
@Test Android Apps @Superpowers

App / build:
[INPUT]

Flow / bug:
[TASK]

Workflow:
1. Reproduce on emulator
2. Inspect UI tree when useful
3. Capture screenshots for visual evidence
4. Inspect logcat/runtime errors
5. Identify root cause or affected layer
6. Verify fix
7. Check neighboring flows
8. Collect CPU/frame/memory/trace evidence if performance-related
```

---

# 8. Research, Marketing, Strategy, and Content Workflows

## 8.1 Deep Research

```text
@Deep Research @Parallel Search @Tavily AI

Research question:
[TASK]

Date/window:
[DATE_OR_WINDOW]

Workflow:
1. Break the question into sub-questions
2. Identify what must be current vs historical
3. Find primary sources first
4. Add high-quality independent sources for context/challenge
5. Compare publication date with event date
6. Separate facts, estimates, claims, and opinions
7. Investigate conflicting evidence
8. Identify patterns and implications
9. State uncertainty and unresolved gaps
10. Synthesize rather than dump links
11. Cite material factual claims
```

## 8.2 Current Tech News -> Publish-Ready Daily Post

```text
@Parallel Search @Tavily AI @Creator Workspace @Conversational Narrative @Slop Curator

Exact date/window:
[DATE]

Theme:
[TECH / AI / MARKETING / STARTUPS]

Plugin Roles:
- Research: @Parallel Search + @Tavily AI
- Content construction: @Creator Workspace
- Narrative: @Conversational Narrative
- Cleanup: @Slop Curator

Workflow:
1. Research developments from the exact requested date/window
2. Prefer primary announcements and credible reporting
3. Verify dates, numbers, quotes, acquisitions, launches, funding, and policy claims
4. Rank stories by actual significance
5. Select only the stories worth the reader's time
6. For each story identify why it matters beyond the headline
7. Choose one editorial framing for the post
8. Write in natural conversational language
9. Keep technical detail where it makes the story more interesting
10. Remove headline dumping, fake excitement, repetitive hooks, and generic AI transitions
11. Fact-check the final copy against the research before returning it
```

## 8.3 Marketing Strategy

```text
@Marketing Council @Marketing Swarm @Parallel Search @Creator Workspace

Business / brand:
[INPUT]

Goal:
[TASK]

Workflow:
1. Define business objective and measurement
2. Research category context only where evidence is needed
3. Define audience and buying/decision context
4. Define customer job and trigger
5. Define desired outcome
6. Identify barriers, risk, objections, and current alternatives
7. Identify credible proof
8. Define positioning and message hierarchy
9. Map channel roles
10. Define creative territories
11. Define landing/funnel experience
12. Define experiments and success metrics
13. Challenge assumptions before finalizing recommendations

Return prioritized actions, not a generic framework dump.
```

## 8.4 Paid Media Analysis

```text
@Marketing Swarm @Marketing Council @Adobe Marketing Agent @LinkedIn Ads @ChatGPT Ads Manager

Account / campaign:
[INPUT]

Goal:
[TASK]

Routing:
Use only the connected platform plugin that actually owns the requested account data.
Do not call all advertising plugins by default.

Workflow:
1. Verify campaign objective and attribution/measurement context
2. Inspect spend, delivery, pacing, and concentration
3. Analyze conversion quality, not only platform conversion count
4. Inspect audience/segment behavior
5. Inspect creative performance and fatigue
6. Inspect landing/funnel friction
7. Separate measurement issue from media issue
8. Identify wasted spend or underfunded winners
9. Rank tests by expected decision value
10. State which recommendation is evidence-backed vs exploratory
```

## 8.5 Conversion Copywriting

```text
@Creator Workspace @Conversational Narrative @Slop Curator @Marketing Council

Offer:
[INPUT]

Audience:
[AUDIENCE]

Goal:
[TASK]

Workflow:
1. Define awareness stage
2. Define customer job
3. Define trigger
4. Define desired outcome
5. Define obstacle
6. Define perceived risk
7. Define objection
8. Define proof
9. Define offer
10. Define action
11. Choose one primary message
12. Write in customer vocabulary
13. Remove unsupported claims and filler
14. Review the final copy for clarity, specificity, rhythm, and conversion friction
```

## 8.6 Humanize / Rewrite Existing Copy

```text
@AI Humanizer @Conversational Narrative @Slop Curator @Creator Workspace

Draft:
[INPUT]

Tone / goal:
[TASK]

Workflow:
1. Identify the original point and useful specifics
2. Preserve meaning and factual details
3. Improve natural rhythm and transitions
4. Remove repetitive structure
5. Remove generic AI wording and fake punchiness
6. Remove excessive headings or symmetry when they make the writing feel artificial
7. Keep technical specificity where useful
8. Read the result as spoken language
9. Return finished copy, not a commentary on the rewrite
```

## 8.7 Content Series Planning

```text
@Creator Workspace @Marketing Council @Parallel Search @Conversational Narrative

Series:
[TASK]

Audience:
[AUDIENCE]

Workflow:
1. Define why the audience should follow the series repeatedly
2. Define one editorial promise
3. Map recurring topic territories
4. Audit existing posts/angles to avoid repetition
5. Define repeatable formats
6. Define research requirements per format
7. Create a publishing sequence
8. Define hooks and continuation cues without clickbait
9. Define a simple quality checklist for every future post
```

---

# 9. Design, Presentation, and Motion Workflows

## 9.1 Key Visual / Creative Direction

```text
@Marketing Council @Designly @01 Superdesign @Creative Production @Impeccable

Brief:
[INPUT]

Workflow:
1. Define communication job
2. Define audience and context of exposure
3. Define one primary message
4. Identify brand constraints
5. Develop distinct creative territories, not color variations of the same idea
6. Reject generic category imagery
7. Select the strongest direction based on communication clarity
8. Define composition, hierarchy, typography, imagery, color behavior, and production rules
9. Review against the original brief
10. Use @Impeccable for final visual quality critique when relevant
```

## 9.2 Presentation

```text
@Presentations @Designly @Creator Workspace @Impeccable

Presentation:
[TASK]

Audience:
[AUDIENCE]

Decision / outcome:
[OUTCOME]

Workflow:
1. Define what the audience should understand, decide, or do
2. Build the narrative before designing slides
3. Assign one communication job per slide
4. Keep only evidence necessary for that job
5. Define visual direction and hierarchy
6. Design slide-by-slide
7. Remove filler slides and duplicate points
8. Check typography, spacing, RTL/LTR behavior, charts, and readability
9. Review full deck for narrative continuity
10. End with the actual decision/action needed, not a generic closing slide
```

## 9.3 Canva Design Workflow

```text
@Canva @Designly @01 Superdesign @Impeccable

Design:
[TASK]

Workflow:
1. Inspect existing design/brand context if present
2. Define format and communication job
3. Establish hierarchy and concept
4. Create/edit in Canva
5. Check typography, spacing, alignment, contrast, and brand consistency
6. Adapt sizes only after the master design is coherent
7. Review output for readability and production mistakes
```

## 9.4 LinkedIn Animated Infographic

```text
@LinkedIn Animated Infographics @Creator Workspace @01 Superdesign @Impeccable

Topic/content:
[TASK]

Reference if any:
[INPUT]

Workflow:
1. Define one communication job
2. Build a concise narrative
3. Map scenes/frames and reading order
4. Define hierarchy per frame
5. Define motion only where it helps comprehension
6. Set reading time and pacing
7. Prevent overlap and layout jumps
8. Review typography and spacing frame-by-frame
9. Verify loop/ending behavior
10. Produce the final implementation/spec using the plugin's supported surface
```

## 9.5 Remotion Video

```text
@Remotion @Creative Production @01 Superdesign

Video:
[TASK]

Workflow:
1. Define story and duration
2. Break into scenes
3. Define visual hierarchy per scene
4. Define timing and transitions
5. Implement motion
6. Add captions/audio only where needed
7. Preview the full sequence
8. Fix pacing/readability issues
9. Render final output
10. Verify rendered file, not only preview state
```

---

# 10. Connected Workspace Workflows

## 10.1 Gmail Task

```text
@Gmail

Task:
[TASK]

Workflow:
1. Search/read the relevant thread first
2. Use actual sender, recipient, subject, dates, and message context
3. Distinguish received facts from your interpretation
4. Draft only after reading the relevant thread
5. Send/archive/label/forward only when explicitly requested
6. Confirm the actual action result
```

## 10.2 Google Drive Research

```text
@Google Drive

Task:
[TASK]

Workflow:
1. Locate relevant files
2. Read source content rather than inferring from filenames
3. Identify authoritative/current version when duplicates exist
4. Compare documents when required
5. Summarize with traceability to source files
6. Do not overwrite/reorganize content unless explicitly requested
```

## 10.3 Notion Workspace Task

```text
@Notion

Task:
[TASK]

Workflow:
1. Search the relevant workspace context
2. Identify current authoritative page/database
3. Read before writing
4. Preserve existing information architecture and properties unless change is required
5. Update the existing source when appropriate instead of creating duplicates
6. Verify the resulting workspace state
```

## 10.4 GitBook Documentation Workflow

```text
@GitBook @Documents @GitHub @Context7

Project:
[REPO / DOCS SPACE]

Task:
[TASK]

Workflow:
1. Inspect actual repo/product behavior
2. Inspect existing docs hierarchy
3. Define reader jobs
4. Separate getting started, concepts, how-to, reference, troubleshooting
5. Verify code examples and commands
6. Remove stale or duplicated docs
7. Update GitBook in the correct location when authorized
8. Verify navigation and published result
```

## 10.5 Spreadsheet Analysis

```text
@Spreadsheets

File / data:
[INPUT]

Question:
[TASK]

Workflow:
1. Inspect sheets, headers, types, formulas, missing values, and quality issues
2. Preserve raw data
3. Put derived calculations in explicit formulas where the workbook should remain dynamic
4. Validate totals and key calculations independently
5. Use charts only when they clarify a decision
6. Return the modified workbook when edits are requested
```

## 10.6 PDF Analysis / Editing

```text
@PDF

PDF:
[INPUT]

Task:
[TASK]

Workflow:
1. Read the relevant pages
2. Preserve page-level traceability for important claims
3. Inspect tables/figures where they affect interpretation
4. Separate source statements from analysis
5. For edits, preserve layout and rendering quality
6. Verify the rendered final PDF
```

---

# 11. Specialized Technical Workflows

## 11.1 Hugging Face Model / Dataset Review

```text
@Hugging Face @Parallel Search

Target:
[MODEL / DATASET / SPACE]

Task:
[TASK]

Workflow:
1. Inspect actual metadata and documentation
2. Check license
3. Check task and architecture
4. Check model/data size and formats
5. Check hardware/runtime requirements
6. Check intended use and limitations
7. Check update history
8. Check evaluation evidence
9. Compare alternatives only on comparable metrics
10. Flag unclear safety or licensing details
```

## 11.2 MCP / Agent Service Deployment

```text
@Manufact @GitHub @Superpowers @Codex Security

Service / repository:
[INPUT]

Task:
[TASK]

Workflow:
1. Inspect current deployment and repo linkage
2. Inspect build/runtime logs
3. Verify requested revision/environment
4. Protect credentials and production settings
5. Deploy only authorized changes
6. Smoke-test exposed tools/resources
7. Inspect logs after deployment
8. Run security review on changed external/tool boundaries
9. Report actual deployment evidence
```

## 11.3 Durable Workflow Design

```text
@Temporal @Superpowers @Context7 @Mermaid Chart

Workflow / automation:
[TASK]

Workflow design steps:
1. Define trigger
2. Define durable state
3. Define deterministic workflow logic
4. Define activities/external side effects
5. Define retries and timeouts
6. Define idempotency
7. Define cancellation
8. Define human approval points
9. Define failure/recovery behavior
10. Define observability
11. Model the state transitions
12. Test failure scenarios before calling the design complete
```

---

# 12. Stage-Based Plugin Stacks

Use these as defaults, not mandatory bundles.

## Research Stage

```text
@Parallel Search @Tavily AI @Deep Research @Context7

Use only the subset needed to remove material uncertainty.
```

## Product / Task Planning Stage

```text
@AI Task Brief Builder @Superpowers @taskplane @Create State

Turn confirmed evidence into scope, dependencies, acceptance criteria, tests, risks, and out-of-scope items.
```

## Engineering Implementation Stage

```text
@Superpowers @GitHub @Remote Desktop Commander @Context7 @Codex Engineering Guardrails

Implement approved scope in small verifiable changes.
```

## Code Review Stage

```text
@CodeRabbit @Fallow Code Analysis @Codex Engineering Guardrails @GitHub

Review only after a meaningful diff exists.
```

## Security Stage

```text
@Codex Security @ArmorCodex @SonarQube

Inspect changed trust boundaries and confirm consequences.
```

## Runtime UI / UX QA Stage

```text
@Testifly @Impeccable @Agent Ready

Verify real user behavior and only include @Agent Ready when machine readability matters.
```

## Release Stage

```text
@PR Readiness Check @PR Completion @GitHub @CodeRabbit

Require evidence before release/merge judgment.
```

## Handoff / Long Session State

```text
@Create State @get-fable @Adaptive Codex Orchestrator

Persist current truth, not a narrative reconstruction.
```

---

# 13. High-Value Combined Workflows

## 13.1 Full Staff Engineer Long Session

```text
@Remote Desktop Commander @GitHub @Superpowers @get-fable @Adaptive Codex Orchestrator @Context7 @Codex Engineering Guardrails @CodeRabbit @Codex Security @Testifly @Impeccable @PR Readiness Check

Repository:
[REPO]

Local checkout:
[LOCAL_PATH]

Mission:
[TASK]

Operate as a long-running staff engineer.

Role assignment:
- Source: @GitHub + @Remote Desktop Commander
- Process: @Superpowers
- Long-session coordination: @get-fable + @Adaptive Codex Orchestrator
- Docs: @Context7 only when needed
- Engineering guardrails: @Codex Engineering Guardrails
- Review: @CodeRabbit after implementation
- Security: @Codex Security only where trust boundaries changed
- Runtime QA: @Testifly + @Impeccable for affected user-facing flows
- Readiness: @PR Readiness Check only after evidence exists

Workflow:
1. Restore live state
2. Build current completion map
3. Continue existing plan, do not restart
4. Execute highest-value unfinished slice
5. Test aggressively but proportionately to risk
6. Review code and changed trust boundaries
7. Run user-flow QA where relevant
8. Map acceptance criteria to evidence
9. Continue while safe useful work remains
10. Stop only at verified completion or a real external blocker

At every meaningful checkpoint report:
- completed change
- evidence
- remaining scope

Never stop at a plan when implementation is requested and safe.
Never claim 100% without passing every required gate.
```

## 13.2 Product Feature -> Implementation -> QA -> PR

```text
@AI Task Brief Builder @Superpowers @GitHub @Remote Desktop Commander @Context7 @Codex Engineering Guardrails @CodeRabbit @Testifly @PR Readiness Check

Feature:
[TASK]

Repository:
[REPO]

1. Restore live state
2. Convert feature intent into explicit requirements
3. Define acceptance criteria and tests
4. Trace affected data/API/auth/UI paths
5. Implement the smallest complete slice
6. Test happy, failure, edge, and regression paths
7. Review final diff
8. Test real user flow
9. Check readiness against actual evidence
10. Return completion matrix
```

## 13.3 Research -> Strategy -> Publish-Ready Copy

```text
@Deep Research @Parallel Search @Tavily AI @Marketing Council @Creator Workspace @Conversational Narrative @Slop Curator

Topic / business problem:
[INPUT]

Goal:
[TASK]

Workflow:
1. Research current evidence
2. Separate signal from noise
3. Derive strategic implication
4. Choose one communication angle
5. Draft final copy
6. Remove generic AI structure and filler
7. Fact-check the final draft against research
8. Return publish-ready copy
```

## 13.4 Design Brief -> Direction -> Production Review

```text
@Marketing Council @Designly @01 Superdesign @Creative Production @Impeccable

Brief:
[INPUT]

Workflow:
1. Clarify communication job
2. Define strategic message
3. Create distinct creative territories
4. Select the strongest based on clarity and brand fit
5. Translate into composition, typography, imagery, color behavior, and production rules
6. Produce or guide execution
7. Review final production against the original brief
```

---

# 14. Workflow Anti-Patterns

Do not do these:

```text
BAD: @Superpowers @GitHub @Context7 @CodeRabbit @Testifly @Supabase @Vercel @Designly @Marketing Council ... then one vague instruction

WHY: no role ownership, unnecessary context, duplicated work, unclear completion gate
```

```text
BAD: Ask @CodeRabbit to review before any implementation or diff exists

BETTER: implement -> test -> review
```

```text
BAD: Ask @PR Readiness Check whether a feature is ready before tests, CI, and requirement evidence exist

BETTER: collect evidence -> readiness verdict
```

```text
BAD: Use @Context7 as a general web search engine

BETTER: use it for current library/framework documentation
```

```text
BAD: Use @Parallel Search or @Tavily AI when the answer should come from a connected private source such as @GitHub, @Gmail, @Google Drive, @Notion, or @Supabase

BETTER: inspect the authoritative connected source first
```

```text
BAD: Let two plugins mutate the same repository/file/account in parallel

BETTER: one write owner, multiple reviewers if useful
```

```text
BAD: Invoke security, QA, and release plugins on every tiny task

BETTER: escalate gates based on changed risk surface
```

```text
BAD: Route a plugin purely because its name sounds relevant

BETTER: only route plugins with known capabilities in the current session or documented workflow
```

---

# 15. Maturity Checklist for Any New Prompt Added to This File

Before adding a new workflow, verify it contains:

```text
[ ] Clear user job
[ ] Source of truth
[ ] Minimal plugin stack
[ ] Explicit plugin roles
[ ] Invocation order
[ ] Write owner
[ ] Risk/security trigger
[ ] Verification method
[ ] Review gate where relevant
[ ] Runtime QA where relevant
[ ] Completion criteria
[ ] Evidence requirements
[ ] Failure/blocker behavior
[ ] No invented plugin capability
```

A mature workflow should answer five questions immediately:

```text
1. What are we trying to finish?
2. Which source tells us the truth?
3. Which plugin owns each stage?
4. What evidence proves the work?
5. What exactly allows us to call it complete?
```

If a prompt cannot answer those five questions, it is not mature enough yet.
