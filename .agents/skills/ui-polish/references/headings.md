# Module 01: Semantic Headings & SEO / AEO / GEO Strategy

HTML headings (`<h1>` through `<h6>`) establish the machine-readable outline for web crawlers, AI retrieval models (RAG), and assistive technologies (screen readers).

---

## 1. Heading Hierarchy & Keyword Allocation Matrix

| Tag | Semantic Level | Target Keyword Category | Search Engine Role (SEO / AEO / GEO) | Max Allowed | Real-World Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`<h1>`** | Page Title | **Primary Keyword** + Core Entity | **SEO:** Ranks primary query.<br>**GEO:** Document entity anchor. | **Strictly 1** per page | `Best Project Management Software for Remote Teams` |
| **`<h2>`** | Primary Pillar / Section | **Secondary Keywords & LSI** | **SEO:** Sub-topic relevancy.<br>**AEO:** Question triggers for Snippets.<br>**GEO:** Core retrieval chunk boundary. | Multiple | `How Remote Workflow Tools Improve Sprint Velocity` |
| **`<h3>`** | Sub-feature / Card / Step | **Long-tail & FAQs** | **SEO:** Granular query match.<br>**AEO:** Step-by-step & specific answers.<br>**GEO:** Fact citation unit. | Multiple | `Step 1: Automating Slack Status Updates` |
| **`<h4>`** | Component Item / Group | **Technical Terms & Entities** | **SEO/GEO:** Data attributes, entity parameters, specs. | Multiple | `Webhook Delivery Latency (<50ms)` |
| **`<h5>`** | Deep Sub-spec | **Granular Metadata** | Fine-grained technical details. | Multiple | `Payload Schema (JSON v2)` |
| **`<h6>`** | Micro-label / Kicker | **Context / Eyebrow Label** | Visual overline or category label. | Multiple | `ADVANCED CONFIGURATION` |

---

## 2. AEO (Answer Engine Optimization) Direct Answer Pattern

Search engines (Google Featured Snippets, Perplexity, Apple Siri) scan question headings looking for an immediate direct answer in the very next paragraph:

```html
<!-- ✅ GOOD AEO PATTERN: Heading question followed immediately by concise answer -->
<section>
  <h2>Is CloudSync Free for Open-Source Projects?</h2>
  <p class="direct-answer text-base text-slate-700 font-medium">
    Yes. CloudSync is 100% free with unlimited storage for verified public open-source repositories under MIT, Apache, or GPL licenses.
  </p>
  <p class="text-sm text-slate-500 mt-2">
    To apply, simply link your public GitHub repository during registration...
  </p>
</section>
```

---

## 3. GEO (Generative Engine Optimization) Semantic Chunking Blueprint

AI search engines (ChatGPT Search, Perplexity, Google AI Overviews) divide pages into semantic chunks. An optimal GEO chunk:
- Has a clear descriptive `<h2>` or `<h3>` establishing context.
- Contains high information density (bulleted takeaways, metrics, or comparison tables).
- Avoids vague marketing fluff.

```html
<!-- ✅ GOOD GEO CHUNK: Self-contained, data-dense, readily citable -->
<section aria-labelledby="benchmarks-heading">
  <h2 id="benchmarks-heading">PostgreSQL vs SQLite Query Performance Benchmarks</h2>
  <p class="text-slate-600">
    In read-heavy workloads with 100,000 concurrent records, SQLite provides 2.4x lower latency in local embedded environments, whereas PostgreSQL scales 8.5x better across distributed connections.
  </p>
  <ul class="space-y-1 mt-3 text-sm">
    <li><strong>SQLite Local Read:</strong> 0.42ms average response.</li>
    <li><strong>PostgreSQL Local Read:</strong> 1.02ms average response.</li>
    <li><strong>Concurrent 500+ Connections:</strong> PostgreSQL throughput exceeds SQLite by 640%.</li>
  </ul>
</section>
```

---

## 4. Strict Sequential Nesting Rule

Never skip levels downward. Screen readers rely on orderly descending structure (`H1 -> H2 -> H3`).
- ❌ **Bad:** `<h1>` directly followed by `<h4>`.
- ✅ **Good:** `<h1>` -> `<h2>` -> `<h3>` -> `<h4>`.
- Separate semantics from visuals: style a semantic `<h3>` with small font size (`text-sm`) using CSS without changing the tag to `<h6>`.

```html
<!-- ❌ BAD: Using h5 for card title just because it needs small text -->
<section>
  <h2>Features</h2>
  <h5>Instant Backup</h5> <!-- Skipped level! -->
</section>

<!-- ✅ GOOD: Semantic h3 styled with CSS -->
<section>
  <h2>Features</h2>
  <h3 class="text-sm font-semibold text-slate-800">Instant Backup</h3>
</section>
```

