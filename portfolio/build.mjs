#!/usr/bin/env node
// Static generator for the bilingual portfolio page.
// Run: node portfolio/build.mjs
// Output: portfolio/index.html (en, ltr) and portfolio/ar/index.html (ar, rtl)
// No dependencies, no bundler, no runtime framework. The output is plain HTML.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, LINKS, STATS, PROJECTS, CAPABILITIES, PRINCIPLES, STACK, LOCALES, SOCIALS } from './content.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ABS = `${SITE.origin}${SITE.base}`;
const URLS = { en: `${ABS}${SITE.enPath}`, ar: `${ABS}${SITE.arPath}` };

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ICONS = {
  mail: '<path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4.1-.9L3 20.5l1.5-4.6A8.4 8.4 0 0 1 3.6 11 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 3l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21l1.7-1.7"/>',
  code: '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  research: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6"/><path d="M8 11h6"/>',
  docs: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  issues: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16.5h.01"/>',
  tests: '<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M8 3h8"/><path d="M6.5 15h11"/>',
  agents: '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M12 3v4"/><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M9.5 16h5"/>',
  cost: '<path d="M4 19V5"/><path d="m8 15 4-5 3 3 5-7"/><path d="M4 19h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>',
  moon: '<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  close: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8a5 5 0 0 0-.1-3.7s-1.2-.3-4 1.5a13.4 13.4 0 0 0-7 0C6 .8 4.8 1.1 4.8 1.1A5 5 0 0 0 4.7 4.8 5.4 5.4 0 0 0 3.2 8.6c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-1 2.5V22"/>',
};

const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;

const SPARK = '<path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z"/>';

/* Decorative marks. Purely visual, so they stay out of the accessibility tree. */
const spark = (cls) => `<svg class="spark ${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${SPARK}</svg>`;

const squiggle = () => `<svg class="squiggle" viewBox="0 0 240 12" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M2 8c14-8 28 8 42 0s28-8 42 0 28 8 42 0 28-8 42 0 28 8 42 0"/></svg>`;

const spinBadge = (t) => `<div class="spin-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
              <defs><path id="ring-${t.code}" d="M60 60m-42 0a42 42 0 1 1 84 0a42 42 0 1 1-84 0"/></defs>
              <text><textPath href="#ring-${t.code}" startOffset="0">${esc(t.badgeRing)}</textPath></text>
            </svg>
            <span class="spin-badge-core">${icon('arrow', 'i i-arrow')}</span>
          </div>`;

/* Links that leave the page: hardened rel, plus a note only assistive tech reads. */
const EXT = ' target="_blank" rel="noopener noreferrer"';
const srNewTab = (t) => `<span class="sr-only"> (${esc(t.newTab)})</span>`;

const jsonld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}</script>`;

/* ---------------------------------------------------------------- head ---- */

function structuredData(t) {
  const personId = `${URLS.en}#person`;
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: t.code === 'ar' ? 'ممدوح أبو عمار' : 'Mamdouh Aboammar',
    alternateName: ['Mamdouh Aboammar', 'ممدوح أبو عمار', 'imMamdouhaboammar', 'boammarrr'],
    url: URLS[t.code],
    image: `${ABS}/${SITE.avatar}`,
    email: `mailto:${LINKS.email}`,
    jobTitle: t.code === 'ar'
      ? 'Product Architecture ومؤسس PrePilot'
      : 'Product Architecture, AI workflows, conversion systems',
    description: t.description,
    knowsLanguage: ['ar', 'en'],
    worksFor: { '@type': 'Organization', name: 'PrePilot', url: LINKS.prepilotOrg },
    knowsAbout: [
      'Product Architecture', 'Product requirement documents', 'Technical writing',
      'AI agent workflows', 'Model Context Protocol', 'Test design',
      'Conversion copywriting', 'Performance marketing', 'Marketing mix modeling',
    ],
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.x, LINKS.website, LINKS.instagram, LINKS.facebook, LINKS.prepilotOrg],
    seeks: {
      '@type': 'Demand',
      name: t.code === 'ar' ? 'شغل Freelance وFull-time وPart-time' : 'Freelance, full-time and part-time work',
      areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'GCC'],
    },
  };

  const page = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${URLS[t.code]}#page`,
    url: URLS[t.code],
    name: t.title,
    description: t.description,
    inLanguage: t.htmlLang,
    dateModified: SITE.updated,
    mainEntity: { '@id': personId },
    isPartOf: { '@type': 'WebSite', '@id': `${ABS}/#website`, url: `${ABS}/`, name: 'Mamdouh Aboammar' },
  };

  const projects = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${URLS[t.code]}#builds`,
    name: t.sections.builds.title,
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: p.name,
        description: p[t.code],
        codeRepository: p.url,
        url: p.url,
        author: { '@id': personId },
        keywords: p.tags.join(', '),
      },
    })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${URLS[t.code]}#faq`,
    inLanguage: t.htmlLang,
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return [person, page, projects, faq].map(jsonld).join('\n  ');
}

function head(t) {
  const d = t.depth;
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta name="keywords" content="${esc(t.keywords)}">
  <meta name="author" content="Mamdouh Aboammar">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f6f4f0" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0e1015" media="(prefers-color-scheme: dark)">

  <link rel="canonical" href="${URLS[t.code]}">
  <link rel="alternate" hreflang="en" href="${URLS.en}">
  <link rel="alternate" hreflang="ar" href="${URLS.ar}">
  <link rel="alternate" hreflang="x-default" href="${URLS.en}">

  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="Mamdouh Aboammar">
  <meta property="og:locale" content="${t.code === 'ar' ? 'ar_EG' : 'en_US'}">
  <meta property="og:locale:alternate" content="${t.code === 'ar' ? 'en_US' : 'ar_EG'}">
  <meta property="og:title" content="${esc(t.title)}">
  <meta property="og:description" content="${esc(t.description)}">
  <meta property="og:url" content="${URLS[t.code]}">
  <meta property="og:image" content="${ABS}/${SITE.banner}">
  <meta property="og:image:width" content="2056">
  <meta property="og:image:height" content="765">
  <meta property="og:image:alt" content="${esc(t.ogAlt)}">
  <meta property="profile:first_name" content="Mamdouh">
  <meta property="profile:last_name" content="Aboammar">
  <meta property="profile:username" content="imMamdouhaboammar">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Bo_ammarrr">
  <meta name="twitter:creator" content="@Bo_ammarrr">
  <meta name="twitter:title" content="${esc(t.title)}">
  <meta name="twitter:description" content="${esc(t.description)}">
  <meta name="twitter:image" content="${ABS}/${SITE.banner}">

  <link rel="icon" href="${d}${SITE.avatar}">
  <link rel="apple-touch-icon" href="${d}${SITE.avatar}">
  <link rel="help" href="${d}llms.txt" type="text/plain" title="LLM context pack">
  <link rel="sitemap" type="application/xml" href="${d}sitemap.xml">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap">
  <link rel="stylesheet" href="${t.code === 'ar' ? '../assets/site.css' : 'assets/site.css'}">

  ${structuredData(t)}
  <noscript><style>
    /* The narrow-viewport nav is a drawer that only script can open, so with
       script off it lays out inline instead and the menu button goes away. */
    @media (max-width: 1220px) {
      .topbar { flex-wrap: wrap; border-radius: var(--r-lg); }
      .nav {
        position: static;
        order: 3;
        flex-basis: 100%;
        margin-inline: 0;
        padding: 8px 0 2px;
        opacity: 1;
        visibility: visible;
        transform: none;
        background: none;
        border: 0;
        box-shadow: none;
      }
      .nav-list { flex-direction: row; flex-wrap: wrap; justify-content: center; }
      .menu-btn { display: none; }
    }
  </style></noscript>
  <script>
    /* Applied before first paint so the chosen theme never flashes. */
    (function () {
      try {
        var saved = localStorage.getItem('ma-theme');
        if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
      } catch (e) {}
    })();
  </script>`;
}

/* --------------------------------------------------------------- pieces ---- */

const kicker = (text) => `<p class="kicker"><span>${esc(text)}</span></p>`;

function sectionHead(s, id) {
  return `<header class="section-head" id="${id}-head">
        ${kicker(s.kicker)}
        <h2 class="section-title">${esc(s.title)}${squiggle()}</h2>
        ${s.lede ? `<p class="section-lede">${esc(s.lede)}</p>` : ''}
      </header>`;
}

function header(t) {
  const d = t.depth;
  return `<header class="topbar" id="top">
    <a class="brand" href="#top">
      <img class="brand-avatar" src="${d}${SITE.avatar}" width="40" height="40" alt="" loading="eager" decoding="async">
      <span class="brand-text">
        <strong>Mamdouh Aboammar</strong>
        <small>${esc(t.hero.roleLine)}</small>
      </span>
    </a>

    <nav class="nav" id="nav" aria-label="${esc(t.sections.work.kicker)}">
      <ul class="nav-list">
        ${t.nav.map((n) => `<li><a href="#${n.id}" data-nav="${n.id}">${esc(n.label)}</a></li>`).join('\n        ')}
      </ul>
    </nav>

    <div class="topbar-actions">
      <a class="lang-switch" href="${t.switchTo.href}" hreflang="${t.switchTo.lang}" lang="${t.switchTo.lang}" dir="${t.switchTo.lang === 'ar' ? 'rtl' : 'ltr'}">
        ${icon('globe')}<span>${esc(t.switchTo.label)}</span>
      </a>
      <button class="icon-btn" id="theme-toggle" type="button" aria-label="${esc(t.themeLabel)}">
        ${icon('sun', 'i i-sun')}${icon('moon', 'i i-moon')}
      </button>
      <a class="btn btn-primary btn-sm topbar-cta" href="#contact">${esc(t.navCta)}</a>
      <button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="${esc(t.menuOpen)}" data-open="${esc(t.menuOpen)}" data-close="${esc(t.menuClose)}">
        ${icon('menu', 'i i-menu')}${icon('close', 'i i-close')}
      </button>
    </div>
  </header>`;
}

function hero(t) {
  const d = t.depth;
  const pills = t.contactPills.map((p) => {
    const inner = `${icon(p.icon)}<span>${esc(p.label)}</span>`;
    return p.href
      ? `<a class="pill pill-dark" href="${esc(p.href)}"${p.href.startsWith('http') ? EXT : ''}>${inner}${p.href.startsWith('http') ? srNewTab(t) : ''}</a>`
      : `<span class="pill pill-dark">${inner}</span>`;
  }).join('\n          ');

  return `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-main card" data-accent="1">
        ${spark('spark-a')}${spark('spark-b')}
        <ul class="sticker-row" aria-hidden="true">
          ${t.hero.stickers.map((s, i) => `<li class="sticker" data-accent="${i + 2}">${esc(s)}</li>`).join('')}
        </ul>
        ${kicker(t.hero.eyebrow)}
        <h1 class="hero-title" id="hero-title">
          ${esc(t.hero.titleLead)} <mark class="mark">${esc(t.hero.titleHighlight)}</mark> ${esc(t.hero.titleTail)}
        </h1>
        <p class="hero-lede">${esc(t.hero.lede)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contact">${esc(t.hero.primary)}${icon('arrow', 'i i-arrow')}</a>
          <a class="btn btn-ghost" href="#builds">${esc(t.hero.secondary)}</a>
        </div>
        <div class="pill-row">
          ${pills}
        </div>
      </div>

      <aside class="hero-side">
        <figure class="card card-portrait">
          ${spinBadge(t)}
          <img src="${d}${SITE.avatar}" width="460" height="460" alt="${esc(t.hero.avatarAlt)}" loading="eager" decoding="async" fetchpriority="high">
          <figcaption>
            <span class="status-dot" aria-hidden="true"></span>
            ${esc(t.hero.availability)}
          </figcaption>
        </figure>
        <a class="card card-link" href="${LINKS.prepilot}"${EXT} data-accent="4">
          <span class="card-link-label">${esc(t.background.prepilotTitle)}</span>
          <strong class="card-link-value">PrePilot${srNewTab(t)}</strong>
          <span class="card-link-go" aria-hidden="true">${icon('arrow', 'i i-arrow')}</span>
        </a>
      </aside>
    </section>`;
}

function stats(t) {
  return `<section class="stats" aria-label="${esc(t.statsTitle)}">
      ${STATS.map((s, i) => `<div class="stat card" data-accent="${i + 1}">
        <strong class="stat-value">${esc(s.value)}</strong>
        <span class="stat-label">${esc(s[t.code])}</span>
      </div>`).join('\n      ')}
      <p class="stats-note">${esc(t.statsNote.replace('{date}', SITE.updated))}</p>
    </section>`;
}

function marquee(t) {
  const run = t.marquee
    .map((word, i) => `<li data-accent="${(i % 6) + 1}">${esc(word)}</li>`)
    .join('');
  return `<section class="marquee" aria-label="${esc(t.marqueeLabel)}">
      <ul class="marquee-track">${run}</ul>
      <ul class="marquee-track" aria-hidden="true">${run}</ul>
    </section>`;
}

function capabilities(t) {
  return `<section class="section" id="work" aria-labelledby="work-head">
      ${sectionHead(t.sections.work, 'work')}
      <div class="grid grid-3">
        ${CAPABILITIES.map((c, i) => `<article class="card card-cap" data-accent="${i + 1}">
          <span class="cap-icon" aria-hidden="true">${icon(c.icon)}</span>
          <h3 class="card-title">${esc(c[t.code].title)}</h3>
          <p class="card-body">${esc(c[t.code].body)}</p>
        </article>`).join('\n        ')}
      </div>
    </section>`;
}

function builds(t) {
  return `<section class="section" id="builds" aria-labelledby="builds-head">
      ${sectionHead(t.sections.builds, 'builds')}
      <div class="grid grid-3">
        ${PROJECTS.map((p, i) => `<article class="card card-project" data-accent="${(i % 6) + 1}">
          <a class="project-link" href="${p.url}"${EXT}>
            <h3 class="card-title">${esc(p.name)}${srNewTab(t)}<span class="project-go" aria-hidden="true">${icon('arrow', 'i i-arrow')}</span></h3>
          </a>
          <p class="card-body">${esc(p[t.code])}</p>
          <ul class="tag-row">
            ${p.tags.map((tag) => `<li class="tag">${esc(tag)}</li>`).join('')}
          </ul>
        </article>`).join('\n        ')}
      </div>
      <p class="section-foot">
        <a class="btn btn-ghost" href="${t.depth}REPOSITORIES.md">${esc(t.sections.builds.cta)}${icon('arrow', 'i i-arrow')}</a>
      </p>
    </section>`;
}

function stack(t) {
  return `<section class="section" id="stack" aria-labelledby="stack-head">
      ${sectionHead(t.sections.stack, 'stack')}
      <div class="grid grid-stack">
        ${STACK.map((g, i) => `<article class="card card-stack" data-accent="${(i % 6) + 1}">
          <h3 class="stack-title">${esc(g[t.code])}</h3>
          <ul class="chip-row">
            ${g.items.map((i) => `<li class="chip" dir="ltr">${esc(i)}</li>`).join('')}
          </ul>
        </article>`).join('\n        ')}
      </div>
    </section>`;
}

function method(t) {
  return `<section class="section" id="method" aria-labelledby="method-head">
      ${sectionHead(t.sections.method, 'method')}
      <div class="grid grid-4 method-path">
        ${PRINCIPLES.map((p, i) => `<article class="card card-principle" data-accent="${i + 1}">
          <span class="principle-num" aria-hidden="true">${p.num}</span>
          <h3 class="card-title">${esc(p[t.code].title)}</h3>
          <p class="card-body">${esc(p[t.code].body)}</p>
        </article>`).join('\n        ')}
      </div>
    </section>`;
}

function background(t) {
  const b = t.background;
  return `<section class="section" id="background" aria-labelledby="background-head">
      ${sectionHead(t.sections.background, 'background')}
      <div class="bg-grid">
        <div class="card card-prose">
          ${b.body.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>
        <div class="card card-quote">
          <h3 class="card-title">${esc(b.quoteTitle)}</h3>
          <p class="card-body">${esc(b.quote)}</p>
          <ul class="chip-row chip-row-tight">
            ${b.artefacts.map((a) => `<li class="chip chip-mono" dir="ltr">${esc(a)}</li>`).join('')}
          </ul>
        </div>
        <div class="card card-prepilot">
          <h3 class="card-title">${esc(b.prepilotTitle)}</h3>
          <p class="card-body">${esc(b.prepilotBody)}</p>
          <a class="btn btn-primary btn-sm" href="${LINKS.prepilot}"${EXT}>${esc(b.prepilotCta)}${srNewTab(t)}${icon('arrow', 'i i-arrow')}</a>
        </div>
      </div>
    </section>`;
}

function faq(t) {
  return `<section class="section" id="faq" aria-labelledby="faq-head">
      ${sectionHead(t.sections.faq, 'faq')}
      <div class="faq-list">
        ${t.faq.map((f, i) => `<details class="card card-faq"${i === 0 ? ' open' : ''}>
          <summary><span>${esc(f.q)}</span><span class="faq-mark" aria-hidden="true"></span></summary>
          <p>${esc(f.a)}</p>
        </details>`).join('\n        ')}
      </div>
    </section>`;
}

function contact(t) {
  const a = t.availability;
  return `<section class="section" id="contact" aria-labelledby="contact-head">
      <div class="card card-contact" data-accent="1">
        ${spark('spark-c')}${spark('spark-d')}
        ${kicker(t.sections.contact.kicker)}
        <h2 class="section-title" id="contact-head">${esc(t.sections.contact.title)}</h2>
        <p class="section-lede">${esc(t.sections.contact.lede)}</p>

        <div class="contact-grid">
          ${t.contactCards.map((c, i) => `<a class="contact-card" data-accent="${i + 1}" href="${esc(c.href)}"${c.href.startsWith('http') ? EXT : ''}>
            <span class="contact-icon" aria-hidden="true">${icon(c.icon)}</span>
            <span class="contact-meta">
              <small>${esc(c.label)}</small>
              <strong dir="${c.label === 'الإيميل' || c.label === 'Email' ? 'ltr' : 'auto'}">${esc(c.value)}${c.href.startsWith('http') ? srNewTab(t) : ''}</strong>
            </span>
          </a>`).join('\n          ')}
        </div>

        <div class="availability">
          <div class="availability-block">
            <h3>${esc(a.title)}</h3>
            <ul class="chip-row">${a.types.map((x) => `<li class="chip chip-solid" dir="ltr">${esc(x)}</li>`).join('')}</ul>
          </div>
          <div class="availability-block">
            <h3>${esc(a.marketsTitle)}</h3>
            <ul class="chip-row">${a.markets.map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul>
          </div>
        </div>

        <button class="btn btn-ghost btn-sm" id="copy-email" type="button" data-email="${LINKS.email}" data-copied="${esc(t.copied)}" data-failed="${esc(t.copyFailed)}">
          ${icon('copy')}<span>${esc(t.copyEmail)}</span>
        </button>
      </div>
    </section>`;
}

function footer(t) {
  return `<footer class="footer">
    <div class="footer-inner">
      <p class="footer-note">${esc(t.footerNote)}</p>
      <nav class="footer-links" aria-label="${esc(t.footerLinks)}">
        ${SOCIALS.map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer me">${esc(s.label)}${srNewTab(t)}</a>`).join('\n        ')}
      </nav>
      <p class="footer-meta">
        <span>${esc(t.lastUpdated)}: <time datetime="${SITE.updated}">${SITE.updated}</time></span>
        <a href="#top">${esc(t.backToTop)}</a>
      </p>
    </div>
  </footer>`;
}

/* ----------------------------------------------------------------- page ---- */

function page(t) {
  const js = t.code === 'ar' ? '../assets/site.js' : 'assets/site.js';
  return `<!DOCTYPE html>
<html lang="${t.htmlLang}" dir="${t.dir}" data-locale="${t.code}">
<head>
  ${head(t)}
</head>
<body>
  <a class="skip-link" href="#main">${esc(t.skip)}</a>
  ${header(t)}

  <main id="main">
    ${hero(t)}
    ${stats(t)}
    ${marquee(t)}
    ${capabilities(t)}
    ${builds(t)}
    ${stack(t)}
    ${method(t)}
    ${background(t)}
    ${faq(t)}
    ${contact(t)}
  </main>

  ${footer(t)}
  <script src="${js}" defer></script>
</body>
</html>
`;
}

const targets = [
  { locale: LOCALES.en, out: join(here, 'index.html') },
  { locale: LOCALES.ar, out: join(here, 'ar', 'index.html') },
];

for (const { locale, out } of targets) {
  mkdirSync(dirname(out), { recursive: true });
  const html = page(locale);
  writeFileSync(out, html, 'utf8');
  console.log(`built ${locale.code.padEnd(2)} -> ${out.replace(here, 'portfolio')} (${(html.length / 1024).toFixed(1)} kB)`);
}
