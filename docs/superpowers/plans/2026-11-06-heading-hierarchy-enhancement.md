# ui-h1 Skill Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the `ui-h1` skill with dynamic component patterns (React/Vue/Astro context-based headings), ARIA fallbacks, SPA routing focus management, hidden headings guidelines, and an automated CLI audit script for HTML/JSX/TSX files.

**Architecture:** Extend `SKILL.md` with modern component-based UI patterns and WCAG accessibility standards, and add a self-contained Node.js audit script under `.agents/skills/ui-h1/scripts/audit-headings.mjs` to automatically detect skipped levels, multiple H1s, and empty headings across workspace codebases.

**Tech Stack:** Markdown (Skill specs), Node.js (AST/Regex audit script), HTML5, React/Vue/Astro patterns.

**Spec:** `.agents/skills/ui-h1/SKILL.md`

## Global Constraints

- Keep all markdown syntax clean and follow Agent Skill standards.
- Production-ready, zero-dependency Node.js script for automated heading auditing.
- Maintain backward compatibility with the existing quick reference matrix and decision tree.

## Review Focus

1. Component reusability without hardcoding heading levels (e.g. `<Card>` nested in different sections).
2. Screen-reader only (`.sr-only`) patterns for non-visual heading structures.
3. Proper usage of ARIA `role="heading"` and `aria-level`.
4. Automated verification tool accuracy (avoiding false positives on conditional JSX).
5. SPA route change accessibility (heading focus management).

---

### Task 1: Document Componentized Heading Architectures (React, Next.js, Vue, Astro)

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md` and `.gemini/skills/ui-h1/SKILL.md`

- [ ] Add "Dynamic Component Level Pattern" section explaining polymorphic headings (`as="h2" | "h3"`).
- [ ] Add React Context / Level Provider pattern example (`<HeadingLevel>` / `<Heading>`) that increments level automatically based on nest depth.
- [ ] Add Vue / Astro dynamic heading tag examples.

### Task 2: Add ARIA Headings, Visually Hidden Guidelines & SPA Routing

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md` and `.gemini/skills/ui-h1/SKILL.md`

- [ ] Detail ARIA heading attributes: `role="heading"` and `aria-level="1..6"` for custom web components and design systems.
- [ ] Provide rules and standard CSS snippet for `.sr-only` / `visually-hidden` headings (landmarks, carousel headers, drawers).
- [ ] Document SPA route navigation heading focus management (moving keyboard focus to `<h1>` upon client-side page load).

### Task 3: Build Automated Heading Audit Script

**Files:**
- Create: `.agents/skills/ui-h1/scripts/audit-headings.mjs`

- [ ] Write a standalone Node.js audit script to parse HTML, JSX, TSX, and Vue files.
- [ ] Implement detection logic:
  - More than one `<h1>` per page/template.
  - Skipped heading levels (e.g. `<h1>` followed by `<h3>`).
  - Empty or non-descriptive heading tags.
- [ ] Add CLI runner instructions in `SKILL.md` so agents or developers can run `node .agents/skills/ui-h1/scripts/audit-headings.mjs <directory>`.

### Task 4: Verification & Final Polish

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md` and `.gemini/skills/ui-h1/SKILL.md`

- [ ] Run test execution of `audit-headings.mjs` on sample HTML/JSX snippets.
- [ ] Update the Pre-Deployment Verification Checklist in `SKILL.md`.
- [ ] Confirm all links, code blocks, and examples are valid and clear.

