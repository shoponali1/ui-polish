# ui-polish: Production-Ready UI, Semantic, and Visual Polish Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the skill into `ui-polish` — a comprehensive, global-grade polish skill covering CSS styling, spacing/paddings, color contrast, border-radius tokens, micro-animations, button hover/focus states, responsive layout perfection, alongside semantic heading hierarchy and SEO/AEO/GEO keyword distribution.

**Architecture:** 
1. Rename directory structure from `ui-h1` to `ui-polish` across `.agents/skills` and `.gemini/skills`.
2. Rewrite `SKILL.md` to be a 6-pillar polish framework:
   - **Pillar 1:** Semantic Heading Hierarchy & SEO/AEO/GEO Keyword Placement (`<h1>`-`<h6>`, AEO Direct Answers, GEO Chunks).
   - **Pillar 2:** Layout Geometry & Spacing Rhythm (4px/8px scale, optical alignment, margin/padding hierarchy).
   - **Pillar 3:** Color Palette & WCAG Contrast (APCA/WCAG 4.5:1 text contrast, semantic surface tokens).
   - **Pillar 4:** Shape, Border-Radius & Elevation (Radius token harmony, subtle borders, depth layering).
   - **Pillar 5:** Micro-Interactions & Motion (State matrix: hover, active, focus-visible, 150-250ms ease-out transitions, `prefers-reduced-motion`).
   - **Pillar 6:** Responsive Precision & Layout Stability (Fluid typography, container queries, zero-CLS image/component aspect ratios).
3. Provide ready-to-copy CSS/Tailwind utility tokens and interactive audit checklists.

**Tech Stack:** Semantic HTML5, CSS Variables, Tailwind CSS v3/v4, Modern Accessibility (WCAG 2.2 AA), Micro-interactions & Web Performance.

**Spec:** `.agents/skills/ui-polish/SKILL.md`

## Global Constraints

- Keep frontmatter clean: `name: ui-polish`.
- Production-ready CSS snippets using modern standards (CSS variables, `clamp()`, `focus-visible`, hardware-accelerated transforms).
- Both `.agents/skills/ui-polish` and `.gemini/skills/ui-polish` must remain in exact sync.
- Zero boilerplate fluff: every section must deliver copy-pasteable patterns, anti-patterns, and decision matrices.

## Review Focus

1. Seamless integration of visual polish with semantic SEO/AEO/GEO headings.
2. 4.5:1 minimum color contrast compliance for text and 3:1 for interactive controls.
3. Smooth 60fps micro-animations that never animate layout properties (only `transform` and `opacity`).
4. Accessible keyboard focus states (`:focus-visible`) that look intentional and polished.
5. Consistent spacing scales (8pt grid system) avoiding random arbitrary pixel values.

---

### Task 1: Rename Skill Folders and Update Configuration

**Files:**
- Move: `.agents/skills/ui-h1` -> `.agents/skills/ui-polish`
- Move: `.gemini/skills/ui-h1` -> `.gemini/skills/ui-polish`

- [ ] Rename `.agents/skills/ui-h1` to `.agents/skills/ui-polish`.
- [ ] Rename `.gemini/skills/ui-h1` to `.gemini/skills/ui-polish`.
- [ ] Update frontmatter `name: ui-polish` and update description to reflect full UI, SEO, visual, and interaction polish.

### Task 2: Implement Visual Polish Pillars (Spacing, Radius, Color Contrast)

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`
- Modify: `.gemini/skills/ui-polish/SKILL.md`

- [ ] Add **Spacing & Sizing Rhythm Guidelines**:
  - The 8pt grid token system (`p-2`, `p-4`, `p-6`, `p-8` / `8px`, `16px`, `24px`, `32px`).
  - Interior padding vs exterior margin rules (inner child padding must always be smaller than container padding).
- [ ] Add **Border Radius & Elevation Token System**:
  - Concentric border-radius formula: `outer_radius = inner_radius + padding`.
  - Subtle borders (`border-black/5` or `border-white/10`) over harsh dropshadows.
- [ ] Add **Color Contrast & Dark/Light Mode Tokens**:
  - WCAG AA (4.5:1 text, 3:1 UI controls) verification standards.
  - Semantic foreground/background surface tokens using CSS variables.

### Task 3: Implement Micro-Interactions, Transitions & Hover States

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`
- Modify: `.gemini/skills/ui-polish/SKILL.md`

- [ ] Add **Interactive State Matrix**:
  - Button & Card states: default, hover, active (press down `scale(0.98)`), focus-visible, and disabled.
  - High-visibility custom `:focus-visible` ring patterns that don't trigger on mouse click.
- [ ] Add **Micro-Animation & Transition Best Practices**:
  - Golden rule of motion: Only animate `transform` and `opacity` (never `width`, `height`, or `margin` to prevent layout reflows).
  - Timing tokens: 150ms for snappy clicks, 200-250ms for hovers, easing with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Accessibility safety: `@media (prefers-reduced-motion: reduce)`.

### Task 4: Integrate Semantic Headings, SEO, AEO, and GEO Matrix

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`
- Modify: `.gemini/skills/ui-polish/SKILL.md`

- [ ] Embed the complete `<h1>`-`<h6>` hierarchy matrix.
- [ ] Add the Keyword Allocation Table (Primary in H1, Secondary/LSI in H2, Long-tail & FAQs in H3).
- [ ] Add AEO Direct Answer pattern (question heading + 40-word concise answer block) and GEO chunking rules.

### Task 5: Responsive Precision, Pixel-Perfect Layouts & Final Polish Checklist

**Files:**
- Modify: `.agents/skills/ui-polish/SKILL.md`
- Modify: `.gemini/skills/ui-polish/SKILL.md`

- [ ] Add **Responsive Fluidity & Layout Shift (CLS 0) Rules**:
  - Fluid typography with `clamp()`.
  - Aspect ratio containers for media to prevent layout jumps.
  - Optical alignment (centering icons with text, line-height balancing).
- [ ] Add **The Master UI Polish Audit Checklist** (15-point inspection before shipping any page or component).
- [ ] Synchronize and verify both `.agents/skills/ui-polish` and `.gemini/skills/ui-polish`.

