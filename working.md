# Project: UI Polish & Frontend Engineering Standards

## Overview
Production-ready standards, design tokens, and automated tooling for UI polish, WCAG accessibility, SEO/AEO/GEO semantic structure, Core Web Vitals, conversion copywriting, and multilingual AI slop detection.

## Project Structure
```text
uiux/
├── .agents/skills/ui-polish/
│   ├── SKILL.md                 # Lean Module Router & 25-Point Master Pre-flight Checklist
│   ├── playground.html          # Interactive in-browser visual tester (radii, buttons, AI slop)
│   ├── assets/
│   │   └── tokens.css           # Plug-and-play CSS variables (8pt, radius, light/dark WCAG colors)
│   ├── components/              # Ready-to-copy accessible production components
│   │   ├── button.html          # 5-state button with micro-motion & :focus-visible
│   │   ├── card.html            # Concentric radius card with 1px alpha border
│   │   ├── accordion.html       # AEO direct-answer disclosure pattern
│   │   ├── breadcrumb.html      # WCAG accessible breadcrumb with Schema.org JSON-LD
│   │   ├── schemas.html         # Schema.org JSON-LD presets (Org, WebSite, FAQPage)
│   │   └── HeadingProvider.tsx  # React Context auto-incrementing heading levels
│   ├── references/              # 14 Modular Deep-Dive Standards
│   │   ├── headings.md          # Semantic outline, keyword allocation & SEO/AEO/GEO
│   │   ├── spacing.md           # 8pt grid scale & container padding hierarchy
│   │   ├── radius.md            # Concentric radius formula & subtle elevation
│   │   ├── contrast.md          # WCAG 2.2 AA contrast & design tokens (light & dark mode)
│   │   ├── motion.md            # 5-state buttons, 60fps transitions & focus-visible
│   │   ├── layout.md            # Zero-CLS aspect ratios & typography wrapping
│   │   ├── ai-slop.md           # Universal multilingual AI slop detection (6+ languages)
│   │   ├── fingerprints.md      # Em-dash, triads & trailing participial puffery
│   │   ├── speed.md             # Page speed, Core Web Vitals (LCP/INP/CLS) & lazy loading
│   │   ├── copy.md              # Hero formulas, "Now You Can" test, Human Action Model, CTA & FAB
│   │   ├── duplicate-content.md # Cross-page duplicate text, canonicals & title/H1 collision
│   │   ├── linking.md           # Internal linking, topic clusters, link equity & orphan page check
│   │   ├── trust.md             # E-E-A-T trust signals, legal pages & copyright verification
│   │   └── schema.md            # Schema.org JSON-LD rich snippets (Org, FAQ, Article, Product)
│   └── scripts/
│       └── audit-ui.mjs         # Fast CLI auditor with duplicate detection, link graph, trust & schema
├── docs/superpowers/plans/      # Feature implementation specs & plans
└── working.md                   # Project operational context and architecture
```

## How It Works
- **10 Modular Pillars:** Covers 8pt spacing rhythm, concentric border radius, WCAG 2.2 AA contrast, 60fps micro-interactions, zero-CLS layout stability, SEO/AEO/GEO heading hierarchy, web performance/vitals, and high-converting copy.
- **Conversion Copywriting Standard (`copy.md`):**
  - **"Now You Can" Test:** Verifies that prepending *"Now you can..."* turns the hero into a tangible customer superpower.
  - **Human Action Model:** Hero structure follows *Discomfort (pain) ➔ Vision (outcome) ➔ Path to Action (CTA)*.
  - **Negation List Ban:** Prohibits chains of 3+ defensive negative clauses (*"No setup, no IT, no contracts"*); enforces positive capability claims.
  - **Action + Value CTAs & Trust Anchors:** Eliminates lazy labels ("Submit"); places 1-line friction reducers below buttons.
- **Multilingual AI Slop & Fingerprint Detection:** Automatically scans UI copy across English, Bengali, Hindi, Spanish, French, and German for banned buzzwords, binary contrasts, em-dash overuse, and rule-of-three triads.
- **Automated CLI Auditing (`audit-ui.mjs`):** Audits HTML, JSX, TSX, Vue templates, or live URLs with automatic `--fix` support.

## Usage & Execution
- **System-Wide Global CLI Command:** Run `ui-polish <file-or-dir> [--fix]` directly from any terminal anywhere on the computer (powered by `~/.gemini/antigravity/bin/ui-polish.cmd`).
- **Locally Active:** Available in `.agents/skills/ui-polish` and `.gemini/skills/ui-polish`.
- **Globally Installed:** Registered in both global roots:
  - `~/.gemini/config/skills/ui-polish`
  - `~/.gemini/antigravity/skills/ui-polish`
