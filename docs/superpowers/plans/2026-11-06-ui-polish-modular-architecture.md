# ui-polish: Modular Multi-File Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modularize the `ui-polish` skill by breaking the monolithic `SKILL.md` into focused, deep-dive reference documents inside `references/` while keeping a lean, high-velocity router in `SKILL.md` following the official Agent Skills specification.

**Architecture:**
- **Entrypoint:** `SKILL.md` (Contains YAML frontmatter, core decision tree, pre-flight checklist, and table of contents routing to sub-modules).
- **Sub-modules (`references/`):**
  1. `references/01-headings-seo-aeo-geo.md` — Semantic outline, keyword allocation, AEO direct answers, GEO chunking.
  2. `references/02-spacing-and-geometry.md` — 8pt grid scale, container vs child padding hierarchy, optical alignment.
  3. `references/03-border-radius-and-elevation.md` — Concentric radius math, subtle 1px alpha borders, elevation layering.
  4. `references/04-color-contrast-and-tokens.md` — WCAG 2.2 AA (4.5:1 / 3:1), light/dark mode CSS tokens.
  5. `references/05-micro-interactions-and-motion.md` — 5-state matrix, 60fps transform/opacity rules, focus-visible, prefers-reduced-motion.
  6. `references/06-responsive-and-zero-cls.md` — Aspect ratio media containers, text-wrap balance/pretty, layout stability.
  7. `references/07-multilingual-ai-slop.md` — Universal binary contrasts, throat-clearing, banned buzzwords across 6+ languages.
  8. `references/08-ai-fingerprints.md` — Em-dash overuse, rule-of-three triads, trailing -ing puffery, low burstiness.
- **Tooling (`scripts/`):**
  - `scripts/audit-ui.mjs` — Fast CLI auditor executing checks matching all 8 reference specs.

**Tech Stack:** Markdown, Agent Skills Standard, Node.js.

**Spec:** `.agents/skills/ui-polish/SKILL.md`

## Global Constraints

- Root `SKILL.md` MUST retain valid YAML frontmatter (`name: ui-polish`, `description`).
- All sub-modules must be cleanly linked via relative markdown links from `SKILL.md`.
- Keep `.agents/skills/ui-polish`, `.gemini/skills/ui-polish`, and `~/.gemini/config/skills/ui-polish` in 100% sync.
- Zero lost information: all guidelines, code examples, tables, and rules from the current monolithic file must be preserved and expanded.

## Review Focus

1. Seamless router experience: Any agent reading `SKILL.md` can immediately locate and pull the exact reference needed without polluting context.
2. Cross-referencing: Each reference file is self-contained with copy-pasteable code examples.
3. Verification: Audit script runs with 0 errors across the modular layout.

---

### Task 1: Create `references/` Directory and Author the 8 Modular Docs

**Files:**
- Create: `.agents/skills/ui-polish/references/01-headings-seo-aeo-geo.md`
- Create: `.agents/skills/ui-polish/references/02-spacing-and-geometry.md`
- Create: `.agents/skills/ui-polish/references/03-border-radius-and-elevation.md`
- Create: `.agents/skills/ui-polish/references/04-color-contrast-and-tokens.md`
- Create: `.agents/skills/ui-polish/references/05-micro-interactions-and-motion.md`
- Create: `.agents/skills/ui-polish/references/06-responsive-and-zero-cls.md`
- Create: `.agents/skills/ui-polish/references/07-multilingual-ai-slop.md`
- Create: `.agents/skills/ui-polish/references/08-ai-fingerprints.md`

- [ ] Write detailed, production-ready content for Modules 01 through 08.
- [ ] Ensure all code snippets use modern HTML5, CSS variables, and Tailwind utilities.

### Task 2: Refactor Root `SKILL.md` into Lean Router & Master Checklist

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`

- [ ] Keep YAML frontmatter and concise summary.
- [ ] Add the "Quick Navigation & Module Router" linking directly to each of the 8 reference docs.
- [ ] Keep the 20-Point Master UI Polish Pre-Flight Checklist in `SKILL.md` as the unified quality gate.

### Task 3: Sync to `.gemini` and Global Config Skills

**Files:**
- Sync: `.agents/skills/ui-polish/` -> `.gemini/skills/ui-polish/`
- Sync: `.agents/skills/ui-polish/` -> `C:\Users\labiba\.gemini\config\skills\ui-polish/`

- [ ] Copy all `references/` and updated `SKILL.md` to `.gemini/skills/ui-polish`.
- [ ] Copy all files to `C:\Users\labiba\.gemini\config\skills\ui-polish`.

### Task 4: Verification

- [ ] Run `node .agents/skills/ui-polish/scripts/audit-ui.mjs` test to verify tooling compatibility.
- [ ] Verify markdown links between `SKILL.md` and `references/*.md`.

