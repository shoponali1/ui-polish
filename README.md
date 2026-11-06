# ✨ UI Polish

> **The Production-Grade Frontend Engineering, Accessibility, SEO & UI Audit Engine.**  
> Zero-dependency CLI, concentric geometry tokens, multilingual AI-slop detection, and automated `--fix` with safety backups.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Node.js)-brightgreen.svg)]()
[![SEO & AEO](https://img.shields.io/badge/Search-Google%20%7C%20Perplexity%20%7C%20Bing-orange.svg)]()
[![Multilingual](https://img.shields.io/badge/Languages-EN%20%7C%20BN%20%7C%20HI%20%7C%20ES%20%7C%20FR%20%7C%20DE-blueviolet.svg)]()

---

## 🌟 Why UI Polish?

Modern web interfaces often suffer from death by a thousand papercuts: **broken heading outlines that confuse search engines**, **non-concentric border radii**, **hardcoded colors that disappear in dark mode**, **lazy "Submit" buttons**, **repetitive duplicate content**, and **generic AI-generated fluff**.

**UI Polish** solves this with a unified 14-pillar engineering framework, ready-to-copy accessible components, and a lightning-fast CLI auditor that repairs common mistakes automatically.

---

## ⚡ Quick Start

### 1. Install & Run via CLI

You can audit any local file, component directory, or **live website URL**:

```bash
# Run globally with npx (zero installation required)
npx github:shoponali1/ui-polish index.html

# Audit a single HTML, JSX, TSX, Vue, Svelte, or Astro file
ui-polish index.html
ui-polish src/App.tsx
ui-polish src/Header.vue
ui-polish src/Card.svelte

# Audit an entire folder and cross-check for duplicate content & orphan pages
ui-polish src/components

# Audit and automatically repair common issues (with .bak safety backup)
ui-polish index.html --fix
ui-polish src/App.tsx --fix

# Audit a live website with network TTFB and speed telemetry
ui-polish https://example.com

# Export structured reports for CI/CD pipelines
ui-polish index.html --json
ui-polish src/components --markdown
```

*(Note: If you don't install the global command, you can always run the script directly via Node.js on any file or folder: `node .agents/skills/ui-polish/scripts/audit-ui.mjs <file-or-dir>`)*

### 2. Install into AI Coding Agents

UI Polish follows the universal Agent Skills standard and integrates natively with all leading autonomous coding agents:

#### 🪐 Google Antigravity (`agy` CLI & IDE)
Install globally or per-project into Antigravity:
```bash
# Global install via Antigravity CLI
agy skills add shoponali1/ui-polish

# Or via universal npx skills manager
npx skills add shoponali1/ui-polish -g -y
```

#### ♊ Gemini CLI
Install into Google Gemini CLI developer environment:
```bash
# Install via Gemini CLI
gemini skills add shoponali1/ui-polish

# Or clone directly into your global Gemini skills root
git clone https://github.com/shoponali1/ui-polish.git ~/.gemini/skills/ui-polish
```

#### 🟣 Claude Code (Anthropic)
Install natively into Anthropic's Claude Code CLI:
```bash
# Install via Claude Code skills manager
npx skills add shoponali1/ui-polish

# Or install globally across all Claude sessions
npx skills add shoponali1/ui-polish -g -y
```

#### 🧠 Hermes Agent (Nous Research)
Integrate with Hermes autonomous agent workflows:
```bash
# Install via Hermes skill package manager
hermes skills add shoponali1/ui-polish

# Or clone into local project agent tools
git clone https://github.com/shoponali1/ui-polish.git .agents/skills/ui-polish
```

#### 🦅 OpenClaw
Install into OpenClaw autonomous workflows:
```bash
# OpenClaw skill installation
openclaw skills add shoponali1/ui-polish
```

#### ⚡ Cursor (Agent Mode & Composer)
Add UI Polish standards directly to your Cursor workspace:
```bash
# Clone into workspace agent skills
git clone https://github.com/shoponali1/ui-polish.git .agents/skills/ui-polish

# Or reference in .cursorrules:
# "Follow UI Polish standards in .agents/skills/ui-polish/SKILL.md and run ui-polish index.html --fix"
```

#### 🌊 Windsurf (Codeium Cascade)
Add UI Polish to Windsurf workspace:
```bash
# Clone into project skills directory
git clone https://github.com/shoponali1/ui-polish.git .agents/skills/ui-polish
```

#### 🤖 Cline & Roo Code (VS Code Autonomous Agents)
Install into Cline or Roo Code for autonomous UI repairing:
```bash
# Install globally via npx
npx skills add shoponali1/ui-polish -g -y

# Or add to your workspace .clinerules / .roomodes
```

#### 💻 Aider (Terminal AI Pair Programmer)
Give Aider the complete UI Polish rulebook during coding sessions:
```bash
# Run Aider with UI Polish loaded into context
aider --read .agents/skills/ui-polish/SKILL.md
```

#### 🔌 Continue.dev (VS Code & JetBrains)
Load UI Polish standards into Continue.dev:
```bash
# Clone into your local workspace
git clone https://github.com/shoponali1/ui-polish.git .agents/skills/ui-polish
```

#### 🌐 OpenHands (All-Hands AI / OpenDevin)
Equip OpenHands autonomous software engineering agents:
```bash
# Install into OpenHands agent workspace
git clone https://github.com/shoponali1/ui-polish.git .agents/skills/ui-polish
```

---

## 🏛️ The 14 Modular Engineering Pillars

UI Polish provides deep-dive specifications for every aspect of frontend craft:

| Pillar | Focus Area | Reference Guide |
| :--- | :--- | :--- |
| **1. Semantic Headings & SEO** | Exactly one `<h1>`, sequential hierarchy (`H1 -> H2 -> H3`), keyword distribution, AEO direct answers | [`references/headings.md`](.agents/skills/ui-polish/references/headings.md) |
| **2. 8pt Spacing Rhythm** | Strict 4px/8px geometry scale, outer container padding > inner child gaps | [`references/spacing.md`](.agents/skills/ui-polish/references/spacing.md) |
| **3. Concentric Radius & Elevation** | True optical corners ($R_{outer} = R_{inner} + \text{padding}$), 1px subtle alpha borders | [`references/radius.md`](.agents/skills/ui-polish/references/radius.md) |
| **4. Contrast & Dark Mode** | WCAG 2.2 AA (4.5:1 text, 3:1 UI), dual semantic CSS variables, FOUC white-flash elimination | [`references/contrast.md`](.agents/skills/ui-polish/references/contrast.md) |
| **5. 60fps Micro-Interactions** | 5-state matrix (`default`, `hover`, `active:scale-[0.98]`, `:focus-visible`, `disabled`) | [`references/motion.md`](.agents/skills/ui-polish/references/motion.md) |
| **6. Zero-CLS Responsive Layout** | Aspect-ratio containers, layout stability placeholders, `text-wrap: balance` | [`references/layout.md`](.agents/skills/ui-polish/references/layout.md) |
| **7. Multilingual AI Slop** | Detects banned buzzwords (*streamline, empower, যুগান্তকারী, বিপ্লবী*), binary contrasts, and throat-clearing | [`references/ai-slop.md`](.agents/skills/ui-polish/references/ai-slop.md) |
| **8. AI Writing Fingerprints** | Bans em-dash over-gluing (`—`), rule-of-three triads, and trailing `-ing` puffery | [`references/fingerprints.md`](.agents/skills/ui-polish/references/fingerprints.md) |
| **9. Page Speed & Vitals** | LCP < 2.5s preload, non-blocking JS (`defer`), font FOIT elimination (`&display=swap`), lazy loading | [`references/speed.md`](.agents/skills/ui-polish/references/speed.md) |
| **10. Conversion Copywriting** | Hero formulas, the "Now You Can" 1-second test, Human Action Model, Action+Value CTAs | [`references/copy.md`](.agents/skills/ui-polish/references/copy.md) |
| **11. Duplicate Content Prevention** | Verbatim cross-page paragraph matching, Jaccard vocabulary similarity, self-referential canonicals | [`references/duplicate-content.md`](.agents/skills/ui-polish/references/duplicate-content.md) |
| **12. Page-to-Page Internal Linking**| Internal link graph, topic cluster hierarchy, orphan page detection, broken relative link alerts | [`references/linking.md`](.agents/skills/ui-polish/references/linking.md) |
| **13. E-E-A-T Trust Signals** | Legal trust pages (Privacy, Terms, Contact), verifiable social proof, current-year copyright | [`references/trust.md`](.agents/skills/ui-polish/references/trust.md) |
| **14. Schema.org JSON-LD** | Rich snippets for `Organization`, `WebSite`, `FAQPage`, `Article`, and `Product` | [`references/schema.md`](.agents/skills/ui-polish/references/schema.md) |

---

## 🛠️ CLI Features & Capabilities

```text
======================================================
 📋 UI Polish, Speed & Hallmark Audit: index.html
======================================================

Detected Document Heading Outline:
• <h1> Deploy PostgreSQL Globally in 5 Seconds
  • <h2> Automated Backups and Instant Failover
    • <h3> How does zero-downtime migration work?

Results:
  ✅ [PASS] Exactly one <h1> tag found: "Deploy PostgreSQL Globally..."
  ✅ [PASS] Self-referential canonical URL detected: "https://example.com/"
  ✅ [PASS] Valid Schema.org JSON-LD detected: @type "Organization"
  ✅ [PASS] Current copyright year detected: "© 2026"
  ✅ [PASS] Dual theme support detected (Dark & Light Mode architecture present).

======================================================
 🌐 Cross-Page Duplicate Content & Collision Audit
======================================================
  ✅ [PASS] No cross-page duplicate content or title/H1 collisions detected!

======================================================
 🔗 Page-to-Page Internal Link Graph & Equity Matrix
======================================================
  ✅ index.html        Incoming: 3   | Outgoing: 4 link(s)
  ✅ services.html     Incoming: 2   | Outgoing: 3 link(s)
  🚨 [ORPHAN PAGE] secret.html       Incoming: 0   | Outgoing: 1 link(s)
```

### Safe Auto-Fix Mode (`--fix`)

When run with `--fix`, UI Polish safely repairs common technical issues **without touching your layout, text copy, or CSS classes**:
1. Injects `&display=swap` into Google Font links to prevent font-blocking FOIT.
2. Changes layout-breaking `overflow-x: hidden` to `overflow-x: clip`.
3. Adds `loading="lazy"` to below-the-fold media and `fetchpriority="high"` to hero LCP images.
4. Adds `defer` to synchronous blocking `<script>` tags.
5. Injects missing `<link rel="canonical" href="...">` and `<meta name="color-scheme" content="light dark">`.
6. Adds `aria-label="Toggle dark mode"` to theme buttons.
7. Updates outdated copyright years (e.g. `© 2019` ➔ `© 2026`).
8. Injects foundational Schema.org `WebSite` JSON-LD if missing.

> **100% Safety Guard:** Before modifying any file, `--fix` automatically saves a safety backup file (`<filename>.bak`). You can revert with a single click at any time.

---

## 🎨 Design Tokens & Components

UI Polish includes copy-paste accessible UI primitives:

- **[`playground.html`](.agents/skills/ui-polish/playground.html):** Live in-browser tester for radius math, button states, and multilingual AI slop.
- **[`assets/tokens.css`](.agents/skills/ui-polish/assets/tokens.css):** Production CSS variables for 8pt spacing, concentric radii, and WCAG AA palettes.
- **[`components/button.html`](.agents/skills/ui-polish/components/button.html):** Accessible 5-state button with `active:scale-[0.98]` and `:focus-visible`.
- **[`components/card.html`](.agents/skills/ui-polish/components/card.html):** Concentric border-radius card with 1px alpha border.
- **[`components/breadcrumb.html`](.agents/skills/ui-polish/components/breadcrumb.html):** Accessible breadcrumbs with Schema.org JSON-LD microdata.
- **[`components/accordion.html`](.agents/skills/ui-polish/components/accordion.html):** AEO direct-answer disclosure pattern with zero layout thrash.
- **[`components/schemas.html`](.agents/skills/ui-polish/components/schemas.html):** Ready-to-copy JSON-LD templates (Organization, WebSite, FAQPage).
- **[`components/HeadingProvider.tsx`](.agents/skills/ui-polish/components/HeadingProvider.tsx):** React Context provider automatically preventing skipped heading levels.

---

## 📂 Project Structure

```text
ui-polish/
├── .agents/skills/ui-polish/
│   ├── SKILL.md                 # 30-Point Master Pre-flight Checklist & Router
│   ├── playground.html          # Interactive in-browser visual tester
│   ├── assets/
│   │   └── tokens.css           # Production design tokens (8pt, radius, light/dark)
│   ├── components/              # Ready-to-use accessible UI components
│   │   ├── button.html          # 5-state button with micro-motion & focus-visible
│   │   ├── card.html            # Concentric radius card with 1px alpha border
│   │   ├── breadcrumb.html      # Breadcrumb navigation with Schema.org JSON-LD
│   │   ├── accordion.html       # FAQ accordion disclosure pattern
│   │   ├── schemas.html         # Schema.org JSON-LD template snippets
│   │   └── HeadingProvider.tsx  # React context auto-incrementing heading levels
│   ├── references/              # 14 Modular Technical Standards
│   │   ├── headings.md          # Headings, keywords & AEO/GEO snippets
│   │   ├── spacing.md           # 8pt scale & container padding hierarchy
│   │   ├── radius.md            # Concentric radius formula & subtle elevation
│   │   ├── contrast.md          # WCAG 2.2 AA contrast & dual-theme tokens
│   │   ├── motion.md            # 60fps micro-interactions & transitions
│   │   ├── layout.md            # Zero-CLS layout stability & typography
│   │   ├── ai-slop.md           # Multilingual AI slop & banned buzzwords
│   │   ├── fingerprints.md      # Em-dash overuse, triads & trailing puffery
│   │   ├── speed.md             # Core Web Vitals, LCP preload & lazy loading
│   │   ├── copy.md              # Hero formulas, "Now You Can" test & CTAs
│   │   ├── duplicate-content.md # Verbatim text blocks & canonicalization
│   │   ├── linking.md           # Internal linking, topic clusters & orphan pages
│   │   ├── trust.md             # E-E-A-T trust signals & essential trust pages
│   │   └── schema.md            # Schema.org JSON-LD structured data
│   └── scripts/
│       └── audit-ui.mjs         # Fast CLI auditor with --fix & CI/CD exports
├── README.md                    # This documentation
└── working.md                   # Operational architecture context
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you want to add new language rules for AI slop detection, new design tokens, or framework-specific plugins (Next.js, Astro, Nuxt, SvelteKit).

---

## 📄 License

Licensed under the [MIT License](LICENSE).  
Crafted with precision for web developers, designers, and AI coding agents.
