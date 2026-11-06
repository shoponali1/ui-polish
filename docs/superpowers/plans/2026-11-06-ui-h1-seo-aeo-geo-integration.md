# ui-h1: SEO, AEO, & GEO Heading Keyword Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) strategies into the `ui-h1` skill, providing an actionable keyword-to-heading placement matrix and strict guidelines for AI citation and traditional search ranking.

**Architecture:** Extend both `.agents/skills/ui-h1/SKILL.md` and `.gemini/skills/ui-h1/SKILL.md` with:
1. SEO vs AEO vs GEO conceptual mapping for heading structures.
2. The "Keyword-to-Heading Allocation Matrix" (Primary, Secondary/LSI, Question/Conversational, and Entity keywords).
3. Chunking & citation architecture for LLM retrieval (RAG / AI search engines).
4. Guardrails against keyword stuffing and spam violations.

**Tech Stack:** Markdown (Skill specs), SEO/AEO/GEO search algorithms, Semantic HTML5.

**Spec:** `.agents/skills/ui-h1/SKILL.md`

## Global Constraints

- Both `.agents/skills/ui-h1/SKILL.md` and `.gemini/skills/ui-h1/SKILL.md` must be kept in perfect sync.
- Production-ready, authoritative guidelines citing modern search behaviors (Google AI Overviews, Perplexity, ChatGPT Search).
- Zero fluff: precise examples, actionable tables, and bad vs good code snippets.

## Review Focus

1. Clear separation of keyword roles: Primary (H1) vs Secondary/Cluster (H2) vs Long-tail/Questions (H3).
2. AEO question-heading formulation (Who, What, How, Why) and direct answer positioning.
3. GEO semantic chunking (treating H2/H3 blocks as self-contained citation units for AI crawlers).
4. Keyword density safety: preventing over-optimization and keyword cannibalization.
5. Integration with existing accessibility rules (never compromising WCAG sequential nesting for keyword placement).

---

### Task 1: Add SEO, AEO & GEO Foundations to Overview & Principles

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md`
- Modify: `.gemini/skills/ui-h1/SKILL.md`

- [ ] Add the definition and significance of SEO, AEO, and GEO in the context of heading tags:
  - **SEO:** Crawler indexing, search intent matching, and topical relevance.
  - **AEO:** Direct answer extraction, conversational query parsing, and featured snippets.
  - **GEO:** LLM semantic chunking, vector embedding boundaries, and authoritative citation by AI engines (Perplexity, ChatGPT, Gemini).
- [ ] Document the rule of Semantic Authority: Headings provide the semantic outline that AI agents and search bots use to construct knowledge graphs.

### Task 2: Build the Comprehensive "Keyword-to-Heading Allocation Matrix"

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md`
- Modify: `.gemini/skills/ui-h1/SKILL.md`

- [ ] Create the Matrix table defining:
  - **`<h1>`**: Primary Keyword + Core Entity + Value Proposition. (Front-loaded, 50-70 characters, strictly 1).
  - **`<h2>`**: Secondary Keywords, Topical Pillars, High-Volume LSI terms, Core AEO Questions ("What is X", "How Does X Work").
  - **`<h3>`**: Long-tail Keywords, Feature specifics, Sub-questions, Step-by-step headers ("Step 1: ..."), Comparative terms ("X vs Y").
  - **`<h4>`-`<h6>`**: Granular entity attributes, specifications, technical parameters.
- [ ] Detail keyword guidelines:
  - Intent matching: Informational, Commercial, Navigational, Transactional.
  - Exact match vs semantic variation rules.
  - Anti-patterns: Keyword stuffing, repetitive H2s, robotic phrasing.

### Task 3: Add GEO (Generative Engine) Chunking & AEO Direct-Answer Blueprints

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md`
- Modify: `.gemini/skills/ui-h1/SKILL.md`

- [ ] Add code patterns showing how AI engines extract chunks:
  - **AEO Direct Answer Pattern:** H2/H3 question immediately followed by a concise 40-60 word definitive answer paragraph before diving into elaboration.
  - **GEO Fact-Dense Chunk Pattern:** H2/H3 topic heading followed by structured lists, clear definitions, or comparison data tables that LLMs love to cite.
- [ ] Provide before/after HTML snippets comparing a generic heading structure with an SEO/AEO/GEO-optimized structure.

### Task 4: Update Verification Checklist & Audit Rules

**Files:**
- Modify: `.agents/skills/ui-h1/SKILL.md`
- Modify: `.gemini/skills/ui-h1/SKILL.md`

- [ ] Expand the Pre-Deployment Verification Checklist with SEO/AEO/GEO checks:
  - [ ] Does H1 contain the primary target entity/keyword naturally?
  - [ ] Are H2s structured to cover key topical entities and LSI terms?
  - [ ] Do question headings (H2/H3) follow with immediate, concise answers for AEO/GEO snippets?
  - [ ] Is keyword density natural without keyword stuffing?
- [ ] Review both files for complete accuracy and consistency.

