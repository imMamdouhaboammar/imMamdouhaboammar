# Written as Spoken

A Claude skill that writes LinkedIn and Facebook posts in Mamdouh Aboammar's voice: Egyptian Arabic that sounds like a senior marketer talking on the way home, with a real story bridged to daily marketing work and no AI slop.

The voice was measured from about 3.4M characters of published posts, drafts and ad copy. The recent `#بعد_الساعة_5` series is the reference; older clickbait posts are kept as negative examples.

## What it does

1. Asks only what blocks the draft (idea, format, platform, proof).
2. Mines a work mechanism and a dated anchor story.
3. Verifies facts, and corrects popular myths in public.
4. Drafts with one of six architectures.
5. Runs `scripts/lint.mjs`, which blocks em dashes, line-ending periods, banned buzzwords, clickbait and every denial-then-reveal contrast ("ده مش X. ده Y", "X مش A / X هو B", "not just").
6. Runs a critic pass and returns paste-ready copy.

## Install

**Claude Code (repository)**: already available at `.claude/skills/written-as-spoken`.

**Claude Code (plugin)**: add the marketplace, then install:

```
/plugin marketplace add imMamdouhaboammar/imMamdouhaboammar
/plugin install written-as-spoken@mamdouh-skills
```

**claude.ai**: zip this folder and upload it under Settings, Capabilities, Skills.

## Try it

```
اكتبلي بوست بعد الساعة 5 عن إن الـDashboards الكتير بتأخر القرار
```

```
راجع البوست ده بستايل written as spoken
```

## Check the linter

```
node scripts/selftest.mjs
node scripts/lint.mjs path/to/draft.txt
```
