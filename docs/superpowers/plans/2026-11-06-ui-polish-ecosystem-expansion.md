# ui-polish: Complete Ecosystem Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand `ui-polish` into a complete end-to-end design and developer ecosystem by adding: (1) CLI Auto-Fix Mode (`--fix`), (2) Drop-in CSS Design Tokens (`assets/tokens.css`), (3) Production-Ready Accessible Component Snippets (`components/`), (4) An Interactive Visual Playground (`playground.html`), and (5) CI/CD JSON/Markdown report exports.

**Architecture:**
- **Tooling Upgrade:** Extend `scripts/audit-ui.mjs` with `--fix` (auto-patching common HTML/CSS issues like `overflow-x: clip`, glued arrows, missing `loading="lazy"`, un-deferred scripts) and `--json` / `--markdown` output flags.
- **Design Token Assets:** Create `assets/tokens.css` with zero-runtime CSS custom properties for 8pt spacing, concentric radii, WCAG surface palettes, and motion timings.
- **Component Library:** Build copy-pasteable, zero-slop components in `components/` (`Button`, `Card`, `Accordion`, and a React `HeadingProvider` context).
- **Interactive Playground:** Author a self-contained, offline-first `playground.html` featuring interactive Before/After toggles, a concentric radius slider, and an in-browser AI-slop tester.

**Tech Stack:** JavaScript (Node.js ESM), CSS Custom Properties, Semantic HTML5, Tailwind CSS utilities.

**Spec:** `.agents/skills/ui-polish/SKILL.md`

## Global Constraints

- All additions must maintain 100% backward compatibility with existing reference documents.
- The `audit-ui.mjs` script remains zero-dependency and runnable natively with Node.js.
- Perfect 3-way synchronization between `.agents/skills/ui-polish`, `.gemini/skills/ui-polish`, and `~/.gemini/config/skills/ui-polish`.

## Review Focus

1. Safe Auto-Fixer: The `--fix` mode must never corrupt valid HTML or break existing application logic.
2. Production Token Portability: `tokens.css` must work seamlessly in raw HTML, Next.js, Vite, and Astro projects.
3. Component Polish: Every component must pass all 24 points of the Master Pre-Flight Checklist out of the box.
4. Playground Interactivity: Smooth 60fps animations and instant visual feedback without external CDN dependencies.

---

### Task 1: Add Auto-Fixer (`--fix`) & CI/CD Report Flags to `audit-ui.mjs`

**Files:**
- Modify: `.agents/skills/ui-polish/scripts/audit-ui.mjs`

- [ ] Add `--fix` command-line flag logic.
- [ ] Implement auto-fixes for local HTML files:
  - Replace `overflow-x: hidden` with `overflow-x: clip`.
  - Add `loading="lazy"` and `decoding="async"` to below-the-fold images missing loading attributes.
  - Add `defer` to parser-blocking `<script src="...">` tags in `<head>`.
  - Strip glued arrows (`Text →` -> `Text`) in `<a>` tags.
  - Append `&display=swap` to Google Fonts links lacking swap parameters.
- [ ] Add `--json` and `--markdown` output formatting for CI/CD pipelines.

### Task 2: Build Drop-in Production Design Token Asset (`assets/tokens.css`)

**Files:**
- Create: `.agents/skills/ui-polish/assets/tokens.css`

- [ ] Implement 8pt spacing rhythm tokens (`--space-1` to `--space-24`).
- [ ] Implement concentric border-radius tokens (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`).
- [ ] Implement light and dark mode WCAG AA accessible color palettes (Canvas, Surface, Border, Text Primary, Secondary, Muted).
- [ ] Implement micro-motion timing tokens (`--ease-snappy: cubic-bezier(0.16, 1, 0.3, 1)`).
- [ ] Implement `@media (prefers-reduced-motion: reduce)` zero-duration resets.

### Task 3: Create Ready-to-Copy Component Snippet Library (`components/`)

**Files:**
- Create: `.agents/skills/ui-polish/components/button.html`
- Create: `.agents/skills/ui-polish/components/card.html`
- Create: `.agents/skills/ui-polish/components/accordion.html`
- Create: `.agents/skills/ui-polish/components/HeadingProvider.tsx`

- [ ] `button.html`: 5-state polished button with `active:scale-[0.98]` and custom `:focus-visible`.
- [ ] `card.html`: Concentric radius card with 1px alpha border and ambient elevation.
- [ ] `accordion.html`: AEO direct-answer disclosure pattern with zero layout thrash.
- [ ] `HeadingProvider.tsx`: React Context provider that auto-increments heading depth (`H1 -> H2 -> H3`) so levels can never be skipped.

### Task 4: Author the Single-File Interactive Playground (`playground.html`)

**Files:**
- Create: `.agents/skills/ui-polish/playground.html`

- [ ] Build a sleek, modern visual interface with zero external CDN dependencies.
- [ ] Add "Unpolished vs Polished" live side-by-side toggle.
- [ ] Add an interactive Concentric Radius Calculator slider.
- [ ] Add a live in-browser Multilingual AI Slop & Fingerprint Tester input box with instant highlighting.

### Task 5: Update Documentation, Router & Global Sync

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`
- Modify: `working.md`
- Sync: `.agents/skills/ui-polish/` -> `.gemini/skills/ui-polish/` & `~/.gemini/config/skills/ui-polish/`

- [ ] Update `SKILL.md` with components and playground shortcuts.
- [ ] Update `working.md` with new assets and component directory structure.
- [ ] Synchronize all created files to `.gemini` and global config.
- [ ] Run test verification.

