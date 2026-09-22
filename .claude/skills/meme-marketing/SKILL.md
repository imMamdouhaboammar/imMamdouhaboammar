---
name: meme-marketing
description: Create, critique, localize and tune relatable social memes from audience-specific moments. Use for meme marketing, funny organic posts, reaction images, screenshot memes, Egyptian or Gulf Arabic memes, English memes, meme calendars and meme feedback. Produces publishable captions and practical visual briefs, optionally structured JSON, with cultural checks, brand fit and evidence-aware post tuning.
metadata:
  version: "2.0"
---

# Meme Marketing

A meme succeeds creatively when someone recognizes a small, specific situation and knows exactly who to send it to. Actual reach and sales require observed performance data. Work from the audience's experience and keep the format native to their feed.

## Routes

- Create: topic or pain point to complete meme concepts
- Audit: inspect existing caption, image, cultural fit, joke and repetition without replacing good copy
- Localize: rebuild the situation and reference for the new audience; literal translation alone is inadequate
- Tune: use accepted, rejected and revised examples to propose a context-specific taste profile
- Plan: build a diverse content batch with a clear brand-role mix

Read only what the route needs. Creation uses references/humor-mechanics.md, references/caption-craft.md, references/format-bank.md and references/design-spec.md. Tune uses references/post-tuning.md. Review of the original examples uses references/deck-patterns.md. JSON delivery uses references/output-contract.md.

## Creation process

1. **Brief.** Establish market, platform, audience subculture, industry, brand and any style samples. Ask only for a truly blocking detail; otherwise state one practical assumption and proceed. Never silently assert real client results or user experiences.
2. **Moment mining.** List 12 to 20 plausible micro-situations, privately when the user only wants final memes. For each record the person, trigger, expectation, actual friction, a recognizable phrase/object and whom they would send it to. Mark source: user-observed, brief-supplied, researched or illustrative. An invented scene is creative fiction, not a claim that it happened.
3. **Select.** Keep 3 to 5 different moments by recognition, specificity, audience familiarity and natural forward-to-a-friend potential. Distinct variants must differ in the situation or the comedic mechanism, not just in adjectives.
4. **Humor.** Choose a mechanism from references/humor-mechanics.md: understatement, exaggeration, incongruous reaction, reversal, absurd literalization, social role collision, ironic self-report, escalation or visual misdirection. Choose voice separately: deadpan, panicked, weary, smug or sincere. Don't let one mechanism dominate a batch.
5. **Visual.** Choose the form that serves the joke: reaction still, original scene, familiar licensed template, screenshot, fake chat clearly staged, UI mock, object labeling, comparison, multi-panel, text-led or visual-only. Existing cultural recognition is helpful when genuinely shared, but an original visual can carry a universally recognizable scenario.
6. **Caption and image relationship.** Choose one mapping: reaction, dialogue, understatement, literalization, labeling, contradiction, delayed reveal or text-free recognition. Two distinct voices are valuable for dialogue memes, but optional elsewhere. The caption may set a scene, be spoken dialogue, label an object, or be absent when the visual says everything.
7. **Cultural and platform pass.** Verify actual dialect and reference familiarity for the target group. Egyptian Arabic is the default only when the user has not set another locale. A Saudi audience is not one identical voice. Preserve regional nuance and the author's genuine spelling; never manufacture typos or slang. Look up newly trending formats with the publication date when current references matter; otherwise mark freshness unknown.
8. **Visual brief.** Specify exact scene, subject emotion, composition, on-image text if any, placement, font treatment, ratio, contrast, logo treatment and a feasible fallback. Confirm source licensing or supply an original alternative. Avoid creating recognizable copyrighted characters or impersonating real people without appropriate permission.
9. **Release review.** Run the quality gates below and give only the requested quantity and level of detail.

## Quality gates

1. **Send test:** Can you name who would send this and to whom? Is the situation narrow enough for that relationship?
2. **Real-world detail:** Does a tool, phrase, deadline, setting, object or honest number locate this experience? Never invent a statistic or claim that an illustrative number is measured. Numeric details are optional when they would be forced; a supplied number should be preserved exactly.
3. **Image-text contract:** Does each part add information or emotion? For dialogue memes, use two actual voices. For visual-only memes, leave the image free of text. Any repetition must be an intentional echo.
4. **One-glance test:** Can the core scene register at feed speed for its intended subculture? Some inside jokes need shared context; don't explain the joke inside the image to compensate.
5. **Share without logo:** Is the scenario still funny when the brand mark is covered? Product-forward variants require an actual narrative role for the product, not a disguised benefit claim.
6. **Variety:** In a batch, vary moments, forms and humor mechanisms. No three captions with the same setup or three identical expressions for the same joke.
7. **Respect and truth:** Avoid humiliation of identifiable private people, vulnerable patients, employees or customers. Do not exploit tragedies, unsafe medical claims or unsupported performance promises. Clearly stage fake interfaces and conversations; do not present them as leaked receipts.
8. **Rights and usability:** Check image permission, attribution requirements, legibility at phone size, crop and availability of an original fallback.

When a gate fails, repair that part once, and replace the concept if the underlying situation has no recognition. A weak meme can be omitted instead of padded into a fixed count; tell the user when the brief cannot honestly support the requested quantity.

## Publishable output

Default to 3 genuinely different concepts when quantity is unspecified. Match the requested platform and provide final copy ready to post. Each concept contains:

- Audience and recognizable micro-moment, in one short line each
- Humor mechanism and image-text mapping, each named
- Feed caption, exact text or explicitly "none"
- On-image text, exact text or explicitly "none"
- Primary visual: form, scene, expression and a search/build direction
- Fallback: a different feasible original or rights-cleared visual
- Design: aspect ratio, text position, type/palette, accessibility contrast, logo location/version
- Cultural reference: audience familiarity and provenance; freshness verified with a date or labeled unknown
- Brand role: none, prop, character or product-forward
- One-line explanation of who would share it; never explain the punchline in public copy

If the user requests just captions, deliver just captions. If asked to create actual images, use the available image generation or design tool; never imply a text brief is an image. For machine-readable workflows, use the schema in references/output-contract.md.

A default content calendar may keep overtly product-forward memes around one in five; adapt to the brief. Keep calls to action, prices, hashtags and feature lists out of the image by default. Put conversion requests in a separate post or caption only when the user asks. No engagement or sales prediction without relevant observed data.

## Post tuning and evaluation

Follow references/post-tuning.md when the user supplies approved examples, rejections or edits. Separate audience-specific feedback from the writer's personal voice. Do not turn one correction into a permanent universal rule. Never claim cross-session learning unless a portable profile was actually written and loaded.

Use evals/evals.json as prompt-level evaluation scenarios. The optional stdlib validator scripts/validate.py checks only structure and a few mechanical failures; a human or an LLM judge still has to assess whether the meme lands, respects culture and feels native. Read references/output-contract.md before exporting JSON.

## Failure patterns

- Generic setup with a famous template attached
- Three rewrites of the same punchline disguised as a batch
- Pretending a trend is current without a dated check
- Turning a user's writing sample into an assumed personal anecdote
- Copying recognizable meme artwork in generated visuals without rights
- Fake typos, exaggerated dialect markers and repeated "لما" openings
- Long explanations, corporate slogans, or on-image promotional copy
- Treating a subjective rubric as a guaranteed virality score
