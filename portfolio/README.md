# Portfolio page

A bilingual, static portfolio page for Mamdouh Aboammar.

- English, LTR: [`/portfolio/`](https://immamdouhaboammar.github.io/imMamdouhaboammar/portfolio/)
- Arabic, RTL: [`/portfolio/ar/`](https://immamdouhaboammar.github.io/imMamdouhaboammar/portfolio/ar/)

## Stack

Plain HTML, CSS and a small vanilla JavaScript file. No framework, no bundler, no
dependencies at runtime. GitHub Pages serves the files as they sit in the repo.

Both pages come out of one generator so the English and Arabic versions can never
drift apart in structure:

```
portfolio/
  content.mjs        both locales' copy, projects, stack and FAQ
  build.mjs          renders the two HTML files
  index.html         generated, English, dir="ltr"
  ar/index.html      generated, Arabic, dir="rtl"
  assets/site.css    one stylesheet for both directions
  assets/site.js     theme, menu, scroll highlighting, copy button
```

## Rebuilding

Edit `content.mjs` (copy) or `build.mjs` (markup), then run:

```bash
node portfolio/build.mjs
```

The generated `index.html` files are committed, so nothing needs to build on deploy.

## Direction handling

One stylesheet serves both pages. Layout uses logical properties
(`margin-inline`, `inset-inline-start`, `border-block-end`), and the two values
that cannot be expressed logically go through custom properties: the hard shadow
offset flips via `--sx`, and arrow icons flip with `scaleX(-1)` under
`[dir="rtl"]`. Arabic pages switch to IBM Plex Sans Arabic through `html[lang="ar"]`.

## Indexing

Every section is present in the served HTML, so crawlers and answer engines read
the full page without executing JavaScript. The page carries `Person`,
`ProfilePage`, `ItemList` and `FAQPage` JSON-LD, reciprocal `hreflang` links
between the two locales, Open Graph and Twitter cards, and entries in
`/sitemap.xml` and `/llms.txt`. `robots.txt` already admits GPTBot, ClaudeBot,
PerplexityBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent and
OAI-SearchBot.

## Checks run before shipping

- No horizontal overflow and no page errors at 320, 390, 768, 1024, 1440, 1920
  and 2560 pixels wide, in both locales
- One `h1`, ordered headings below it, every image with `alt`, every link with an
  accessible name
- Renders fully with JavaScript disabled
- Light and dark themes, and `prefers-reduced-motion` stopping the ticker, the
  spinning badge and the confetti
