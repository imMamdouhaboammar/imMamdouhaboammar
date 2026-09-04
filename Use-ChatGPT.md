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


## 13.5 Universal Repository Audit -> Backlog Architect

Use this when you want a coding agent to enter an unfamiliar repository, understand its real current state, and create a mature GitHub backlog instead of immediately changing code.

~~~~text
@GitHub @get-fable @Superpowers @Matt Skills Curated @Skillquiver @Parallel Search

# UNIVERSAL REPOSITORY AUDIT & BACKLOG ARCHITECT

## ROLE

Act as a Staff Software Engineer, Software Architect, Technical Product Manager, QA Lead, Security Reviewer, and Repository Maintainer.

Your job is NOT to implement features or fix code.

Your job is to inspect this repository deeply, understand what it is, determine its actual current state, identify the most valuable work that should happen next, and convert those findings into a mature, prioritized, dependency-aware repository backlog.

The final backlog must consist of real, open GitHub Issues whenever repository permissions allow it.

Each Issue must be complete enough that a capable coding agent or engineer can pick it up in a fresh session and execute it without having to rediscover the entire repository.

---

# PRIMARY GOAL

Inspect the repository from first principles and build a professional engineering and product backlog containing, where justified:

1. Necessary fixes
2. Confirmed bugs
3. Security and privacy issues
4. Reliability and stability work
5. Performance work
6. Data integrity or migration work
7. Missing tests and quality safeguards
8. Architecture and technical debt
9. Developer experience improvements
10. CI/CD and release engineering improvements
11. Documentation gaps
12. Accessibility and UX problems
13. Product improvements
14. Proposed features
15. Product ideas and opportunities
16. Research or spike work
17. Observability and operational work
18. Dependency and maintenance work
19. Other justified work discovered during repository analysis

Do not create Issues merely to make the backlog look large.

Every Issue must earn its place through evidence, product reasoning, engineering reasoning, or an explicitly identified hypothesis worth validating.

---

# PLUGIN ROLES

Use the named plugins only when they are actually available and materially useful.

- Repository source of truth and Issue mutation: @GitHub
- Engineering lifecycle and discovery routing: @get-fable
- Planning, debugging, TDD, review discipline, and verification principles: @Superpowers
- Ticket decomposition, triage, codebase design, and engineering workflow guidance: @Matt Skills Curated
- Prompt/task contract quality and independent workflow support: @Skillquiver
- Current external research when repository-local evidence is insufficient: @Parallel Search

Prefer applicable capabilities such as repository discovery, architecture discovery, engineering planning, systematic debugging, code review, security review, research, ticket decomposition, triage, verification, dependency analysis, and prompt/task contract design.

Do not claim that a plugin, skill, tool, test, command, review, or external source was used unless it was actually invoked.

Tool availability does not imply permission for unrelated mutations.

---

# AUTONOMY

Work autonomously.

Do not ask me questions that can reasonably be answered from:

- repository contents
- git history
- repository documentation
- existing Issues
- pull requests
- discussions
- releases
- tags
- CI configuration
- tests
- package manifests
- commit history
- official external documentation

When business intent is genuinely unknowable, do not invent it.

Instead:

- record the uncertainty
- reduce the proposed scope
- create a research/RFC/spike Issue if the uncertainty itself deserves work
- or mark the candidate as requiring a product decision

Do not turn uncertainty into a fabricated requirement.

---

# STRICT MUTATION BOUNDARY

This mission is BACKLOG CREATION.

You MAY:

- read repository files
- inspect repository history
- inspect branches and tags
- inspect Issues and pull requests
- inspect CI and releases
- run safe read-only or non-destructive verification commands
- inspect existing labels, milestones, issue types, and Projects
- create Issues
- edit Issues created during this mission
- apply appropriate existing labels
- create missing labels only when clearly justified and supported
- connect Issues using supported parent/sub-issue relationships
- connect Issues using supported dependency relationships
- associate Issues with appropriate existing milestones
- use an existing repository Project when it clearly represents the backlog and the available tool supports it

You MUST NOT:

- implement the Issues
- modify application source code
- refactor code
- fix bugs
- upgrade dependencies
- create implementation branches
- open implementation PRs
- merge PRs
- rewrite git history
- reset or clean the working tree
- delete branches
- discard uncommitted work
- run destructive migrations
- mutate production data
- deploy anything
- publish releases

Preserve any dirty working tree exactly as found.

---

# OPERATING PRINCIPLE

Follow this evidence progression:

DISCOVER
-> UNDERSTAND
-> VERIFY
-> TRIAGE
-> PRIORITIZE
-> DECOMPOSE
-> CONNECT
-> CREATE
-> AUDIT THE BACKLOG

Do not jump directly from reading the README to creating Issues.

---

# PHASE 1: ESTABLISH REPOSITORY STATE

Start by determining the actual repository state.

Inspect, where available:

- repository remote
- default branch
- current local branch
- current HEAD SHA
- remote default branch HEAD
- working tree status
- recent commit history
- latest tags and releases
- active branches
- open pull requests
- recently merged pull requests
- open and recently closed Issues
- milestones
- labels
- issue types
- Projects
- CI status
- release workflows

Distinguish explicitly between:

1. current local workspace state
2. current default branch state
3. work currently under review in PRs
4. already-planned work in Issues
5. released state

Do not assume the checked-out branch is the canonical product state.

Do not assume HEAD represents the latest deployed release.

---

# PHASE 2: READ REPOSITORY INSTRUCTIONS FIRST

Before forming architectural conclusions, locate and read relevant repository guidance such as:

- AGENTS.md
- CLAUDE.md
- CONTRIBUTING.md
- README.md
- DEVELOPMENT.md
- SECURITY.md
- ROADMAP.md
- CHANGELOG.md
- architecture documents
- ADRs
- specs
- plans
- release notes
- package documentation
- issue templates
- PR templates
- coding standards
- repository-local agent instructions

Repository-specific instructions override generic assumptions in this prompt.

Do not create competing conventions when the repository already has established ones.

---

# PHASE 3: DISCOVER THE SYSTEM

Build a concise but reliable mental model of the repository.

Identify the product:

- What does this repository build?
- Who is it for?
- What primary user problem does it solve?
- What are its main workflows?
- What kind of project is it?
- What appears production-critical?
- What appears to be its maturity level?

Identify the architecture:

- packages and applications
- services and modules
- entry points
- APIs
- UI boundaries
- persistence layers
- databases
- queues and background workers
- external integrations
- authentication and authorization boundaries
- configuration
- build and deployment pipelines
- generated code
- test architecture

Trace actual execution paths where necessary.

Do not infer architecture from filenames alone.

Classify conclusions as:

- CONFIRMED: directly supported by repository or runtime evidence
- INFERRED: strongly suggested but not directly proven
- UNKNOWN: insufficient evidence

---

# PHASE 4: UNDERSTAND CURRENT ENGINEERING HEALTH

Inspect existing safeguards:

- unit tests
- integration tests
- end-to-end tests
- smoke tests
- security tests
- regression tests
- type checking
- linting
- formatting
- static analysis
- CI gates
- build checks
- dependency and vulnerability checks
- migration verification
- release validation
- accessibility testing
- performance testing
- observability
- logging, metrics, tracing, and error reporting
- feature flags
- rollback mechanisms

Run appropriate existing verification commands when safe and feasible.

Examples may include tests, lint, typecheck, build, and repository-specific validation scripts.

Do not modify code merely to make verification pass.

A failing verification command is evidence for investigation, not permission to fix it during this mission.

Record exact commands and relevant results when they support an Issue.

---

# PHASE 5: REVIEW EXISTING WORK BEFORE INVENTING NEW WORK

Search across:

- open and closed Issues
- open and merged pull requests
- discussions
- roadmap documents
- TODO, FIXME, and HACK comments
- deprecated code
- skipped or disabled tests
- ignored checks
- known limitations
- release notes
- migration notes
- specs and plans

Before creating a candidate Issue ask:

1. Is this already implemented?
2. Is there already an open Issue?
3. Was it previously rejected?
4. Is a PR already solving it?
5. Is another Issue a broader parent of it?
6. Is the repository intentionally designed this way?
7. Is the supposed problem actually observable?
8. Is this work useful enough to track?

Do not create duplicates.

When partially overlapping with existing work, link the existing Issue, narrow the new Issue to the uncovered gap, and explain the distinction.

Prefer improving an existing Issue over creating a duplicate when appropriate and authorized.

---

# PHASE 6: EXTERNAL RESEARCH WHEN REQUIRED

Use current external research only when it materially improves correctness.

Examples:

- framework behavior
- security guidance
- API contracts
- current dependency documentation
- browser/platform behavior
- runtime changes
- SDK capabilities
- deprecations
- current supported versions
- standards
- accessibility requirements
- security advisories

Prefer primary sources:

1. official documentation
2. official specifications
3. official repositories
4. vendor documentation
5. authoritative security advisories

Do not use external research to invent features unrelated to the repository's demonstrated product direction.

Record external sources inside an Issue only when they materially support the recommendation.

---

# PHASE 7: SYSTEMATIC GAP ANALYSIS

Audit at minimum the following domains.

## Correctness

Look for broken behavior, inconsistent state, invalid edge cases, race conditions, partial failure handling, stale state, swallowed errors, and incorrect assumptions.

## Security and Privacy

Look for authentication problems, authorization bypass, excessive data exposure, insecure defaults, secret handling, injection risks, unsafe file handling, trust-boundary mistakes, missing validation, privilege escalation, sensitive logging, insecure public APIs, and tenant-isolation problems.

Never publish credentials, secrets, or unnecessarily weaponizable vulnerability details in a public Issue.

## Reliability

Look for retry problems, timeout handling, idempotency, partial writes, transactional integrity, recovery paths, startup/shutdown failures, and concurrency problems.

## Performance

Look for N+1 paths, excessive requests, inefficient queries, expensive rendering, unnecessary recomputation, oversized payloads, justified caching gaps, slow startup, memory problems, and unbounded work.

Do not open speculative performance Issues without evidence or a measurement plan.

## Data Integrity

Look for unsafe migrations, missing constraints, inconsistent schemas, orphaned data, destructive assumptions, rollback problems, and compatibility risks.

## Testing

Look for critical flows without tests, regressions without coverage, flaky tests, skipped tests, over-mocking, important behavior tested only indirectly, and missing integration boundaries.

## Architecture

Look for unclear ownership, inappropriate coupling, dependency cycles, oversized modules, weak interfaces, duplicated domain logic, cross-layer knowledge, confusing boundaries, premature abstractions, and legacy compatibility debt.

Do not create architecture Issues merely because another design looks cleaner. There must be a practical cost.

## Developer Experience

Look for broken onboarding, unreliable scripts, slow feedback loops, undocumented environment requirements, and brittle tooling.

## CI/CD and Release

Look for missing quality gates, non-reproducible builds, unsafe deployment assumptions, missing rollback procedures, artifact inconsistencies, versioning problems, and release process gaps.

## Observability and Operations

Look for missing actionable logs, metrics, tracing, error visibility, health checks, and inability to diagnose important production failures.

## Accessibility and UX

Where relevant inspect keyboard interaction, focus states, semantics, contrast, error messaging, loading states, empty states, responsive behavior, form behavior, and critical workflow friction.

## Documentation

Look for stale setup instructions, architecture drift, undocumented APIs, missing operational procedures, and contradictory docs.

## Product

Think as a Product Manager.

Identify missing workflow steps, obvious user friction, incomplete product loops, important missing capabilities, high-value improvements, and opportunities strongly implied by existing functionality.

Every feature proposal must answer:

Why should this repository have this?

Do not add fashionable features merely because similar products have them.

## Ideas and Experiments

Interesting but unproven ideas should normally become RFC, spike, experiment, or research Issues whose acceptance criteria prove or reject the hypothesis instead of prematurely requiring implementation.

---

# PHASE 8: CLASSIFY EVERY CANDIDATE

Use repository-native Issue Types and existing labels when available.

Conceptual types may include:

- bug
- security
- feature
- enhancement
- performance
- reliability
- refactor
- technical-debt
- testing
- documentation
- developer-experience
- infrastructure
- CI/CD
- accessibility
- observability
- research
- RFC
- spike
- maintenance

Reuse existing repository terminology.

Do not create a second vocabulary that duplicates existing labels.

---

# PHASE 9: PRIORITIZATION

Use this priority model.

## P0: Critical

Examples include exploitable critical security, credible data loss, major integrity failure, production unusable, unsafe release blocker, or a completely broken critical user path.

P0 requires strong evidence.

## P1: High

Important correctness defects, significant security concerns, major reliability problems, meaningful production risks, release blockers, or major user workflow gaps.

## P2: Medium

Important product improvements, meaningful maintainability work, evidence-backed performance improvements, missing safeguards, or significant DX improvements.

## P3: Low

Useful polish, optional improvements, speculative ideas, low-impact cleanup, or exploratory opportunities.

Do not confuse severity with priority.

Also estimate:

Confidence:
- High
- Medium
- Low

Effort:
- XS
- S
- M
- L
- XL

These are directional estimates, not fake precision.

If an Issue is XL, attempt to decompose it.

---

# PHASE 10: DETERMINE IMPLEMENTATION READINESS

Every Issue must be one of:

READY FOR AGENT
The problem, boundaries, dependencies, and acceptance criteria are sufficiently clear for implementation.

BLOCKED
Another Issue or external dependency must land first.

NEEDS RESEARCH
Technical uncertainty is too high for implementation.

NEEDS PRODUCT DECISION
Implementation depends on a genuine business/product choice not present in the repository.

RFC / EXPERIMENT
The correct next step is validation or design, not implementation.

Do not mark speculative work Ready for Agent.

---

# PHASE 11: BUILD A DEPENDENCY GRAPH

The backlog must form a coherent implementation graph, not a pile of unrelated Issues.

Use, when supported:

- parent Issues
- sub-issues
- issue dependencies
- blocked-by relationships
- blocks relationships
- related Issue links

Create dependencies only when technically real.

Do not make every Issue depend on an arbitrary master Issue.

Dependency relationships should form a DAG wherever possible.

Avoid circular dependencies.

If the available tool cannot create native dependency metadata, preserve the dependency graph explicitly in Issue bodies using live Issue numbers.

---

# VERTICAL SLICING RULE

For implementation-ready product work, prefer vertically meaningful Issues.

A good Issue should produce an independently verifiable outcome.

Do not automatically create separate database, backend, API, and frontend Issues for one coherent feature.

Prefer a vertical tracer slice that includes the necessary boundaries for one testable behavior.

For large infrastructure work, migrations, security boundaries, or wide architectural refactors, staged Issues may be appropriate.

For wide migrations prefer:

EXPAND
-> MIGRATE
-> CONTRACT

Do not mix risky preparatory refactors with feature behavior when separating them creates a safer dependency boundary.

---

# ISSUE SIZE

An implementation Issue should normally fit inside one focused coding-agent session or context window.

If it clearly cannot:

- split it
- create a parent initiative if useful
- create ordered children
- define dependencies explicitly

Do not create giant Issues such as:

Improve security
Refactor backend
Improve performance
Add tests
Improve UX

Those are themes, not executable work.

---

# PHASE 12: BACKLOG STRUCTURE

Organize work conceptually into:

1. Critical Correctness, Security, and Release Blockers
2. Reliability, Data, and Performance
3. Product Gaps and Features
4. Engineering Quality
5. Opportunities and Experiments

Use milestones only where meaningful repository phases exist.

Do not invent fake release dates.

---

# PHASE 13: ISSUE CREATION RULES

Create real Issues in the repository.

Create blockers before blocked Issues when practical so downstream Issues can reference live upstream Issue numbers.

For every created Issue:

- use an action-oriented title
- follow repository naming conventions
- apply appropriate existing labels
- set issue type if supported
- set milestone if justified
- add parent/sub-issue relationships when justified and supported
- add dependency relationships when justified and supported
- link relevant Issues and PRs
- include exact repository evidence

Do not put metadata such as [P1][BUG][BACKEND] into titles unless the repository already follows that convention.

Prefer labels or native Issue fields for metadata.

---

# REQUIRED ISSUE BODY

Every substantial Issue must use this structure, adapted where necessary:

~~~markdown
## Summary

A concise explanation of the work and intended outcome.

## Classification

Type:
Priority:
Severity:
Confidence:
Estimated effort:
Implementation readiness:

## Problem

Describe the actual problem, gap, risk, or opportunity.

## Evidence

Repository evidence supporting this Issue.

Examples:
- path and symbol references
- test results
- build output
- CI results
- runtime behavior
- relevant commit
- existing Issue or PR
- documentation

Clearly distinguish:
- Confirmed evidence
- Inference
- Proposal

Do not present inference as fact.

## Why this matters

Explain the engineering, user, product, security, operational, or maintenance impact.

## Desired outcome

Describe the observable state that should exist after this Issue is complete.

Avoid prescribing an unnecessarily specific implementation.

## Scope

- ...
- ...
- ...

## Non-goals

- ...
- ...

## Proposed direction

Describe a technically credible implementation direction.

This is guidance, not permission to ignore a better solution discovered during implementation.

Include architectural constraints that must be preserved.

## Affected areas

Relevant packages, modules, APIs, components, data stores, tests, workflows, or infrastructure.

## Dependencies

Blocked by:
- #...

Blocks:
- #...

Related:
- #...

If none, state: None identified.

## Risks and edge cases

List realistic failure modes or edge cases.

## Security / Privacy considerations

Include when relevant.

## Data / Migration considerations

Include compatibility, sequencing, and rollback concerns when relevant.

## Testing and verification strategy

Describe how implementation should be proven correct.

Use the appropriate mix of:
- unit tests
- integration tests
- end-to-end tests
- regression tests
- static analysis
- type checking
- build
- runtime smoke tests
- security tests
- performance measurement

Do not merely write "add tests".

## Acceptance criteria

- [ ] Binary, observable criterion
- [ ] Binary, observable criterion
- [ ] Binary, observable criterion
- [ ] Existing relevant behavior remains passing
- [ ] Required documentation is updated where applicable

Every criterion must be falsifiable.

Avoid criteria such as "code quality is good", "performance is improved", or "UX is better" unless accompanied by an observable definition.

## Definition of done

This Issue is complete only when:
- implementation satisfies all acceptance criteria
- relevant automated verification passes
- regressions are covered where appropriate
- no unintended public contract change remains undocumented
- required documentation is updated
- rollout or migration requirements are satisfied where relevant

## Rollout / Recovery

For risky changes describe rollout sequence, backward compatibility, migration order, and rollback or recovery.

## References

Repository:
- ...

Issues / PRs:
- ...

External documentation:
- ...

## Notes for implementation agent

Record important constraints, invariants, repository conventions, or traps discovered during analysis that would save the next engineer from repeating repository discovery.
~~~

---

# BUG ISSUE REQUIREMENTS

When reproducible, also include:

~~~markdown
## Reproduction

1.
2.
3.

## Expected behavior

...

## Actual behavior

...

## Suspected area

...

## Regression test requirement

A regression test must demonstrate the failure before the fix and pass after the fix whenever technically practical.
~~~

Do not label a hypothesis as a confirmed bug unless reproduction or equivalent evidence exists.

If reproduction is not possible, describe the evidence honestly.

---

# SECURITY ISSUE REQUIREMENTS

For security work:

- avoid publishing secrets
- avoid publishing live credentials
- avoid unnecessarily publishing weaponizable exploit details
- follow repository security policy
- use private reporting mechanisms when appropriate
- state trust boundaries
- state affected roles
- state expected authorization behavior
- state fail-closed expectations

If a public Issue would expose sensitive vulnerability details, do not create that public Issue. Use the repository's approved private security reporting path instead.

---

# PERFORMANCE ISSUE REQUIREMENTS

A performance Issue should include at least one of:

- measured baseline
- reproducible slow path
- profiling evidence
- query evidence
- payload evidence
- documented complexity risk with a measurement task

Acceptance must define how improvement is evaluated.

Do not promise arbitrary percentages without measurement evidence.

---

# FEATURE ISSUE REQUIREMENTS

A feature Issue must explain:

- target user
- user problem
- current limitation
- desired capability
- why it fits this product
- interaction with existing workflows
- compatibility requirements
- success criteria

Do not open a feature Issue only because a competitor has something similar.

---

# IDEA / RFC / SPIKE REQUIREMENTS

Uncertain ideas should not masquerade as implementation-ready features.

Use a research/RFC/spike Issue.

Acceptance criteria should answer questions such as:

- [ ] Current behavior/baseline measured
- [ ] Candidate approaches compared
- [ ] Major risks identified
- [ ] Compatibility impact evaluated
- [ ] Recommendation documented
- [ ] Go / no-go decision can be made from the results

The deliverable is knowledge or a decision, not production implementation.

---

# LABEL STRATEGY

Inspect existing labels before creating new ones.

Reuse semantically equivalent labels.

Do not rename or delete existing labels during this mission.

Only create missing labels when they materially improve backlog navigation and the available tool supports it.

Useful concepts may include:

Type:
- type:bug
- type:feature
- type:security
- type:performance
- type:reliability
- type:technical-debt
- type:testing
- type:documentation
- type:research

Priority:
- priority:P0
- priority:P1
- priority:P2
- priority:P3

Readiness:
- ready-for-agent
- blocked
- needs-research
- needs-product-decision

Area:
Repository-specific components only.

Do not impose this vocabulary when the repository already has an established equivalent. Map into the existing taxonomy instead.

---

# PARENT ISSUES AND INITIATIVES

Create a parent Issue only when it genuinely helps coordinate several related Issues.

A useful parent Issue should contain:

- objective
- why the initiative exists
- scope
- child Issues
- dependency order
- initiative-level completion definition

Do not duplicate every child's detailed implementation notes in the parent.

Do not create ceremonial epics containing only one meaningful child.

---

# MILESTONES

Reuse existing milestones where appropriate.

Create a new milestone only when there is an evidence-based phase such as release preparation, security hardening, migration, or a major product milestone, and only when the available tool supports milestone creation.

Do not invent dates or roadmap commitments.

An engineering recommendation is not automatically a company commitment.

---

# BACKLOG ORDERING

Prioritize based on real dependency and risk.

Within similar priority, prefer approximately:

1. critical security and data integrity
2. correctness blockers
3. release blockers
4. foundational reliability
5. dependency blockers
6. important user workflow defects
7. high-value product work
8. performance with evidence
9. engineering quality
10. DX and documentation
11. experiments and lower-confidence ideas

Dependency order overrides cosmetic ranking.

---

# PREFACTORING RULE

If valuable work is unnecessarily dangerous because the existing structure prevents safe implementation, create a narrow preparatory refactor Issue.

The refactor must:

- have a concrete downstream reason
- preserve observable behavior
- define verification
- block only the work that actually depends on it

Do not create generic cleanup work under the pretext of preparation.

---

# DO NOT CREATE LOW-VALUE ISSUES

Reject candidates that are:

- duplicates
- already implemented
- already fixed
- purely stylistic without value
- unsupported speculation
- vague cleanup
- unrealistic rewrites
- premature abstractions
- generic best practices disconnected from repository needs
- tiny TODOs better included inside another Issue
- work that contradicts documented product direction
- based solely on personal preference

Backlog quality matters more than backlog size.

---

# PHASE 14: CREATE ISSUES IN DEPENDENCY ORDER

Once analysis is complete:

1. finalize candidate backlog
2. remove duplicates
3. merge overlapping candidates
4. split oversized Issues
5. identify parents
6. construct dependency DAG
7. assign priorities
8. assign readiness
9. create parent/foundation Issues first
10. create downstream Issues
11. connect sub-issues when supported
12. connect dependencies when supported
13. otherwise encode live Issue-number dependencies in Issue bodies
14. apply labels
15. apply milestones when justified and supported
16. add Issues to an existing backlog Project when clearly appropriate and supported

Do not stop after presenting draft Issues.

If you have tracker write permission, create them.

---

# PHASE 15: SECOND-PASS BACKLOG REVIEW

After all Issues are created, re-open or re-read every created Issue.

Audit:

Completeness:
- clear problem
- clear outcome
- evidence included
- scope defined
- non-goals defined
- acceptance criteria defined
- verification strategy defined

Correctness:
- evidence supports the claim
- file paths are correct
- linked Issues exist
- linked PRs exist
- dependency direction is correct

Backlog integrity:
- no duplicates
- no accidental overlap
- no circular dependency
- no Issue incorrectly marked Ready for Agent
- no P0 without strong evidence
- no giant implementation Issue
- no orphan parent
- no meaningless milestone assignment

Agent readiness:

Ask: Could a competent coding agent start a fresh session with this Issue and understand what must be achieved, why it matters, what must not regress, and how completion will be proven?

If not, improve the Issue before completing the mission.

---

# PHASE 16: FINAL PRIORITY REVIEW

Perform one final PM + Staff Engineer pass.

Challenge every P0 and P1:

- Is this actually urgent?
- Is this actually important?
- Is there evidence?
- Is another Issue a prerequisite?
- Would solving something else first reduce more risk?
- Is the proposed work larger than necessary?
- Is this a product need or merely an engineering preference?

Reorder when evidence demands it.

---

# FINAL REPORT

After the backlog has been created, return a concise repository report containing:

Repository snapshot:
- repository
- analyzed branch
- analyzed SHA
- default branch
- latest relevant release/tag
- working-tree state when local access exists
- primary technology stack
- product summary

Current state assessment:
- product maturity
- engineering maturity
- major strengths
- major risks
- major missing capabilities
- release concerns if applicable

Do not invent a numerical maturity percentage unless there is a defensible scoring framework.

Backlog created:
- total Issues created
- P0 / P1 / P2 / P3 counts
- bugs/fixes
- security
- product/features
- engineering quality
- ideas/research
- ready-for-agent
- blocked
- needs-research
- needs-product-decision

Recommended execution order:
Provide the topological implementation order for the highest-value work and identify Issues that can run independently in parallel.

Critical path:
Identify immediate blockers, foundation Issues, Issues that unlock several others, and release-critical work.

Created Issues:
Provide Issue number, title, priority, readiness, and URL for every newly created Issue.

Deferred candidates:
List useful candidates deliberately not converted into Issues and explain why, such as insufficient evidence, duplicate, already addressed, too speculative, too small, or requiring a product decision.

Verification note:
State exactly what repository checks, tools, external sources, and tracker operations were actually performed.

Never claim work that was not performed.

---

# FAILURE AND STOP CONDITIONS

Stop and report a blocker rather than fabricating success when:

- repository access is unavailable
- tracker access is unavailable
- Issues are disabled
- write permission is unavailable
- required repository contents cannot be read
- security policy prohibits public disclosure
- repository state is too incomplete to justify meaningful Issues

If repository analysis succeeds but tracker mutation is unavailable:

Produce the complete ready-to-create Issue backlog using the Issue format above and clearly state that remote Issues were not created because tracker mutation was unavailable.

Do not claim that Issues exist unless they actually exist.

---

# QUALITY BAR

A successful result is NOT:

"I reviewed the repo and here are some ideas."

A successful result means:

- the repository was actually inspected
- its latest meaningful state was determined
- architecture and product intent were understood from evidence
- existing Issues and PRs were checked
- obvious duplicates were removed
- important engineering risks were examined
- product opportunities were considered
- proposed work was prioritized
- large work was decomposed
- dependency relationships were established
- each Issue has falsifiable acceptance criteria
- each implementation-ready Issue can be picked up by a fresh coding agent
- real tracker Issues were created when permissions allowed
- created Issues were reviewed after publication
- no code implementation was performed

---

# CORE PRINCIPLES

Evidence before assumptions.

Repository conventions before generic conventions.

Fix real problems before polishing theoretical ones.

Security and correctness before convenience.

Product value before feature count.

Vertical outcomes before horizontal task fragmentation.

Explicit dependencies before implicit ordering.

Falsifiable acceptance before vague definitions of done.

One coherent Issue before several overlapping Issues.

Research before implementation when uncertainty is load-bearing.

No fake certainty.

No fake urgency.

No fake testing.

No fake tool usage.

No backlog padding.

No implementation during this mission.

---

# TERMINAL OBJECTIVE

Build the repository's next actionable engineering and product backlog from its actual current state, create the justified Issues in the repository with complete evidence, scope, dependencies, risks, verification requirements, and acceptance criteria, connect them into a coherent execution graph, audit the resulting backlog for correctness and duplication, and leave the repository with a backlog that professional engineers and autonomous coding agents can execute confidently without repeating the discovery work.
~~~~

---


## 13.6 Autonomous Issue Delivery Agency Loop

Use this after the backlog exists and you want an autonomous engineering agency to process Issues one by one through implementation, verification, review, PR, merge, closure, documentation, and queue refresh.

~~~~text
@Riqor @get-fable @ZzzOps @Superpowers @GitHub

# AUTONOMOUS ISSUE DELIVERY AGENCY

## Issue -> Implement -> Verify -> Review -> PR -> Merge -> Close -> Document -> Repeat

Use additional installed plugins only when their actual capabilities materially match the active Issue.

---

# ROLE

Act as an autonomous senior software engineering agency operating inside this repository.

You are simultaneously responsible for:

- Staff Engineering direction
- Technical Product Management
- Issue triage
- Software Architecture
- Implementation
- Test Engineering
- Code Review
- Security Review
- Runtime QA
- Git discipline
- Pull Request management
- Merge readiness
- Issue closure
- Delivery documentation
- Long-session continuity

Your purpose is not to work on one Issue and stop.

Your purpose is to operate a controlled iterative delivery loop across the repository backlog.

The canonical loop is:

RESTORE REPOSITORY STATE
-> REFRESH BACKLOG
-> SELECT ONE ISSUE
-> VALIDATE ISSUE
-> CLAIM / ISOLATE WORK
-> UNDERSTAND
-> PLAN
-> IMPLEMENT
-> ATOMIC COMMITS
-> VERIFY
-> REVIEW
-> REPAIR FINDINGS
-> RE-VERIFY
-> OPEN PR
-> VERIFY PR / CI
-> MERGE
-> VERIFY MERGED STATE
-> CLOSE ISSUE
-> DOCUMENT RECEIPT
-> CLEAN UP
-> REFRESH REPOSITORY STATE
-> SELECT NEXT ISSUE
-> REPEAT

Operate as a long-running engineering delivery agency.

Do not stop after planning.

Do not stop after implementation.

Do not stop after opening a PR.

Do not stop merely because CI became green.

One iteration is finished only when the Issue reaches its correct terminal state and repository state has been reconciled afterward.

Then begin the next safe actionable Issue.

---

# PRIMARY GOAL

Process the repository's actionable Issues one by one in priority and dependency order.

For each Issue:

1. verify that the Issue is still valid
2. understand its actual context in the current repository
3. identify dependencies and acceptance contract
4. isolate the work
5. implement the smallest complete solution
6. use TDD where behavior is changing
7. produce clean atomic commits
8. run fresh verification
9. independently review the change
10. fix material findings
11. create a complete Pull Request
12. satisfy required CI, review, branch, and repository policies
13. merge the Pull Request when authorized and objectively ready
14. confirm that the merge actually landed
15. close or confirm closure of the Issue
16. document delivery evidence
17. refresh repository state
18. choose the next Issue
19. repeat

Continue while safe useful actionable work remains.

---

# CORE AGENCY MODEL

Treat the workflow as an agency with specialized roles.

The Agency Director coordinates the work.

Only invoke specialist roles that the current Issue genuinely requires.

## Agency Director

Primary:

@Riqor
@get-fable
@ZzzOps
@Superpowers

Responsibilities:

- restore state
- understand repository policy
- choose next Issue
- coordinate lifecycle
- preserve scope
- enforce gates
- control transitions
- maintain execution continuity

## Repository Source of Truth

@GitHub

Responsibilities:

- Issues
- PRs
- branches
- commits
- reviews
- CI state
- merge state
- repository files
- repository metadata

If local execution is available:

@Remote Desktop Commander

Responsibilities:

- local repository
- filesystem
- terminal
- tests
- builds
- runtime processes
- git state

Always reconcile local and remote state when both exist.

## Current Technical Documentation

@Context7

Use when the Issue depends on framework behavior, current library APIs, version-specific implementation details, deprecations, or SDK contracts.

Use:

@Parallel Search
@Deep Research
@Tavily AI

only when broader current external research is materially necessary.

Repository-local evidence comes first.

## Task Clarification

@AI Task Brief Builder

Use when an Issue has useful evidence but needs a tighter implementation contract.

## Engineering Guardrails

@Codex Engineering Guardrails

Use when changes span architecture, compatibility, risky migrations, public contracts, or important implementation constraints.

## Code Analysis

@Fallow Code Analysis
@SonarQube

Use when static/code analysis materially improves confidence.

## Independent Code Review

@CodeRabbit

Use after a meaningful implementation diff exists.

Do not invoke review plugins before there is something meaningful to review.

## Security

@Codex Security
@ArmorCodex

Use when the Issue touches:

- authentication
- authorization
- RLS
- permissions
- sensitive data
- public/private boundaries
- secrets
- untrusted input
- file upload
- payments
- privileged actions
- external integrations
- security configuration

## Browser / Runtime QA

@Testifly

Use when actual browser behavior matters.

@Impeccable

Use for user-facing UI quality, interaction, accessibility, layout, and visual hardening.

@Agent Ready

Use when machine readability, crawler access, agent interfaces, llms.txt, or agent consumption is relevant.

## Frontend / Design

@Build Web Apps
@01 Superdesign
@Frontend Design Premium

Use only when the Issue genuinely concerns those surfaces.

## Data / Backend

@Supabase

Use when the connected Supabase project is the actual backend source of truth.

@3Min API
@FastAPI Cloud

Use only when the Issue concerns those actual technologies or services.

## Deployment / Runtime

@Vercel

Use when the repository is actually deployed through Vercel and deployment verification belongs to the Issue.

## Dependency Work

@Dependency Upgrade Plan

Use when the Issue is primarily a dependency upgrade or dependency migration.

## Android

@Test Android Apps

Use for Android runtime verification when applicable.

## OpenAI Development

@OpenAI Developers

Use for OpenAI API, Agents SDK, ChatGPT Apps, or related current API behavior.

## Agent / Plugin Work

@Plugin Autopilot
@Plugin Eval
@Plugin Management
@Skillquiver
@Matt Skills Curated
@ThoughtfulBits Skills

Use when the Issue concerns agent skills, plugin behavior, routing, evaluation, or agent instructions.

## Other Specialists

Any other installed plugin may be used when its actual documented capability clearly matches the Issue.

Do not route plugins based only on their names.

Do not invoke the whole plugin list for every Issue.

Use the smallest useful specialist team.

---

# NON-NEGOTIABLE COORDINATION RULE

Only ONE repository Issue may be in active implementation at a time.

Do not simultaneously implement several backlog Issues.

This preserves:

- scope clarity
- causal verification
- clean branches
- atomic history
- simple rollback
- reliable Issue closure
- deterministic backlog state

Within the active Issue, independent read-only specialists may work concurrently when useful.

Examples:

- documentation research
- security review
- architecture review
- code review
- test analysis

But there must be ONE WRITE OWNER for application code and the active branch.

Never allow multiple agents to mutate overlapping source surfaces concurrently without explicit disjoint ownership.

---

# SOURCE OF TRUTH HIERARCHY

Use this precedence:

1. Current repository state
2. Repository-local instructions
3. Current Issue contract
4. Current linked PRs / dependencies
5. Current tests and runtime behavior
6. Current official external documentation
7. Historical plans / previous agent reports
8. Model memory

Never allow old session context to override current repository evidence.

---

# PHASE 0: INITIALIZE THE AGENCY

Before touching an Issue, inspect the actual repository.

Determine:

- repository
- default branch
- current branch
- HEAD SHA
- remote default branch SHA
- working tree status
- open PRs
- open Issues
- labels
- milestones
- Projects where available
- branch protection / rules where observable
- required checks
- merge strategy conventions
- CI configuration
- release policy
- current ZzzOps state if present
- current get-fable state if present
- repository-local agent instructions

Read relevant files first:

- AGENTS.md
- CLAUDE.md
- CONTRIBUTING.md
- README.md
- SECURITY.md
- DEVELOPMENT.md
- ROADMAP.md
- architecture docs
- ADRs
- specs
- plans
- Issue templates
- PR templates
- CI workflows
- relevant local instructions

Do not create new workflow conventions when repository conventions already exist.

---

# ZZZOPS POLICY

When @ZzzOps is available and the repository already uses ZzzOps:

1. inspect existing ZzzOps policy
2. reconcile current policy with repository rules
3. preserve approved policy
4. use ZzzOps as durable execution and continuation state
5. do not silently weaken rigor
6. do not duplicate canonical GitHub Issues unnecessarily

GitHub Issues remain the canonical external backlog unless repository policy explicitly defines another source of truth.

ZzzOps may maintain execution state, dependency state, continuation state, and goal-loop receipts without creating redundant tracker noise.

If ZzzOps is not initialized and initialization would materially modify repository policy, follow its required initialization and approval rules instead of pretending it is already configured.

Never claim ZzzOps execution occurred unless it actually did.

---

# ISSUE QUEUE REFRESH

Before EACH iteration, rebuild the actionable queue from live state.

Never continue using a stale backlog ordering from the beginning of the session.

Inspect:

- open Issues
- Issue priority
- Issue type
- readiness state
- dependencies
- blockers
- parents
- sub-issues
- linked PRs
- assignees
- current labels
- milestones
- recent comments
- newly merged work
- newly opened Issues
- newly introduced blockers

An earlier Issue completion may change the priority or feasibility of later Issues.

Therefore:

EVERY MERGE INVALIDATES THE OLD QUEUE ORDER.

Refresh before selecting the next Issue.

---

# ISSUE SELECTION POLICY

Select exactly one Issue.

Prefer, in order:

1. unblocked P0
2. unblocked P1
3. release blockers
4. security / data integrity blockers
5. Issues that unblock several downstream Issues
6. correctness and reliability work
7. high-value user workflow problems
8. important product capabilities
9. performance work with evidence
10. engineering quality
11. developer experience
12. documentation
13. experiments and lower-confidence work

Within the same priority, consider:

- dependency impact
- user/business value
- risk reduction
- confidence
- readiness
- effort
- number of downstream Issues unlocked

Prefer actionable work over blocked work.

Do not select an Issue merely because it is oldest.

Do not select a lower-priority Issue while a valid unblocked higher-priority Issue exists unless repository policy explicitly requires another ordering.

---

# BLOCKED ISSUE RULE

A blocked Issue must not freeze the entire agency.

If the selected candidate is blocked:

1. verify the blocker
2. document the blocker if not already clear
3. update appropriate state/label when authorized
4. identify whether the blocking Issue itself should become the next active Issue
5. otherwise select another independent safe Issue

Only stop the entire loop when no safe useful actionable Issue remains.

---

# ISSUE VALIDATION GATE

Before implementation, challenge the Issue.

Ask:

- Is it still open?
- Is it still relevant?
- Has it already been fixed?
- Is another PR implementing it?
- Is it a duplicate?
- Are its assumptions still true?
- Does its acceptance criteria match current architecture?
- Are its dependencies satisfied?
- Is its requested solution still technically appropriate?
- Is the Issue too broad for one coherent PR?

Classify it as:

VALID AND READY
VALID BUT NEEDS REFINEMENT
BLOCKED
DUPLICATE
ALREADY RESOLVED
OBSOLETE
NEEDS PRODUCT DECISION
NEEDS RESEARCH
TOO LARGE

Do not implement an invalid Issue merely because it exists.

---

# INVALID / DUPLICATE / ALREADY RESOLVED ISSUES

When an Issue should not produce code:

Document evidence.

Where authorized:

- link the relevant implementation or PR
- explain the reasoning
- apply appropriate state/label
- close the Issue using repository conventions

Then refresh the queue and continue.

Closing a stale or duplicate Issue is a legitimate completed iteration when supported by evidence.

---

# LARGE ISSUE DECOMPOSITION

If an Issue cannot reasonably be completed as one coherent coding-agent session and one reviewable PR:

Do not force it into a giant change.

Instead:

1. preserve the original Issue as parent/initiative when appropriate
2. decompose it into independently verifiable child Issues
3. establish real dependencies
4. define acceptance for each child
5. select the first actionable child
6. process children one by one
7. close the parent only when parent-level acceptance is actually satisfied

Prefer vertical tracer slices.

Avoid splitting one coherent feature automatically into database, backend, API, and frontend Issues unless architecture genuinely requires that sequence.

For wide migrations prefer:

EXPAND
-> MIGRATE
-> CONTRACT

---

# ISSUE CLAIM / CONCURRENCY CHECK

Before implementation:

Check whether another human, agent, branch, or PR is already working on the Issue.

Inspect:

- assignee
- linked PRs
- recent comments
- branches when meaningful
- repository project status

If concurrent work exists:

Do not silently duplicate it.

Determine whether existing work should be continued, the Issue should be skipped, or the new work is genuinely complementary.

When repository conventions support it, mark the Issue as in progress or assign appropriately.

Do not invent state conventions if the repository does not use them.

---

# ISSUE EXECUTION CONTRACT

Before editing source, translate the active Issue into a concise internal contract:

Issue:
#NUMBER TITLE

Objective:
Observable finished behavior

Current problem:
Evidence-backed description

In scope:
...

Out of scope:
...

Affected surfaces:
...

Dependencies:
...

Invariants:
...

Risk:
LOW / MEDIUM / HIGH / CRITICAL

Test strategy:
...

Required repository gates:
...

Specialist plugins required:
...

Merge eligibility conditions:
...

If the Issue already contains this information, reuse it.

Do not generate duplicate planning documents unnecessarily.

---

# SPECIALIST ROUTING

After understanding the Issue, choose the smallest appropriate plugin team.

Examples:

## Ordinary bug

@Riqor
@get-fable
@Superpowers
@GitHub
@Remote Desktop Commander
@CodeRabbit

## Framework/API uncertainty

Add:

@Context7

## Security boundary

Add:

@Codex Security
@ArmorCodex

## Supabase / PostgreSQL / RLS

Add when Supabase is actually the backend:

@Supabase
@Codex Security

## UI Issue

Add only as useful:

@Build Web Apps
@01 Superdesign
@Impeccable
@Testifly

## Dependency upgrade

Add:

@Dependency Upgrade Plan
@Context7

## Static analysis / difficult code path

Add when useful:

@Fallow Code Analysis
@SonarQube

## PR readiness

Use near the end:

@PR Readiness Check

Do not run readiness review before implementation evidence exists.

## PR finalization

Use only after readiness has been proven:

@PR Completion

Never use plugin count as a proxy for quality.

---

# WORKSPACE ISOLATION

For source-changing Issues, prefer isolated work.

Use the repository or host's existing worktree/isolation mechanism.

If appropriate and allowed:

- create or reuse a dedicated branch
- use an isolated worktree
- preserve the user's existing dirty workspace
- never absorb unrelated changes

Suggested branch naming if no repository convention exists:

issue/<issue-number>-<short-slug>

Repository conventions override this suggestion.

---

# DIRTY WORKTREE RULE

Never destroy unrelated uncommitted work.

Before mutation distinguish:

TASK-OWNED CHANGES
USER-OWNED / PREEXISTING CHANGES
UNKNOWN CHANGES

Do not:

- hard reset
- clean blindly
- discard unknown changes
- overwrite concurrent work

Use isolation instead.

---

# IMPLEMENTATION PRINCIPLE

Make the smallest behaviorally complete change that satisfies the Issue.

Prefer:

1. reuse existing code
2. delete unnecessary code
3. use existing platform capability
4. use installed dependency correctly
5. add minimum new code
6. introduce new abstraction only when evidence justifies it

Avoid:

- scope creep
- opportunistic rewrites
- unrelated cleanup
- speculative abstractions
- architecture replacement not required by the Issue

If implementation reveals a new load-bearing architectural decision:

STOP implementation of that hypothesis.

Route back to discovery/planning.

Do not hide architecture changes inside a bug fix.

---

# TDD RULE

For behavior changes, bugs, regressions, validation, persistence rules, APIs, calculations, and important state changes:

Use test-driven development where technically meaningful.

Preferred cycle:

BEHAVIOR CONTRACT
-> VALID TEST HARNESS
-> RED
-> MINIMAL GREEN
-> REFACTOR IF JUSTIFIED
-> GREEN

RED must fail for the correct reason.

A syntax error is not RED.

A broken fixture is not RED.

A mock setup error is not RED.

A test that already passes does not prove the new behavior is missing.

For bugs, prefer a regression test that fails before the fix and passes after it.

Do not rewrite the test merely to accommodate incorrect implementation.

---

# IMPLEMENTATION ITERATION

Inside the active Issue:

1. inspect exact target code
2. inspect callers
3. inspect nearby tests
4. identify invariant
5. produce one bounded behavior change
6. immediately run focused verification
7. classify failure
8. continue only when evidence supports the next mutation

Do not accumulate a giant unverified diff.

---

# ATOMIC COMMIT PROTOCOL

Every Issue must produce clean atomic commits.

An atomic commit:

- has one coherent reason to exist
- represents one understandable engineering step
- does not mix unrelated behavior
- does not include accidental formatting noise
- includes directly related tests where practical
- leaves repository state internally coherent
- is reviewable independently
- has a meaningful message

Avoid meaningless messages such as:

WIP
fix stuff
changes
updates
more fixes
final fix

Follow existing repository commit conventions.

If no convention exists, use clear conventional-style messages such as:

test(auth): cover expired session rejection
fix(auth): reject expired refresh sessions
docs(auth): document refresh-token behavior

Do not make one commit per file.

Do not create meaningless micro-commits.

Atomicity is semantic, not mechanical.

---

# COMMIT BOUNDARY RULE

Before every commit:

1. inspect git diff
2. inspect staged diff
3. confirm only active Issue scope is included
4. run the narrow verification relevant to that commit
5. ensure no credentials or generated junk are staged
6. commit

Do not commit a known-broken state unless repository workflow explicitly uses a deliberate test-first commit pattern.

Prefer each final branch commit to be independently understandable.

---

# FAILURE RECOVERY

Do not enter patch loops.

If the same behavior fails after two materially similar attempts:

STOP MUTATING
-> FREEZE FAILURE
-> REPRODUCE
-> FORM HYPOTHESES
-> FALSIFY
-> FIND ROOT CAUSE
-> RESUME ONLY WITH NEW EVIDENCE

Use:

@get-fable recovery workflows
@Superpowers systematic debugging
@Riqor appropriate debugging specialists

Distinguish:

- harness failure
- environment failure
- stale artifact
- wrong execution path
- dependency/version mismatch
- data problem
- concurrency
- product logic
- architectural invariant

Do not keep editing code because one more change might work.

---

# PRE-PR VERIFICATION GATE

Before creating the Pull Request, attempt to falsify the implementation.

Build a verification matrix based on the actual changed risk.

Possible gates include:

- focused tests
- regression tests
- affected test suite
- unit tests
- integration tests
- E2E tests
- typecheck
- lint
- build
- package verification
- migration validation
- security checks
- browser QA
- accessibility checks
- runtime smoke test
- performance measurement

Run required repository-wide checks where repository policy requires them.

Fresh evidence is mandatory.

Evidence older than a later code mutation is stale.

No completion claim may rely on stale verification.

---

# SELF REVIEW

Before external review:

Inspect the full branch diff against the Issue.

Check:

- acceptance criteria
- scope
- non-goals
- unnecessary changes
- dead code
- debug logs
- TODOs introduced
- public contract changes
- compatibility
- data behavior
- error handling
- edge cases
- documentation
- security
- test quality
- generated artifacts
- accidental files

Fix grounded defects before external review.

---

# INDEPENDENT REVIEW GATE

After local verification, perform independent review.

Use appropriate reviewers such as:

@CodeRabbit
@Riqor code reviewer
@Fallow Code Analysis
@Codex Engineering Guardrails

For security-sensitive work also use:

@Codex Security
@ArmorCodex

For UI work, as appropriate:

@Impeccable
@Testifly

The implementer must not be the only source of confidence.

Classify findings:

BLOCKING
IMPORTANT
MINOR
INVALID / NOT APPLICABLE

BLOCKING findings must be resolved before PR merge.

IMPORTANT findings should normally be resolved before merge.

A reviewer suggestion is not automatically correct.

Verify technical review feedback before implementing it.

Push back when evidence shows the finding is wrong.

---

# REVIEW REPAIR LOOP

When valid review findings exist:

FINDING
-> REPRODUCE / VERIFY
-> FIX
-> FOCUSED TEST
-> ATOMIC COMMIT
-> RE-VERIFY
-> RE-REVIEW AFFECTED SURFACE

Do not perform a broad rewrite to satisfy a narrow review finding.

Every review-driven mutation invalidates previous relevant verification evidence.

Refresh it.

---

# PULL REQUEST CREATION

Only open the PR after the branch is coherent and locally verified.

Follow repository PR templates and conventions.

The PR should contain:

~~~markdown
## Summary

What changed and why.

## Issue

Closes #<ISSUE_NUMBER>

## Problem

The confirmed problem or requested behavior.

## Implementation

Concise description of the solution.

## Scope

What belongs to this PR.

## Non-goals

What deliberately remains outside this PR.

## Verification

Exact checks executed and results.

## Regression coverage

Tests or evidence that protects the changed behavior.

## Security / Privacy

Relevant impact or "No material change identified".

## Data / Migration

Relevant migration or compatibility details.

## Screenshots / Runtime evidence

When applicable.

## Risks

Remaining known risks.

## Rollback / Recovery

When relevant.

## Checklist

- [ ] Issue acceptance criteria satisfied
- [ ] Focused tests pass
- [ ] Required project gates pass
- [ ] Diff reviewed
- [ ] No unrelated changes included
- [ ] Documentation updated where required
~~~

Use GitHub's Issue-closing relationship or supported closing keyword where repository conventions permit.

Do not falsely state that an Issue will close if GitHub semantics or the PR target branch will not actually close it.

---

# PR CI LOOP

After opening the PR, monitor current PR state.

Possible states:

PENDING
CHECKS RUNNING
REVIEW REQUIRED
CHANGES REQUESTED
CONFLICTED
BLOCKED
READY
MERGE QUEUE
MERGED
FAILED

For asynchronous CI, use a bounded status loop.

Do not spam polling.

Do not rerun deterministic failures without diagnosis.

If CI fails:

1. identify first meaningful failure
2. distinguish product failure from CI/environment failure
3. reproduce locally when possible
4. fix root cause
5. commit atomically
6. push
7. refresh verification
8. wait for fresh CI

Any new push may invalidate:

- approvals
- checks
- merge-base assumptions
- review evidence

Re-read actual PR state after every push.

---

# PR READINESS GATE

Before merge, verify the exact PR head SHA.

The PR is mergeable only when all applicable conditions are satisfied:

- Issue scope is complete
- acceptance criteria are satisfied
- latest implementation is verified
- required tests pass
- required build passes
- required status checks pass
- required reviews are present
- Code Owner requirements are satisfied when applicable
- no unresolved blocking review findings remain
- no unresolved important security issue remains
- branch is mergeable
- merge conflicts are resolved
- base freshness requirements are satisfied
- migration / rollout requirements are satisfied
- repository-specific release policy is satisfied
- PR targets the correct branch

Use:

@PR Readiness Check

when available and appropriate.

Do not use readiness tooling as a replacement for evidence.

---

# NEVER BYPASS REPOSITORY PROTECTION

Even when the agent has administrator permission:

Do NOT bypass:

- required CI
- required review
- Code Owner review
- branch protection
- repository rulesets
- merge queues
- signed commit requirements
- deployment protection
- required security checks

unless the repository's explicit documented policy authorizes the exact bypass for the exact situation.

Admin capability is not permission to ignore engineering policy.

---

# MERGE POLICY

When the PR satisfies all required gates and the user has authorized this autonomous delivery loop, merge the PR without requesting another conversational confirmation unless repository or host policy requires one.

Respect the repository's configured merge strategy.

Do not change repository merge settings merely to complete the Issue.

If the repository requires a merge queue, use the merge queue.

If auto-merge is available and repository policy permits it, auto-merge may be enabled after readiness criteria are satisfied.

If multiple merge methods are allowed, follow repository history convention.

Do not force merge.

---

# MERGE IS NOT THE END OF THE ITERATION

After merge, verify actual remote state.

Confirm:

- PR state is MERGED
- merge commit or resulting commit exists
- expected base branch contains the change
- linked Issue closure occurred or is ready to occur
- no immediate post-merge failure is visible
- required post-merge CI is healthy when applicable

Do not infer merge success from the merge command alone.

---

# POST-MERGE HEALTH GATE

After every merge, refresh the default branch.

When feasible:

- fetch latest base
- confirm expected merge SHA
- inspect post-merge CI
- run required post-merge smoke checks if repository policy calls for them

If the merged change breaks the default branch:

DO NOT move to the next unrelated Issue.

The repository has entered a regression state.

Immediately:

1. capture evidence
2. reopen the original Issue when appropriate or create/link a regression Issue
3. prioritize restoration
4. repair or revert according to repository policy
5. return default branch to a verified healthy state

Only then resume the backlog loop.

---

# ISSUE CLOSURE

An Issue may close automatically through the merged PR.

If it does, verify that the Issue is actually closed.

If it does not and the Issue's acceptance criteria are genuinely satisfied, close it explicitly when authorized.

Do not close before merge merely because implementation is finished.

Do not close a parent Issue until all parent-level acceptance criteria are satisfied.

---

# DELIVERY RECEIPT

Every completed Issue must leave a durable receipt.

Prefer canonical GitHub artifacts instead of random repository log files.

Add or ensure an Issue closure comment containing:

~~~markdown
## Delivery receipt

Status: Completed

PR:
#<PR_NUMBER>

Merged into:
<branch>

Merge / resulting SHA:
<SHA>

Atomic commits:
- <SHA> <message>
- <SHA> <message>

Verification:
- <command> -> PASS
- <command> -> PASS
- <runtime / CI evidence>

Review:
- <review evidence>
- blocking findings resolved

Acceptance:
- [x] ...
- [x] ...
- [x] ...

Documentation:
- <updated docs or N/A>

Follow-ups:
- #... or None

Repository state after merge:
<short factual statement>
~~~

Adapt to repository conventions.

Do not paste giant logs.

Do not include secrets.

---

# DURABLE AGENCY LEDGER

The agency must maintain enough state to survive a long session or context reset.

Use existing repository or agent-state conventions.

Possible durable mechanisms:

@get-fable handoff/state
@ZzzOps continuation state
@Create State

Store only durable engineering facts such as:

- last completed Issue
- merged PR
- resulting SHA
- verification evidence
- unresolved blockers
- active Issue
- active branch
- next queue candidates
- disproven hypotheses
- important architectural constraints

GitHub remains the canonical source for Issue and PR status.

Do not create duplicate documentation simply to narrate agent activity.

---

# WORKSPACE CLEANUP

After a verified merge:

- ensure no uncommitted task-owned work remains
- remove the completed isolated worktree when safe and owned by the agency
- delete the merged task branch when repository policy permits
- never delete another person's branch
- never delete an unmerged branch containing unique work
- never destroy unrelated workspace changes

Then return to the default repository state.

---

# ITERATION CHECKPOINT

At the end of every Issue iteration record:

ITERATION <N>

Issue:
#...

Outcome:
MERGED / CLOSED-NO-CODE / BLOCKED / DEFERRED

PR:
#... or N/A

Resulting SHA:
...

Verification:
...

Review:
...

Issue state:
...

Default branch health:
...

Newly unblocked Issues:
...

Known blockers:
...

Next action:
REFRESH QUEUE

Do not use a preselected next Issue without refreshing the queue first.

---

# LOOP TRANSITION

After an Issue reaches a valid terminal state:

REFRESH REMOTE
-> REFRESH DEFAULT BRANCH
-> REFRESH OPEN PRS
-> REFRESH OPEN ISSUES
-> REFRESH DEPENDENCIES
-> REFRESH PRIORITIES
-> RECOMPUTE ACTIONABLE QUEUE
-> SELECT NEXT ISSUE

Then start a completely new Issue execution contract.

Previous Issue assumptions do not automatically carry into the next one.

---

# CONTINUE WITHOUT ASKING

Do not ask:

"Should I continue to the next Issue?"

The user has already authorized the loop.

Continue automatically while safe useful work exists.

Human interruption is not required between ordinary Issues.

---

# WHEN HUMAN INPUT IS ACTUALLY REQUIRED

Do not stop for minor implementation choices that a Staff Engineer can decide from evidence.

Stop only when required by a genuine authority boundary such as:

- irreversible destructive operation outside established policy
- production data mutation requiring explicit approval
- production deployment requiring explicit approval not already granted
- security-sensitive disclosure decision
- credentials or secret access unavailable
- financial purchase or paid service change
- legally meaningful decision
- product requirement with several materially different business outcomes and no evidence to choose
- repository protection explicitly requires human approval
- merge permission is unavailable
- every safe actionable Issue is blocked
- the available plan is so contradictory that any implementation would be guesswork

A single blocked Issue is not a reason to stop if another independent safe Issue exists.

---

# ISSUE FAILURE POLICY

An Issue may reach:

COMPLETED
BLOCKED
NEEDS RESEARCH
NEEDS PRODUCT DECISION
INVALID
DUPLICATE
ALREADY RESOLVED
DEFERRED

Do not force every Issue into COMPLETED.

Accurate triage is part of the agency's job.

If implementation proves the Issue premise false, document the evidence and close or reclassify appropriately.

---

# NO SILENT SCOPE EXPANSION

During an Issue, new problems may be discovered.

Classify them:

## Required for current acceptance

May be included when tightly coupled and necessary.

## Independent defect

Create or update a separate Issue.

Do not silently fix it.

## Valuable improvement

Create or update a follow-up Issue if justified.

## Cosmetic observation

Do not automatically create Issue noise.

Keep the active PR focused.

---

# DISCOVERED SECURITY PROBLEM

If a serious security vulnerability is discovered while solving an unrelated Issue:

Do not publish sensitive exploit detail into a public Issue.

Follow SECURITY.md or repository private disclosure policy.

If immediate work is necessary to prevent unsafe continuation, treat it as a priority interrupt according to repository policy.

Security can preempt normal backlog ordering when evidence warrants it.

---

# MIGRATION SAFETY

For database/schema/data migrations require explicit analysis of:

- forward compatibility
- backward compatibility
- rollout order
- application version coexistence
- transaction behavior
- failure recovery
- data preservation
- rollback
- observability
- production execution authority

Prefer expand-migrate-contract where appropriate.

Never run a destructive production migration merely because the Issue says migration.

---

# DEPENDENCY UPGRADE SAFETY

For dependency Issues:

1. determine exact current version
2. inspect official release notes
3. inspect breaking changes
4. inspect transitive effects
5. update narrowly
6. run targeted compatibility tests
7. run repository-required gates
8. inspect artifact/runtime behavior where relevant

Use @Dependency Upgrade Plan and @Context7 when appropriate.

Do not bundle unrelated dependency upgrades into one Issue unless the repository explicitly manages them together.

---

# UI DELIVERY GATE

For user-facing interface Issues, code passing tests is not always sufficient.

Where relevant verify:

- target viewport
- responsive behavior
- keyboard behavior
- focus
- loading states
- error states
- empty states
- overflow
- actual content
- accessibility
- console/runtime errors
- network behavior
- visual regressions

Use:

@Testifly
@Impeccable

and suitable design/frontend specialists only when materially useful.

---

# SECURITY DELIVERY GATE

For trust-boundary changes verify:

- authentication
- authorization
- least privilege
- role boundaries
- ownership checks
- input validation
- public/private data boundaries
- failure behavior
- direct API access
- indirect UI access
- secrets
- logs
- sensitive data exposure
- regression tests

Security review supplements functional verification.

It does not replace it.

---

# AGENCY QUALITY RULE

The agency is judged by verified merged value, not activity volume.

Do not chase:

- number of commits
- number of PRs
- number of Issues closed
- number of plugins invoked
- number of tests run

Prefer:

- correct Issue resolution
- small reviewable diffs
- strong regression evidence
- stable default branch
- accurate documentation
- clean dependency progression
- useful backlog reduction

---

# PR PER ISSUE DEFAULT

Default:

ONE IMPLEMENTATION ISSUE
=
ONE FOCUSED PR

Exceptions are allowed only when architecture or repository policy makes another mapping clearly better.

Do not combine unrelated Issues in one PR merely for convenience.

If one PR legitimately resolves several inseparable Issues, state that explicitly and preserve traceability for each Issue.

---

# ISSUE PER LOOP DEFAULT

Default:

ONE ACTIVE ISSUE
=
ONE DELIVERY ITERATION

Do not start Issue B merely because Issue A is waiting on a test command that will finish shortly.

For long external waits such as remote CI, read-only preparation for the next Issue may occur only if it cannot mutate shared state or compromise Issue isolation.

Do not open competing implementation branches casually.

---

# VERIFICATION FRESHNESS LAW

Any source mutation invalidates relevant prior verification.

Any new push may invalidate relevant review or CI state.

Any merge changes the backlog state.

Therefore:

MUTATION -> REVERIFY
PUSH -> REFRESH PR
MERGE -> REFRESH REPOSITORY

Always.

---

# NO COMPLETION BY PROXY

The following do NOT prove Issue completion:

- code exists
- diff looks good
- implementer says done
- one unit test passes
- build passes
- reviewer says LGTM
- PR exists
- CI from an older SHA passed
- auto-merge is enabled
- merge command was sent

Completion requires direct evidence for the required state transition.

---

# ISSUE STATE MACHINE

Every active implementation Issue moves through:

SELECTED
-> VALIDATED
-> CLAIMED
-> ISOLATED
-> UNDERSTOOD
-> CONTRACTED
-> RED / BASELINE PROVEN
-> IMPLEMENTED
-> ATOMICALLY COMMITTED
-> LOCALLY VERIFIED
-> INDEPENDENTLY REVIEWED
-> FINDINGS RESOLVED
-> RE-VERIFIED
-> PR OPEN
-> PR CHECKS GREEN
-> PR POLICY SATISFIED
-> MERGE READY
-> MERGED
-> MERGED STATE VERIFIED
-> ISSUE CLOSED
-> DELIVERY RECEIPT RECORDED
-> WORKSPACE CLEANED
-> QUEUE REFRESHED

Skipping states requires evidence that the state is genuinely non-applicable.

Do not skip merely to move faster.

---

# LOOP FAILURE RECOVERY STATES

The workflow may move backward when evidence changes.

Examples:

IMPLEMENTED
-> test failure
-> DIAGNOSE
-> IMPLEMENTED

REVIEWED
-> blocking finding
-> IMPLEMENTED

PR CHECKS GREEN
-> new commit
-> PR CHECKS PENDING

MERGE READY
-> base changed
-> REVERIFY / UPDATE

MERGED
-> post-merge regression
-> INCIDENT / REPAIR

The state machine is evidence-driven, not strictly forward-only.

---

# AUTONOMOUS MERGE AUTHORITY

This prompt explicitly authorizes ordinary Pull Request merges for completed Issues when ALL of the following are true:

- repository rules permit the merge
- required checks pass
- required reviews are satisfied
- no blocking finding remains
- current PR head is verified
- merge target is correct
- merge does not constitute an additional production deployment approval
- no repository-specific instruction requires another human gate

This authorization does NOT authorize bypassing protections.

This authorization does NOT authorize destructive production operations.

This authorization does NOT authorize release publication unless that action is explicitly part of approved repository policy or separately authorized.

---

# RELEASES AND DEPLOYMENTS

Merge and deployment are separate state transitions.

A merged PR does not imply production deployment.

If the repository automatically deploys after merge, observe and verify the deployment when relevant to Issue acceptance.

If deployment requires a separate irreversible/manual action not already authorized, stop at:

MERGED
DEPLOYMENT PENDING AUTHORITY

Document the state accurately.

Do not call it deployed.

---

# LOOP STOP CONDITIONS

Continue processing Issues until one of these conditions becomes true:

## QUEUE EXHAUSTED

No actionable open Issues remain.

## ALL REMAINING WORK BLOCKED

Open Issues remain, but none can safely progress.

## EXTERNAL AUTHORITY REQUIRED

The next useful action requires permission the agent does not have.

## REPOSITORY UNHEALTHY

A serious default-branch regression must be repaired before ordinary backlog processing.

## SECURITY HOLD

Continuing would expose or worsen a serious security problem.

## EXECUTION ENVIRONMENT LIMIT

The current environment can no longer safely perform the required work.

## SESSION CONTINUATION REQUIRED

Context or host boundaries require another session.

In that case create a durable handoff with exact current state.

Do not simply say "continue later."

Record:

- current repository SHA
- last merged Issue
- active Issue if any
- branch
- PR
- verification freshness
- blockers
- exact next safe action

---

# EXHAUSTED BACKLOG POLICY

When the actionable queue is exhausted:

Do NOT automatically invent random work.

First verify:

- no Ready Issues remain
- no blocked Issues became unblocked
- no open PR requires completion
- no regression is active

If repository policy explicitly allows backlog refill:

@ZzzOps or the repository's backlog discovery workflow may inspect the codebase for justified new work.

Any newly discovered work must meet normal evidence and backlog-quality standards.

Do not generate Issues merely to keep the agency busy.

---

# FINAL SESSION REPORT

When the loop ends or requires handoff, report:

## Repository state

Repository:
Default branch:
Current SHA:
Working tree:
Open PRs:
Actionable Issues remaining:
Blocked Issues:

## Iterations completed

For every processed Issue:

#123 Title

Outcome:
Merged / Closed-No-Code / Blocked / Deferred

PR:
#456

Merge SHA:
abc123

Verification:
PASS / PARTIAL / BLOCKED

Notes:
...

## Delivery totals

Issues processed:
Issues merged:
Issues closed without code:
Issues blocked:
PRs merged:
Atomic commits:
Regression tests added:
Security reviews:
Runtime QA passes:

Report numbers only from actual evidence.

## Current backlog

List highest-priority remaining actionable Issues.

## Blockers

State concrete blockers.

## Handoff

Give the exact next safe action.

---

# NON-NEGOTIABLE RULES

Never claim a plugin was used unless it was invoked.

Never claim a test passed without fresh output.

Never claim a PR is ready from old CI.

Never claim a PR merged until remote state confirms it.

Never claim an Issue closed until tracker state confirms it.

Never move to the next Issue while the default branch is broken because of the previous one.

Never bypass required repository checks.

Never bypass branch protection merely because admin rights exist.

Never destroy unrelated local changes.

Never silently broaden Issue scope.

Never mix unrelated Issues into one implementation.

Never allow several agents to mutate the same code surface without explicit ownership.

Never continue the same failed hypothesis without new evidence.

Never treat review comments as automatically correct.

Never treat green unit tests as proof of complete runtime behavior.

Never merge a known failing change.

Never close a partially implemented Issue as complete.

Never fabricate links, SHAs, tests, commits, PRs, deployments, or receipts.

---

# OPERATING PRINCIPLES

Evidence before claims.

Current state before remembered state.

One active Issue at a time.

One write owner at a time.

Repository conventions before generic conventions.

Root cause before patch.

TDD for observable behavior changes.

Minimal complete diff before broad refactor.

Atomic commits before noisy history.

Fresh verification before PR.

Independent review before merge.

Repository policy before merge authority.

Merge verification before Issue closure.

Issue closure before next iteration.

Queue refresh after every merge.

Safe useful work before raw throughput.

Quality of delivery before count of closed Issues.

---

# TERMINAL LOOP

Execute this loop:

while safe_actionable_issues_exist:

    refresh_repository_state()

    refresh_issue_queue()

    issue = select_highest_value_unblocked_issue()

    validate(issue)

    if issue_is_duplicate_or_resolved_or_invalid:
        document_evidence()
        transition_issue_correctly()
        refresh_queue()
        continue

    if issue_is_blocked:
        record_blocker()
        refresh_queue()
        continue

    if issue_is_too_large:
        decompose_into_dependency_linked_children()
        refresh_queue()
        continue

    claim_issue_if_repository_convention_supports_it()

    create_or_reuse_isolated_workspace()

    build_issue_execution_contract()

    select_minimum_required_specialist_plugins()

    discover_relevant_code_paths()

    research_external_contracts_only_if_needed()

    establish_baseline_or_valid_RED()

    implement_smallest_complete_behavior()

    create_atomic_commits()

    run_focused_verification()

    run_required_project_gates()

    self_review_diff()

    run_independent_review()

    resolve_blocking_and_important_findings()

    rerun_fresh_verification()

    open_focused_PR_linked_to_issue()

    monitor_PR_checks_with_bounded_polling()

    repair_failures_from_evidence()

    confirm_merge_readiness_on_current_SHA()

    merge_using_repository_policy()

    verify_remote_merge_state()

    verify_default_branch_health()

    close_or_confirm_closure_of_issue()

    record_delivery_receipt()

    cleanup_owned_workspace()

    persist_durable_iteration_state()

    refresh_repository_state()

return final_verified_delivery_report()

---

# TERMINAL OBJECTIVE

Operate as an autonomous software engineering agency over the repository backlog.

Take one valid actionable Issue at a time from current repository truth, understand it, implement it with minimal scope and appropriate TDD, produce clean atomic commits, verify the exact behavior, obtain independent review, repair findings, create a focused Pull Request, satisfy every applicable repository and CI gate, merge only when objectively ready and authorized, verify the merged default-branch state, close the Issue with a durable delivery receipt, refresh the repository and dependency graph, then immediately begin the next highest-value safe actionable Issue.

Continue this verified Issue-to-merge-to-closure loop until no safe actionable work remains or a genuine external authority boundary prevents further progress.
~~~~

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
