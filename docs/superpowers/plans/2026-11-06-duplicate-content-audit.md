# Multi-Page Duplicate Content Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add comprehensive within-page and cross-page duplicate content auditing (titles, meta descriptions, H1s, canonical tags, and near-duplicate text similarity) to the `ui-polish` ecosystem.

**Architecture:** Create a new deep-dive standard `references/duplicate-content.md` covering Google duplicate content guidelines, canonicalization, and content differentiation. Upgrade `scripts/audit-ui.mjs` to maintain a cross-page index during directory scans, computing Jaccard text similarity and flagging duplicate metadata across pages. Integrate audit checks into the CLI reporter and sync across local and global skill paths.

**Tech Stack:** Node.js (ESM), Vanilla JavaScript, RegExp, Jaccard Similarity Algorithm, Markdown, CSS/HTML.

**Spec:** User request to audit duplicate website content and establish SEO duplicate prevention rules.

---

## Global Constraints

- Zero external npm dependencies (pure standard Node.js libraries `fs`, `path`, `url`, `crypto`).
- 0 lint/execution errors.
- Support single-file audits (within-page duplicates & missing canonicals) and directory/multi-page audits (cross-page duplicates).
- Maintain 100% backward compatibility with existing CLI arguments (`--fix`, `--json`, `--markdown`).
- Synchronize all changes across `.agents/skills/ui-polish`, `.gemini/skills/ui-polish`, and global `~/.gemini/config/skills/ui-polish`.

---

## Review Focus

- Empty or near-empty pages triggering false-positive 100% similarity: normalized body text length threshold required before running similarity comparison.
- Multiple pages without canonical tags: single-page audit flags missing canonical; multi-page audit aggregates missing canonicals without spamming output.
- Minor punctuation/whitespace differences in titles (e.g., `"Shop | Acme"` vs `"Shop  |  Acme"`): normalize strings before duplicate key lookup.
- Parameterized URLs / tracking parameters producing false cross-page collisions: normalize canonical targets.
- Multilingual pages sharing template layout (e.g., Bengali vs English): text normalization must respect Unicode letters/marks (`\p{L}\p{M}`).

---

### Task 1: Create Duplicate Content Reference Specification

**Files:**
- Create: `c:/Users/labiba/Desktop/uiux/.agents/skills/ui-polish/references/duplicate-content.md`

**Interfaces:**
- Consumes: Google Search Central duplicate content policies, canonical tag RFC specifications.
- Produces: Module 11 Reference Guide with canonical rules, cross-page title/meta patterns, and remediation playbooks.

- [ ] **Step 1: Write failing test script for reference file existence**
Create a test runner checking that `references/duplicate-content.md` exists and contains core sections (`# Module 11`, `Canonicalization`, `Duplicate Title/Meta`, `Content Differentiation`).

- [ ] **Step 2: Run test to verify it fails**
Run: `node -e "if (!require('fs').existsSync('.agents/skills/ui-polish/references/duplicate-content.md')) process.exit(1)"`
Expected: Exit code 1 (file does not exist).

- [ ] **Step 3: Implement `references/duplicate-content.md`**
Author comprehensive markdown covering:
  1. Primary duplicate content risks in SEO & AEO (keyword cannibalization, link equity dilution, crawl budget waste).
  2. The Canonical Tag Rule (`<link rel="canonical" href="...">` self-referential requirements).
  3. Unique Page Title & Meta Description Formulas across e-commerce, blogs, and SaaS pages.
  4. Near-Duplicate Thresholds (Boilerplate vs unique content ratio > 60/40 rule).
  5. URL parameter normalization (trailing slashes, lowercase, UTM parameter exclusion).

- [ ] **Step 4: Run test to verify it passes**
Run: `node -e "if (!require('fs').existsSync('.agents/skills/ui-polish/references/duplicate-content.md')) process.exit(1)"`
Expected: Exit code 0 (file exists and contains required sections).

---

### Task 2: Implement Single-Page Duplicate Content Checks in `audit-ui.mjs`

**Files:**
- Modify: `c:/Users/labiba/Desktop/uiux/.agents/skills/ui-polish/scripts/audit-ui.mjs`
- Test: `test-duplicate-single.html`

**Interfaces:**
- Consumes: Single HTML document string.
- Produces: `violations` entries for:
  - Missing or duplicate `<link rel="canonical">`
  - Duplicate `<h1>` or identical heading texts within the same page
  - Duplicate paragraphs / repeated verbatim text blocks > 50 words within the page.

- [ ] **Step 1: Write failing test fixture `test-duplicate-single.html`**
Create HTML with two identical `<h1>` tags, no canonical tag, and identical repeated paragraph blocks.

- [ ] **Step 2: Run audit script to verify lack of duplicate content warnings**
Run: `node .agents/skills/ui-polish/scripts/audit-ui.mjs test-duplicate-single.html`
Expected: Fails to detect missing canonical and intra-page duplicate paragraphs.

- [ ] **Step 3: Implement intra-page duplicate audit checks in `audit-ui.mjs`**
Add:
  - Canonical tag presence check (`<link rel="canonical" href="...">`).
  - Intra-page duplicate heading check (comparing normalized text of all `h1`-`h6`).
  - Repeated paragraph detection using hashed text blocks.
  - Auto-fix for inserting self-referential canonical placeholder when `<head>` exists if `--fix` is passed.

- [ ] **Step 4: Run test to verify audit detects all violations**
Run: `node .agents/skills/ui-polish/scripts/audit-ui.mjs test-duplicate-single.html`
Expected: Reports `[SEO (Missing Canonical)]`, `[SEO (Duplicate Intra-Page Heading)]`, and `[SEO (Intra-Page Duplicate Text)]`.

- [ ] **Step 5: Clean up test fixture**
Remove `test-duplicate-single.html`.

---

### Task 3: Implement Cross-Page Directory Duplicate Content Audit in `audit-ui.mjs`

**Files:**
- Modify: `c:/Users/labiba/Desktop/uiux/.agents/skills/ui-polish/scripts/audit-ui.mjs`
- Test: `test-pages/page1.html`, `test-pages/page2.html`

**Interfaces:**
- Consumes: Directory path containing multiple HTML/JSX/TSX files.
- Produces: Multi-page registry comparing:
  - `titles`: Map of normalized title -> array of file paths.
  - `metaDescriptions`: Map of normalized description -> array of file paths.
  - `h1s`: Map of normalized H1 -> array of file paths.
  - `canonicalUrls`: Map of canonical URL -> array of file paths.
  - `contentFingerprints`: Shingled word sets to compute Jaccard similarity between page pairs (> 80% threshold).

- [ ] **Step 1: Create multi-page test directory `test-pages/`**
Write `test-pages/page1.html` and `test-pages/page2.html` with identical `<title>`, identical `<meta name="description">`, identical `<h1>`, and identical body text.

- [ ] **Step 2: Run directory audit to verify baseline output**
Run: `node .agents/skills/ui-polish/scripts/audit-ui.mjs test-pages`
Expected: Audits files individually without cross-page correlation.

- [ ] **Step 3: Implement multi-page aggregator in `audit-ui.mjs`**
Add:
  - Cross-page metadata collection in directory scanning loop.
  - Post-scan correlation report logging:
    - `[SEO Cross-Page Collision: Duplicate Title]`
    - `[SEO Cross-Page Collision: Duplicate Meta Description]`
    - `[SEO Cross-Page Collision: Duplicate H1 Heading]`
    - `[SEO Cross-Page Collision: Duplicate Canonical Target]`
    - `[SEO Cross-Page Collision: High Content Similarity (Jaccard > 80%)]`
  - Integration with `--json` and `--markdown` multi-file output.

- [ ] **Step 4: Run directory audit and verify cross-page collision detection**
Run: `node .agents/skills/ui-polish/scripts/audit-ui.mjs test-pages`
Expected: Clearly lists cross-page collisions showing which files conflict.

- [ ] **Step 5: Clean up test directory**
Remove `test-pages/`.

---

### Task 4: Update Skill Documentation, Pre-flight Checklist & Ecosystem Sync

**Files:**
- Modify: `c:/Users/labiba/Desktop/uiux/.agents/skills/ui-polish/SKILL.md`
- Modify: `c:/Users/labiba/Desktop/uiux/working.md`
- Sync To:
  - `c:/Users/labiba/Desktop/uiux/.gemini/skills/ui-polish/`
  - `C:/Users/labiba/.gemini/config/skills/ui-polish/`

**Interfaces:**
- Consumes: Updated reference standard and audit script capabilities.
- Produces: 27-point Master Pre-Flight Checklist, Module 11 Router entry, and updated system-wide skills.

- [ ] **Step 1: Update `SKILL.md` module router & checklist**
Add Module 11: `references/duplicate-content.md` to Quick Navigation table. Add items for Canonical Tag validation and Cross-page uniqueness to Master Checklist.

- [ ] **Step 2: Update `working.md` architecture map**
Document Module 11 and cross-page duplicate detection CLI capability.

- [ ] **Step 3: Synchronize across local and global paths**
Run recursive copy PowerShell script to update `.gemini/skills/ui-polish/` and global config.

- [ ] **Step 4: Verify sync integrity**
Confirm all 11 reference files and CLI tool exist in all 3 paths.

