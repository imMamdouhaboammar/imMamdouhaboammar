# Design Spec

The design of a meme has one purpose: to look like it was made by a person in a hurry, not by a studio. Every polish instinct you have is working against you here.

Fill the design block in the output with real values. A designer reading your spec should not have to make a single decision you could have made for them.

---

## Typography

**Arabic text**
- Heavy display weight, the boldest cut available. Thin or elegant Arabic type reads as editorial and kills the tone.
- Fill: bright yellow, around `#FFE500`. This is the default across Egyptian meme culture and it reads on almost any footage.
- Outline: black stroke, thick, roughly 6 to 10% of the cap height. The stroke is what makes the text survive a busy frame.
- No drop shadow, no gradient, no bevel, no glow.

**Latin words inside an Arabic line**
Set them in a heavy serif or a different bold face from the Arabic. The visual break is useful: it makes the jargon pop and mirrors how these words feel in speech, like borrowed objects.

**Alternate palette for a second brand or a softer pillar**
Pink fill with a white outline reads as lifestyle rather than industry, and cleanly separates a second content line from the main one. Pick one palette per brand and never mix them in the same feed.

---

## Layout

- Text sits in the **bottom 15 to 20%** of the frame, centered or running full width.
- One line about 70% of the time. Two when the joke needs a condition. Three is a warning sign that the idea is not compressed yet.
- No background box behind the text by default; the stroke does the separating.
- Use a black bar behind the text only in stacked two-panel layouts, where it doubles as the panel divider.
- Never cover a face. The face is the payload.
- Arabic letter elongation (kashida) is used decoratively to fill a line to full width. It reads as classic meme and poster styling, so it is a feature rather than a mistake.

---

## Ratios

| Ratio | When |
|---|---|
| 1:1 | Default. Safest across feed placements. |
| 4:5 | When you want maximum vertical space in an Instagram or Facebook feed. |
| 16:9 | When the width of a cinematic frame is part of the joke, or when two people in one shot matter. |
| Stacked 2-panel | Setup and answer, or question and reply. |
| 2x2 grid | Escalation across four beats. Use sparingly. |

---

## Logo

- Small badge in a top corner, roughly **8 to 10% of the image width**.
- Same corner every time, so it becomes a recognizable mark rather than a label.
- Never over a face, and never in the bottom third where the text lives.
- Keep a light and a dark version. A yellow-on-green badge disappears on a bright yellow cartoon background, which is the single most common execution error in this format.
- The logo is the entire branding budget. No URL, no handle inside the image, no frame, no watermark pattern.

---

## Image quality

Counterintuitive but important: **do not upscale or clean the source.** Screenshot-grade compression reads as "someone sent me this", which is exactly the social context you want. A crisp, colour-graded, high-resolution meme reads as an asset produced by an agency, and people forward those far less often.

Keep the source's own grain, letterboxing and compression artifacts. Crop to the ratio and add text. That is the whole treatment.

---

## Elements deliberately absent

No CTA. No link. No hashtags in the image. No price. No feature bullets. No border or frame. No gradient overlay. No icon set. No brand colour wash over the photo.

Each one of these visibly converts a meme into an ad, and an obvious ad costs the person sharing it a small amount of social credit, which is enough to stop the share.

---

## Delivery checklist

Before handing the spec over, confirm you have specified:

- [ ] Ratio
- [ ] Text content, exactly as it should be set, with the line break if there are two lines
- [ ] Text position and colour palette
- [ ] Logo corner and which version, light or dark
- [ ] The visual, described precisely enough to be found or built
- [ ] A fallback visual carrying the same emotional state
