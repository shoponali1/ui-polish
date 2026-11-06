---
name: ui-polish
description: Use when designing, building, auditing, or polishing user interfaces, web components, or HTML/CSS layouts. Triggers on "review my UI", "polish this screen", "check accessibility", "fix dark mode", "audit SEO headings", "page speed optimization", "improve CTA copy", "check duplicate content", or detecting AI slop.
---

# UI Polish: The Production-Ready Semantic & Visual Framework

## Overview
A polished digital product is not just "good-looking"—it is architecturally sound, semantically accessible, lightning-fast, and pleasant to interact with.

**UI Polish** is organized into 14 modular pillars. When implementing or reviewing UI code, use the **Module Router** below to navigate to the exact reference document required:

---

## Quick Navigation & Module Router

| Topic | Focus Area | Reference File |
| :--- | :--- | :--- |
| **Headings & SEO** | H1-H6 hierarchy, keyword matrix, AEO direct answers, GEO chunks | [`references/headings.md`](references/headings.md) |
| **Spacing & Geometry** | 8pt grid scale, container vs child padding hierarchy, optical alignment | [`references/spacing.md`](references/spacing.md) |
| **Radius & Elevation** | Concentric border radius formula ($R_o = R_i + P$), 1px alpha borders | [`references/radius.md`](references/radius.md) |
| **Color Contrast & Tokens** | WCAG 2.2 AA (4.5:1 / 3:1), light & dark mode semantic CSS variables | [`references/contrast.md`](references/contrast.md) |
| **Micro-Interactions** | 5-state matrix, 60fps transform/opacity transitions, focus-visible | [`references/motion.md`](references/motion.md) |
| **Responsive & Zero-CLS** | Aspect-ratio containers, text-wrap balance/pretty, layout stability | [`references/layout.md`](references/layout.md) |
| **Multilingual AI Slop** | Universal binary contrasts, throat-clearing, banned buzzwords (6+ languages) | [`references/ai-slop.md`](references/ai-slop.md) |
| **AI Fingerprints** | Em-dash overuse, rule-of-three triads, trailing -ing puffery, low burstiness | [`references/fingerprints.md`](references/fingerprints.md) |
| **Page Speed & Vitals** | LCP < 2.5s, INP < 200ms, CLS < 0.1, render-blocking JS, font FOIT, lazy load | [`references/speed.md`](references/speed.md) |
| **Conversion Copywriting** | Hero formulas, Action+Value CTAs ("Submit" banned), Trust anchors, FAB specs | [`references/copy.md`](references/copy.md) |
| **Duplicate Content & SEO** | Cross-page paragraph matching, canonicalization, title/meta collision prevention | [`references/duplicate-content.md`](references/duplicate-content.md) |
| **Internal Linking & IA** | Page-to-page link graph, topic clusters, orphan page prevention, descriptive anchors | [`references/linking.md`](references/linking.md) |
| **E-E-A-T Trust Signals** | Privacy, terms, contact pages, active copyright year, transparent guarantees | [`references/trust.md`](references/trust.md) |
| **Structured Data & Schema** | Schema.org JSON-LD (Organization, WebSite, FAQPage, Article, Product) rich snippets | [`references/schema.md`](references/schema.md) |

---

## Core Rules Cheat Sheet

1. **Headings:** Exactly **one** `<h1>` per page. Never skip levels downwards (`H1 -> H2 -> H3`).
2. **Keywords:** Primary entity in H1, secondary/LSI in H2s, long-tail and FAQs in H3s.
3. **Spacing:** All margins/paddings on an 8pt scale (`8px`, `16px`, `24px`, `32px`). Container padding > inner child gap.
4. **Corners:** Inner card $R$ + padding = Outer container $R$.
5. **Contrast:** Body copy $\ge$ 4.5:1, interactive elements $\ge$ 3.0:1.
6. **Interactions:** Every clickable element must have 5 states (`default`, `hover`, `active:scale-[0.98]`, `:focus-visible`, `disabled`).
7. **Performance & Speed:** **ONLY** animate `transform` and `opacity` ($\le$ 250ms). Never animate width/height/margin. Defer non-critical JS.
8. **Web Vitals:** Preload hero LCP image, lazy-load below fold (`loading="lazy"`), use `font-display: swap`.
9. **Dark & Light Mode:** Never hardcode `#000` text in dark-capable UIs. Use CSS variables or `dark:` tokens. Prevent FOUC with `<meta name="color-scheme" content="light dark">`.
10. **Conversion Copy & CTAs:** Never write "Submit" or "Click here". Use `[Action Verb] + [Specific Value]` ("Claim Free Account"). Add a 1-line trust anchor below the button.
11. **No AI Slop / Fingerprints:** Zero banned buzzwords, no binary contrasts (*"Not X, but Y"*), no em-dash glueing, no triadic lists.
12. **Cross-Page Duplicate Content:** Every public page MUST declare an absolute `<link rel="canonical" href="...">`. No verbatim text blocks ($\ge 15$ words), `<title>`, or `<h1>` may be duplicated across pages.
13. **Internal Linking & Zero Orphans:** Every indexable page must have 1-3 internal incoming links. Never use generic anchor text (*"click here"*, *"read more"*).
14. **E-E-A-T & Trust Pages:** Sites must include accessible Privacy, Terms, and Contact pathways, plus dynamic current-year copyright notices.
15. **Schema.org Structured Data:** Pages must declare valid JSON-LD (`Organization`, `WebSite`, `FAQPage`, etc.) matching on-page content.

---

## Ecosystem Toolkit & Assets

| Asset / Tool | Description | File Path |
| :--- | :--- | :--- |
| **Interactive Playground** | Live in-browser tester for radius math, button states, and AI slop | [`playground.html`](playground.html) |
| **Design Tokens Preset** | Production CSS variables for 8pt grid, concentric radii, and WCAG palettes | [`assets/tokens.css`](assets/tokens.css) |
| **Polished Button** | 5-state accessible button with `active:scale-[0.98]` and `:focus-visible` | [`components/button.html`](components/button.html) |
| **Concentric Card** | Concentric border-radius card with 1px alpha border | [`components/card.html`](components/card.html) |
| **Accessible Breadcrumb**| Accessible breadcrumb with Schema.org JSON-LD microdata | [`components/breadcrumb.html`](components/breadcrumb.html) |
| **JSON-LD Schema Presets**| Ready-to-copy Schema.org JSON-LD snippets (Org, WebSite, FAQPage) | [`components/schemas.html`](components/schemas.html) |
| **FAQ Accordion** | AEO direct-answer disclosure pattern with zero layout thrash | [`components/accordion.html`](components/accordion.html) |
| **React Heading Provider**| Context provider automatically preventing skipped heading levels | [`components/HeadingProvider.tsx`](components/HeadingProvider.tsx) |

---

## Automated CLI Auditor Tool

Audit any HTML, JSX, TSX, Vue template, or **live website URL** for heading hierarchy, speed/CLS risks, and multilingual AI fingerprints:

```bash
# Audit a local file or directory
ui-polish index.html
ui-polish src/components

# Automatically repair common HTML/CSS issues (--fix)
ui-polish index.html --fix

# Output structured reports for CI/CD pipelines
ui-polish index.html --json
ui-polish index.html --markdown

# Audit a live website URL (measuring TTFB, size, and speed bottlenecks)
ui-polish https://example.com
```

---

## Master UI Polish Pre-Flight Checklist

Before marking any UI task complete, verify against these 25 points:

- [ ] **1. Heading Uniqueness:** There is exactly **one** `<h1>` tag representing the page topic.
- [ ] **2. Heading Sequence:** Heading tags descend sequentially (`H1 -> H2 -> H3`) with no skipped levels.
- [ ] **3. Keyword Alignment:** Primary keyword is front-loaded in H1; secondary/LSI keywords are in H2s; FAQs/long-tail in H3s.
- [ ] **4. AEO/GEO Snippets:** Key question headings are followed immediately by concise, fact-dense direct answer summaries.
- [ ] **5. Page Speed - Non-Blocking JS:** Scripts in `<head>` use `defer`, `async`, or `type="module"`.
- [ ] **6. Page Speed - Media Optimization:** Images use WebP/AVIF formats and below-the-fold media has `loading="lazy"`.
- [ ] **7. Page Speed - Font FOIT:** External font links include `display=swap` and preconnect tags.
- [ ] **8. Zero CLS:** All images and dynamic media have defined aspect ratios or dimensional placeholders.
- [ ] **9. No AI Slop Copy:** Zero banned buzzwords (*streamline, delve, empower, leverage, robust, cutting-edge, যুগান্তকারী, বিপ্লবী*) in headings or buttons.
- [ ] **10. Concrete Mechanisms:** UI text avoids binary contrasts (*"Not X, but Y"*) and states concrete benefits/metrics.
- [ ] **11. Zero AI Fingerprints:** No em-dash (`—`) over-gluing, no symmetrical triads (*A, B, and C*), and no trailing `-ing` puffery (*highlighting*, *underscoring*).
- [ ] **12. The "Now You Can" Test:** Prepending *"Now you can..."* to the hero headline forms a natural sentence describing a tangible superpower.
- [ ] **13. Human Action Model:** Hero section follows *Discomfort (pain) ➔ Vision (outcome) ➔ Path to Action (CTA)*.
- [ ] **14. Negation List Ban:** No chains of 3+ negative clauses (*"No setup, no IT, no contracts"*); copy states what *does* happen positively.
- [ ] **15. High-Converting CTAs:** Action + Value formula (*"Claim Free Account"* instead of *"Submit"*).
- [ ] **16. 8pt Spacing Grid:** Margins and paddings adhere strictly to the 4px/8px scale.
- [ ] **17. Container Hierarchy:** Outer container padding is larger than inner element gaps.
- [ ] **18. Concentric Radiuses:** Nested corner radiuses follow the `R_outer = R_inner + padding` formula.
- [ ] **19. Subtle Elevation:** Borders use subtle alpha borders (`rgba(0,0,0,0.08)`) rather than heavy black shadows.
- [ ] **20. WCAG Contrast:** Body copy achieves at least 4.5:1 contrast; buttons and form controls reach 3.0:1.
- [ ] **21. Interactive States:** Clickables have distinct default, hover, active (`scale(0.98)`), and `:focus-visible` styles.
- [ ] **22. Motion Performance:** Only `transform` and `opacity` are animated with durations <= 250ms.
- [ ] **23. Reduced Motion:** `@media (prefers-reduced-motion: reduce)` is respected.
- [ ] **24. Typography Wrapping:** Headings use `text-wrap: balance` and body text length is capped (`max-w-prose`).
- [ ] **25. Canonical Tag Declaration:** Every public page includes a self-referential `<link rel="canonical" href="...">` in `<head>`.
- [ ] **26. Zero Cross-Page Duplication:** Unique `<title>`, `<meta name="description">`, and `<h1>` across all pages with zero verbatim shared copy blocks ($\ge 15$ words).
- [ ] **27. Page-to-Page Internal Linking:** Every page has $\ge 1-3$ incoming internal links (zero orphan pages) and anchor text is descriptive.
- [ ] **28. E-E-A-T Trust Pages & Signals:** Accessible Privacy, Terms, and Contact pathways are present; copyright displays current year ($2026$).
- [ ] **29. Schema.org JSON-LD:** Valid structured data declared (`Organization`, `WebSite`, `FAQPage`, etc.) matching page content with zero syntax errors.
- [ ] **30. Total Budget:** Initial page weight strictly under 1.5MB.
