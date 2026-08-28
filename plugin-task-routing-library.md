# Plugin Task Routing Library

A copy-ready prompt library for choosing the right installed plugins by task type

## How to Use

1. Pick the task block closest to what you want to do
2. Copy the full prompt block
3. Replace `[TASK]`, `[REPO]`, `[URL]`, `[INPUT]`, or other placeholders
4. Add specific constraints below the prompt
5. Keep the plugin stack focused. Do not invoke unrelated plugins
6. If a listed plugin is installed but its callable interface is not exposed in the current session, continue with the available stack and do not pretend it was executed
7. Restore existing work before starting over when the task is a continuation
8. Report only actions, tests, research, or changes that were actually performed

---

# 1. Engineering / Coding

## Build or Improve a Repository

```text
@Superpowers @GitHub @Context7 @Codex Engineering Guardrails @CodeRabbit @get-fable @Riqor

Task:
[TASK]

Repository:
[REPO]

Workflow:
Inspect live repo state → restore existing context → understand architecture → identify gaps → prioritize work → plan → implement in small atomic changes → run relevant tests → review code → verify behavior → report confirmed results

Rules:
Do not restart completed work
Do not duplicate existing functionality
Prefer small reversible changes
Use current documentation when framework behavior matters
Do not claim tests, commits, or fixes that were not executed
```

## Continue a Long Existing Repository Task

```text
@get-fable @Riqor @Create State @Superpowers @Adaptive Codex Orchestrator @GitHub

Continue:
[TASK]

Repository:
[REPO]

Workflow:
Restore previous state → inspect current branch and latest commits → recover decisions, constraints, unfinished items and blockers → choose the next highest-value step → execute → test → verify → persist useful state → continue from the real repo state

Rules:
Never restart from zero
Never repeat completed work
Treat the repository as the source of truth
Surface blockers only after verifying them
```

## Build a Feature

```text
@Superpowers @GitHub @Context7 @Codex Engineering Guardrails @CodeRabbit

Feature:
[TASK]

Repository:
[REPO]

Workflow:
Inspect relevant code → define expected behavior → identify affected components → write or update tests → implement smallest complete change → run targeted tests → check regressions → review diff → verify acceptance criteria

Keep scope limited to the requested feature
```

## Debug a Problem

```text
@Superpowers @Context7 @Fallow Code Analysis @CodeRabbit @GitHub

Problem:
[TASK]

Repository:
[REPO]

Workflow:
Reproduce → collect evidence → isolate root cause → inspect relevant code paths → verify framework/library behavior against current docs → apply the smallest correct fix → run targeted tests → test nearby regressions → explain root cause and verified fix

Do not patch symptoms before identifying the cause
```

## Investigate an Intermittent or Hard-to-Reproduce Bug

```text
@Superpowers @Fallow Code Analysis @GitHub @Context7 @Create State

Issue:
[TASK]

Workflow:
Gather failure evidence → map possible states and race conditions → inspect logs and recent changes → form ranked hypotheses → design focused reproduction checks → eliminate hypotheses with evidence → fix confirmed cause → add regression coverage → record useful debugging context
```

## Code Review

```text
@CodeRabbit @Superpowers @Codex Engineering Guardrails @Fallow Code Analysis @GitHub

Review:
[TASK]

Repository / Diff / PR:
[INPUT]

Workflow:
Understand intended behavior → inspect changed code → trace affected paths → identify correctness issues → check regressions → inspect tests → review maintainability and error handling → rank findings by severity → separate blockers from suggestions

Prioritize concrete defects over style preferences
```

## PR Readiness Review

```text
@PR Readiness Check @CodeRabbit @GitHub @Superpowers @Codex Engineering Guardrails

PR:
[INPUT]

Requirements:
[REQUIREMENTS]

Workflow:
Read requirements → inspect PR evidence and diff → verify requirement coverage → inspect executed tests and CI evidence → identify missing validation → assess risks and rollback → review unresolved comments → return ready / not ready with blocking gaps
```

## Fix a Failing CI Pipeline

```text
@GitHub @Superpowers @Context7 @CodeRabbit @Codex Engineering Guardrails

Repository:
[REPO]

Failure:
[INPUT]

Workflow:
Inspect failed workflow → read failing job and step logs → identify first meaningful failure → reproduce locally when possible → verify action/runtime versions → patch root cause → rerun targeted checks → confirm CI state

Do not blindly rerun CI without understanding the failure
```

## Refactor Existing Code

```text
@Superpowers @CodeRabbit @Fallow Code Analysis @GitHub @Context7

Refactor:
[TASK]

Repository:
[REPO]

Workflow:
Define behavior that must remain unchanged → inspect dependencies and call sites → identify structural debt → add safety tests where missing → refactor incrementally → run tests after each meaningful change → compare behavior → review complexity and readability

No feature changes unless explicitly requested
```

## Performance Investigation

```text
@Superpowers @Fallow Code Analysis @Context7 @GitHub @SonarQube

Performance problem:
[TASK]

Workflow:
Define measurable symptom → gather baseline evidence → identify expensive paths → inspect queries, rendering, network and compute → profile before changing code → rank bottlenecks → fix highest-impact confirmed issue → measure again → check regressions

Do not recommend performance work without evidence
```

## Dependency Upgrade

```text
@Context7 @Superpowers @GitHub @CodeRabbit @Codex Engineering Guardrails

Upgrade:
[PACKAGE / FRAMEWORK / VERSION]

Repository:
[REPO]

Workflow:
Inspect current dependency state → read official migration and breaking-change docs → map affected code → update dependency → fix incompatibilities → run tests and build → inspect warnings → review generated lockfile changes → summarize migration risks
```

## Security Review

```text
@Codex Security @ArmorCodex @Fallow Code Analysis @SonarQube @GitHub @Superpowers

Target:
[REPO / COMPONENT]

Workflow:
Map attack surface → identify trust boundaries → inspect authentication and authorization → inspect secrets and configuration → validate input handling → inspect dangerous execution paths → review dependencies → inspect storage and data exposure → test high-risk paths safely → report confirmed findings with severity and remediation

Separate confirmed vulnerabilities from hypotheses
```

## Authentication / Authorization Review

```text
@Codex Security @ArmorCodex @Supabase @Context7 @Superpowers

Auth flow:
[TASK]

Workflow:
Map identities, sessions and trust boundaries → inspect login and token lifecycle → verify authorization at every protected operation → inspect role and ownership checks → test failure paths → review secret handling → verify current provider guidance → report bypass risks and fixes
```

## API Design

```text
@Superpowers @Context7 @3Min API @FastAPI Cloud @Supabase

API:
[TASK]

Workflow:
Define consumers and jobs → design resources and contracts → define validation → define auth → define error semantics → define idempotency and pagination where needed → define observability → document examples → test happy and failure paths
```

## Build Backend / API

```text
@3Min API @FastAPI Cloud @Supabase @Context7 @Superpowers

Backend task:
[TASK]

Workflow:
Define contract → design data model → define validation and errors → implement endpoints → configure authentication and authorization → test happy paths → test failures and edge cases → inspect logs → document API → verify deployment behavior
```

## Database Schema / Migration

```text
@Supabase @Superpowers @Context7 @Codex Engineering Guardrails

Database change:
[TASK]

Workflow:
Inspect current schema and migrations → define desired data model → assess compatibility and data risk → design reversible migration → apply in development branch/environment → verify constraints and RLS → test queries → inspect security/performance advisors → prepare rollback
```

## Supabase Project Review

```text
@Supabase @Context7 @Superpowers @Codex Security

Project:
[PROJECT]

Workflow:
Inspect project → review tables and migrations → inspect RLS and auth configuration → review edge functions → inspect logs → run security and performance advisors → identify schema and query risks → prioritize fixes
```

## Frontend / Web App

```text
@Build Web Apps @01 Superdesign @Impeccable @Context7 @Superpowers @Testifly

Task:
[TASK]

Workflow:
Understand user flow → define information hierarchy → inspect existing design system → build structure → implement UI → verify responsive behavior → test interactions → inspect accessibility → review visual hierarchy and spacing → fix regressions → verify final state
```

## Frontend UI Review

```text
@Impeccable @01 Superdesign @Build Web Apps @Testifly

Page / App:
[URL OR INPUT]

Workflow:
Inspect hierarchy → spacing → typography → alignment → responsive behavior → interaction states → accessibility → visual consistency → content density → identify the highest-impact problems → propose specific fixes

Avoid generic design feedback
```

## React / Next.js Review

```text
@Build Web Apps @Context7 @Superpowers @CodeRabbit

Repository:
[REPO]

Task:
[TASK]

Workflow:
Inspect component architecture → verify current React/Next.js patterns → inspect server/client boundaries → review data fetching and caching → inspect rendering performance → review bundle and hydration risks → test affected flows → propose focused changes
```

## Architecture / System Design

```text
@Superpowers @IcePanel @Mermaid Chart @Context7 @Codex Engineering Guardrails

System:
[TASK]

Workflow:
Clarify requirements → identify actors and workloads → map components → define ownership boundaries → define data and control flow → model failure modes → define security boundaries → evaluate tradeoffs → document decisions → produce implementation-ready architecture
```

## Architecture Review of an Existing System

```text
@IcePanel @Mermaid Chart @Superpowers @Fallow Code Analysis @Codex Engineering Guardrails

System / Repository:
[INPUT]

Workflow:
Reconstruct current architecture → identify coupling and hidden dependencies → trace critical flows → inspect failure domains → identify architectural debt → distinguish necessary complexity from accidental complexity → propose prioritized changes with migration path
```

## CLI Tool

```text
@Superpowers @Context7 @GitHub @Testifly @Codex Engineering Guardrails

CLI:
[TASK]

Workflow:
Define commands and user jobs → design arguments and output contracts → handle errors and exit codes → implement → test interactive and non-interactive paths → test installation → verify cross-platform behavior where relevant → document examples
```

## Automation / Workflow Engine

```text
@Temporal @Adaptive Codex Orchestrator @Superpowers @Create State @Context7

Automation:
[TASK]

Workflow:
Define trigger → define states → define deterministic steps → define retries and timeouts → define idempotency → define human approval points → define persistence and recovery → implement → simulate failures → verify completion and recovery behavior
```

---

# 2. AI Agents / Skills / Plugins

## Build a ChatGPT / Codex Plugin

```text
@OpenAI Developers @Plugin Autopilot @Plugin Eval @Skill Submission Pack Writer @Superpowers @Context7 @GitHub

Plugin:
[TASK]

Repository:
[REPO]

Workflow:
Inspect current package → define user jobs → define ChatGPT and Codex surfaces → design routing logic → create focused skills → connect tools/apps → define invocation triggers and exclusions → validate manifests → test tool routing → evaluate skill quality → prepare listing metadata → improve README and installation docs

Do not create redundant skills
Keep routing deterministic and easy to understand
```

## Improve an Existing Plugin

```text
@Plugin Autopilot @Plugin Eval @OpenAI Developers @Superpowers @GitHub @Context7

Plugin:
[REPO]

Goal:
[TASK]

Workflow:
Inspect current release → map existing skills, tools and manifests → identify dead, overlapping or weak routing → inspect installation surfaces → strengthen router → improve skill instructions → verify dependencies → test invocation cases → run evaluation → update docs and release metadata
```

## Build / Improve an Agent Skill Pack

```text
@Superpowers @Matt Skills Curated @ThoughtfulBits Skills @Plugin Eval @Skill Submission Pack Writer @get-fable

Skill pack:
[TASK]

Workflow:
Define user jobs → inspect existing skills → identify overlap and missing capabilities → create router → create specialist skills → define triggers → define exclusions → define handoffs and companion skills → add examples and failure cases → test invocation → evaluate → refine package and docs
```

## Skill Routing Audit

```text
@Plugin Eval @Matt Skills Curated @ThoughtfulBits Skills @Superpowers

Skill pack:
[INPUT]

Workflow:
List skills → map each skill to user intent → detect overlap → detect unreachable skills → inspect descriptions and trigger language → inspect exclusions → test ambiguous prompts → improve routing metadata → retest invocation quality
```

## Agent Orchestration

```text
@Adaptive Codex Orchestrator @Superpowers @get-fable @Riqor @Create State

Agent workflow:
[TASK]

Workflow:
Define goal → split independent vs dependent work → assign specialized agents only where useful → define shared truth/state → define handoff contracts → define review gates → execute parallel work where safe → consolidate → verify against one completion gate
```

## Persistent Agent Workflow

```text
@get-fable @Riqor @Create State @Adaptive Codex Orchestrator @Superpowers

Long-running task:
[TASK]

Workflow:
Restore durable state → inspect plan and current reality → identify context drift → reconcile repo/files with stored state → execute next step → verify → persist decisions and progress → create handoff when stopping → resume from persisted truth next session
```

## Agent Safety / Tool Policy

```text
@ArmorCodex @Codex Security @Superpowers @Codex Engineering Guardrails

Agent:
[TASK]

Workflow:
List available tools → classify risk → define allowed operations → define approval-required operations → define denied operations → protect production, credentials and destructive actions → test policy against realistic tool calls → document expected behavior
```

## Agent-Readable Website / Docs

```text
@Agent Ready @GitBook @Documents @Context7

Website:
[URL]

Workflow:
Scan agent readability → inspect llms.txt, robots, sitemap, metadata and structured content → inspect documentation structure → identify blocked or hard-to-extract content → prioritize fixes → update docs/site where authorized → rescan and compare
```

---

# 3. Marketing / Content / Research

## Write a Social Post

```text
@Creator Workspace @Conversational Narrative @Slop Curator @Parallel Search

Topic / Notes:
[INPUT]

Workflow:
Recall only relevant context → research factual claims when needed → avoid angles I already used → choose one strong idea → write in my natural voice → keep useful technical depth → remove generic AI phrasing and filler → fact-check → return one publish-ready post only

Do not show intermediate drafts or internal reasoning
```

## Rewrite an Existing Social Post

```text
@Creator Workspace @Conversational Narrative @Slop Curator

Draft:
[INPUT]

Goal:
[TASK]

Workflow:
Identify what the draft is trying to say → preserve useful ideas → improve opening, pacing and transitions → make the language sound spoken and natural → remove repetition and generic phrasing → strengthen the ending → return the finished post only
```

## Content Research + Writing

```text
@Creator Workspace @Parallel Search @Conversational Narrative @Slop Curator @Tavily AI

Topic:
[TASK]

Workflow:
Recall relevant previous context → identify what needs verification → research recent and primary sources → avoid repeated angles → find a useful insight → draft in my voice → remove filler → verify factual claims → return final copy with sources only when useful
```

## Deep Research

```text
@Deep Research @Parallel Search @Tavily AI @Creator Workspace

Research question:
[TASK]

Workflow:
Define the exact question → break it into sub-questions → gather recent primary and high-quality sources → compare conflicting evidence → separate facts, estimates and opinions → identify patterns → challenge assumptions → synthesize findings → cite important claims → state uncertainty and unresolved gaps
```

## Rapid Fact Check

```text
@Parallel Search @Tavily AI

Claim:
[INPUT]

Workflow:
Find the original or primary source → check date and context → compare at least one independent credible source when material → identify missing context → classify as supported, misleading, outdated, uncertain or false → explain briefly
```

## Competitor Research

```text
@Parallel Search @Tavily AI @Marketing Council @Marketing Swarm

Company / Market:
[INPUT]

Workflow:
Map direct and indirect competitors → inspect positioning, offer, audience, pricing, acquisition channels, content and proof → identify repeated category patterns → identify gaps and underserved jobs → separate observable evidence from assumptions → return opportunities and risks
```

## Deep Marketing Analysis

```text
@Marketing Swarm @Marketing Council @Parallel Search @PrePilot Lite

Business question:
[TASK]

Context:
[INPUT]

Workflow:
Define business objective → collect evidence → analyze audience → offer → positioning → funnel → media → creative → landing experience → measurement → challenge assumptions → identify root constraints → prioritize actions by likely impact and effort
```

## Marketing Strategy

```text
@Marketing Council @Marketing Swarm @Parallel Search @Creator Workspace

Business:
[INPUT]

Goal:
[TASK]

Workflow:
Understand business model and constraints → research category and audience → define the real problem → identify positioning → map customer decision process → define offer and message hierarchy → choose channels → define experiments → define measurement → build prioritized action plan
```

## Campaign Strategy

```text
@Marketing Council @Marketing Swarm @Creator Workspace @Parallel Search

Campaign:
[TASK]

Workflow:
Define objective → audience → awareness stage → trigger → desired action → barrier → proof → message → offer → channel role → creative territories → landing experience → measurement → testing plan

Keep one primary communication job per campaign asset
```

## Paid Media Analysis

```text
@Marketing Swarm @Adobe Marketing Agent @LinkedIn Ads @pipeboard @ChatGPT Ads Manager

Account / Campaign:
[INPUT]

Goal:
[TASK]

Workflow:
Inspect objectives → verify measurement → review account structure → analyze spend and delivery → analyze conversion quality → isolate weak funnel stage → inspect audience → inspect creative → inspect landing page → identify wasted spend → prioritize actions and tests
```

## Meta Ads Review

```text
@pipeboard @Marketing Swarm @Marketing Council

Account / Campaign:
[INPUT]

Workflow:
Verify objective and attribution → inspect campaign and ad set structure → analyze spend concentration → inspect audience overlap → evaluate creative fatigue and variation → inspect conversion quality → identify scaling constraints → recommend next tests
```

## LinkedIn Ads Review

```text
@LinkedIn Ads @Marketing Swarm @Marketing Council

Campaign:
[INPUT]

Workflow:
Verify business objective → inspect targeting → inspect bidding and delivery → review creative/message fit → review lead quality → inspect funnel friction → identify inefficient segments → prioritize creative, audience and offer tests
```

## Creative Strategy

```text
@Marketing Council @Marketing Swarm @Designly @Creator Workspace

Brief:
[INPUT]

Workflow:
Define audience and awareness → define communication job → identify tension or insight → map proof → generate distinct creative territories → reject generic category ideas → choose strongest direction → define message, visual logic and executions
```

## Positioning

```text
@Marketing Council @Parallel Search @Creator Workspace

Brand / Product:
[INPUT]

Workflow:
Understand category alternatives → identify customer job → inspect current language → map competitor claims → identify credible differentiation → define audience → define problem framing → define value → define proof → produce clear positioning and message hierarchy
```

## Landing Page Analysis

```text
@Marketing Swarm @Creator Workspace @Slop Curator @Testifly

URL / Copy:
[INPUT]

Workflow:
Identify traffic intent → inspect message match → inspect first-screen clarity → inspect offer → inspect proof → inspect objections → inspect friction → inspect CTA hierarchy → inspect mobile experience → prioritize changes by conversion impact
```

## Conversion Copywriting

```text
@Creator Workspace @Conversational Narrative @Slop Curator @Marketing Council

Offer:
[INPUT]

Workflow:
Define audience → awareness → job → trigger → desired outcome → obstacle → perceived risk → objections → proof → offer → action → choose one primary message → write in customer vocabulary → remove filler and generic claims
```

## Content Series Planning

```text
@Creator Workspace @Marketing Council @Parallel Search @Conversational Narrative

Series:
[TASK]

Workflow:
Define audience and reason to follow → choose a repeatable editorial promise → map topic pillars → identify recurring formats → avoid overlapping angles → create a publishing sequence → define research needs → define hooks and continuation cues
```

## Daily News Content

```text
@Parallel Search @Tavily AI @Creator Workspace @Conversational Narrative @Slop Curator

Theme:
[TASK]

Workflow:
Find the most meaningful developments from the requested date/window → prioritize impact over noise → verify dates and primary facts → choose 3–5 items max → connect each item to why it matters → write naturally → avoid headline dumping → return publish-ready content
```

---

# 4. Design / Creative

## Key Visual / Creative Direction

```text
@Designly @01 Superdesign @Creative Production @Impeccable

Brief:
[INPUT]

Workflow:
Understand communication job → interpret brand constraints → identify visual tension → generate distinct directions → reject generic category imagery → select strongest concept → define composition → typography → image logic → hierarchy → color behavior → review against brief → refine details
```

## Design Critique

```text
@Designly @Impeccable @01 Superdesign

Design:
[INPUT]

Workflow:
Identify communication job → inspect hierarchy → composition → spacing → typography → color → contrast → imagery → brand consistency → readability → interaction if relevant → identify specific visual problems → rank fixes by impact

Avoid vague feedback such as "make it cleaner"
```

## Reference-Led Design Direction

```text
@Designly @01 Superdesign @Impeccable

Reference:
[INPUT]

New brief:
[TASK]

Workflow:
Analyze the reference's composition, hierarchy, typography, density, rhythm, image treatment and visual behavior → extract reusable design rules without copying literal content → adapt those rules to the new brief → define a distinct final direction
```

## Presentation

```text
@Presentations @Designly @Creator Workspace @Impeccable

Presentation:
[TASK]

Audience:
[AUDIENCE]

Workflow:
Define audience outcome → build narrative → assign one job per slide → structure evidence → define visual direction → design hierarchy → control density → remove filler slides → review slide by slide → verify consistency and readability
```

## Executive Presentation

```text
@Presentations @Designly @Impeccable @Creator Workspace

Topic:
[TASK]

Workflow:
Define decision the audience needs to make → identify only necessary evidence → structure argument → remove explanatory clutter → use concise executive language → build strong visual hierarchy → make every slide independently understandable → end with a concrete decision or next action
```

## Canva Design Task

```text
@Canva @Designly @01 Superdesign @Impeccable

Design:
[TASK]

Workflow:
Understand format and purpose → identify or confirm brand direction → define hierarchy → choose concept → create or edit design → inspect typography, spacing and alignment → check brand consistency → review readability → adapt required sizes → verify final output
```

## Canva Design Review

```text
@Canva @Impeccable @Designly

Design:
[CANVA DESIGN]

Workflow:
Read design content → inspect hierarchy, spacing, typography, readability, consistency and accessibility → identify concrete problems → prioritize changes → apply approved edits → review resulting preview
```

## LinkedIn Animated Infographic

```text
@LinkedIn Animated Infographics @Creator Workspace @01 Superdesign @Impeccable

Topic:
[TASK]

Workflow:
Define one communication job → extract narrative → structure information hierarchy → define frames/scenes → define reading order → plan motion → control reading time → define transitions → inspect spacing and typography → review frame by frame → verify loop and pacing → prepare final production spec
```

## Animated Infographic from a Reference

```text
@LinkedIn Animated Infographics @Designly @01 Superdesign @Impeccable

Reference:
[INPUT]

Content:
[TASK]

Workflow:
Analyze reference layout and motion grammar → identify reusable rules → rebuild narrative for the new content → define scene sequence → define emphasis states → define timing → preserve readability → prevent overlap → review frame by frame
```

## Video / Motion

```text
@Remotion @Creative Production @01 Superdesign

Video:
[TASK]

Workflow:
Define story → break into scenes → define duration → set visual hierarchy → design transitions → implement motion → add captions and audio where needed → preview full sequence → inspect pacing and readability → fix timing → render → verify output
```

## Social Creative Variations

```text
@Designly @Creative Production @01 Superdesign @Marketing Council

Campaign:
[INPUT]

Workflow:
Define one strategic message → create multiple genuinely different visual territories → vary composition, device and emphasis rather than just colors → keep brand constraints → score directions against communication clarity and distinctiveness → select strongest options
```

## Brand Identity Review

```text
@Designly @01 Superdesign @Impeccable @Marketing Council

Brand:
[INPUT]

Workflow:
Inspect strategic positioning → logo behavior → typography → color → layout rules → imagery → tone → consistency across touchpoints → identify where identity supports or contradicts positioning → recommend specific corrections
```

---

# 5. Documentation / Knowledge / Operations

## Documentation

```text
@Documents @GitBook @Creator Workspace @Slop Curator

Documentation task:
[TASK]

Source:
[INPUT]

Workflow:
Identify reader and job → define information architecture → separate concepts, setup, procedures and reference → write concise sections → add examples where useful → remove repetition → verify terminology → check navigation → publish or prepare clean documentation
```

## README

```text
@Documents @Creator Workspace @Slop Curator @GitHub

Repository:
[REPO]

Workflow:
Inspect actual repository → identify product promise → explain who it is for → show fastest useful path → document installation → usage → examples → architecture only where useful → configuration → troubleshooting → contribution → avoid claims unsupported by the repo
```

## Developer Documentation

```text
@GitBook @Documents @Context7 @GitHub

Project:
[REPO]

Workflow:
Inspect code and existing docs → map developer jobs → structure getting started → concepts → how-to guides → API/reference → troubleshooting → verify commands and examples → remove stale instructions → link related topics
```

## Task / Project Planning

```text
@Superpowers @AI Task Brief Builder @Create State @taskplane

Task:
[TASK]

Context:
[INPUT]

Workflow:
Extract confirmed goal → separate facts from assumptions → define scope → identify constraints → break work into executable tasks → map dependencies → define acceptance criteria → define tests → identify risks → save useful project state → track progress
```

## Turn Rough Idea into an Executable Plan

```text
@Superpowers @AI Task Brief Builder @taskplane @Create State

Idea:
[INPUT]

Workflow:
Extract intended outcome → identify what is confirmed vs unclear → define users and jobs → define scope boundaries → convert idea into capabilities → prioritize minimum useful version → define milestones → define acceptance criteria → define risks → produce executable plan
```

## Session Handoff

```text
@Create State @Riqor @get-fable

Project:
[PROJECT]

Workflow:
Capture current objective → record completed work → record important decisions → record changed files/branches → record tests and evidence → record blockers → record exact next steps → create a resumable handoff for the next session
```

## Restore Previous Project Context

```text
@Create State @Riqor @get-fable

Project:
[PROJECT]

Workflow:
Restore latest relevant handoff/state → compare stored state with live repository/files → resolve drift → summarize current truth → identify unfinished work → continue from the verified current state
```

---

# 6. QA / Testing / Release

## Website QA

```text
@Testifly @Agent Ready @Impeccable @Build Web Apps

Website:
[URL]

Workflow:
Inspect main user flows → test navigation and forms → test responsive behavior → inspect accessibility → inspect visual regressions → scan agent readability → capture concrete defects → rank by severity → verify fixes
```

## E2E Testing

```text
@Testifly @Superpowers @GitHub

App:
[URL / REPO]

Flows:
[INPUT]

Workflow:
Define critical paths → define expected states → test happy paths → test validation and failure paths → test navigation and persistence → capture reproducible defects → map defects to code when possible → retest fixes
```

## Android QA

```text
@Test Android Apps @Superpowers

App / Build:
[INPUT]

Workflow:
Reproduce requested flow on emulator → inspect UI tree → capture screenshots where useful → inspect logs → identify defect → verify fix → check nearby regressions → collect performance evidence if the issue is performance-related
```

## Release Readiness

```text
@PR Completion @PR Readiness Check @GitHub @CodeRabbit @Superpowers

Release / PR:
[INPUT]

Workflow:
Confirm scope → inspect unresolved review items → verify required tests and CI → inspect versioning and changelog → check documentation → check migration/rollback requirements → identify release blockers → return a concrete readiness verdict
```

## Regression Test Planning

```text
@Superpowers @AI Task Brief Builder @CodeRabbit

Change:
[INPUT]

Workflow:
Identify changed behavior → map affected user paths → identify neighboring functionality → define happy-path regression tests → define edge cases → define failure tests → prioritize tests by risk → distinguish automated vs manual coverage
```

---

# 7. Search / Discovery / Analysis

## Search Current Technical Documentation

```text
@Context7 @Parallel Search

Question:
[TASK]

Workflow:
Identify exact library/product and version → prefer official documentation → retrieve current behavior → compare migration or version differences when relevant → answer with concrete implementation guidance
```

## Web Research

```text
@Parallel Search @Tavily AI

Question:
[TASK]

Workflow:
Break question into search targets → find current credible sources → prioritize primary sources → compare evidence → discard weak duplicates → synthesize concise findings → cite important claims
```

## Website Content Extraction

```text
@Tavily AI @Parallel Search

Website:
[URL]

Goal:
[TASK]

Workflow:
Map relevant pages → crawl only useful sections → extract content → remove navigation/noise → organize findings around the goal → identify missing information → summarize with source links
```

---

# 8. Product / UX

## Product Feature Definition

```text
@Superpowers @AI Task Brief Builder @Creator Workspace @taskplane

Feature idea:
[INPUT]

Workflow:
Identify user → job → trigger → current workaround → desired outcome → constraints → define smallest useful capability → define main flow → define edge cases → define acceptance criteria → define instrumentation → identify open questions
```

## UX Flow Review

```text
@01 Superdesign @Impeccable @Build Web Apps @Testifly

Flow:
[INPUT]

Workflow:
Define user goal → inspect entry point → inspect decision points → identify unnecessary steps → inspect labels and feedback → inspect errors and recovery → inspect mobile behavior → prioritize friction → propose specific flow changes
```

## Product Technical Feasibility

```text
@Superpowers @Context7 @Codex Engineering Guardrails @AI Task Brief Builder

Idea:
[INPUT]

Workflow:
Define required capabilities → identify technical assumptions → inspect platform constraints → identify third-party dependencies → map complexity → identify security and operational risks → propose implementation options → compare tradeoffs → recommend practical approach
```

---

# 9. Quick Router

Use this when you do not know which block fits

```text
Use my installed plugin stack intelligently for the task below

Task:
[TASK]

First classify the task and its current stage
Choose only the smallest useful plugin stack
Restore existing context if this is continuation work
Use research plugins only when external verification matters
Use execution plugins only when an actual action is required
Use review and QA plugins after implementation
Do not invoke unrelated plugins
Do not claim a plugin was executed unless its callable interface or skill was actually available and used

Workflow:
Classify → route → inspect → execute → verify → report
```

---

# 10. Stage-Based Plugin Routing

## Research Stage

```text
@Parallel Search @Tavily AI @Deep Research @Context7

Research only what is required to remove uncertainty
Prefer primary and current sources
Separate verified facts from assumptions
Return findings that directly affect the task
```

## Planning Stage

```text
@Superpowers @AI Task Brief Builder @taskplane @Create State

Turn confirmed information into an executable plan
Define scope, dependencies, acceptance criteria, tests and risks
Do not start implementation until the plan is coherent
```

## Implementation Stage

```text
@Superpowers @GitHub @Context7 @Codex Engineering Guardrails

Implement the approved scope in small verifiable changes
Follow existing architecture unless there is a confirmed reason to change it
Test continuously
```

## Review Stage

```text
@CodeRabbit @Fallow Code Analysis @Codex Engineering Guardrails @PR Readiness Check

Review correctness, regressions, tests, maintainability and requirement coverage
Rank concrete findings by severity
```

## Security Stage

```text
@Codex Security @ArmorCodex @SonarQube

Inspect the changed attack surface and trust boundaries
Focus on confirmed security consequences
```

## QA Stage

```text
@Testifly @Impeccable @Agent Ready

Test real user flows, visual behavior, accessibility and agent readability where relevant
Verify fixes rather than assuming them
```

## Handoff Stage

```text
@Create State @Riqor @get-fable

Persist the current truth
Record completed work, evidence, decisions, blockers and exact next steps
Make the next session resumable without rediscovery
```
