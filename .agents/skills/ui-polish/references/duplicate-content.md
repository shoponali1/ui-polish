# Module 11: Cross-Page Duplicate Content & Cannibalization Prevention

When the same or very similar content appears on more than one page of a website, search engines (Google, Bing, Perplexity) struggle to decide which URL to index, rank, and show in search results. This dilutes SEO authority, wastes crawl budget, and can lead to algorithm penalties.

---

## 1. What Counts as Duplicate Content?

Duplicate content falls into three primary categories:

### A. Verbatim Cross-Page Content (Exact Duplicate)
Substantial blocks of content (paragraphs, FAQ answers, feature descriptions) on one page that match another page word-for-word.
- **Example:** Copy-pasting the same 3-paragraph company pitch or service description onto `services/web.html`, `services/mobile.html`, and `about.html`.
- **The Threshold:** Any paragraph or section with $\ge 15$ words that appears identically across multiple distinct URLs.

### B. Near-Duplicate & Thin Content (Boilerplate Dominance)
Two pages where 70% or more of the page is identical boilerplate (header, navigation, promo banners, footer, shared CTA), with only a few sentences or product names changed.
- **Example:** City landing pages (`/seo-agency-dhaka`, `/seo-agency-chittagong`) where only the city name is swapped in an otherwise identical 500-word template.

### C. Technical & URL Parameter Duplication
The exact same page accessible under multiple distinct URLs without canonical consolidation:
- `https://example.com/page` vs `https://example.com/page/` (trailing slash)
- `http://` vs `https://` (non-secure vs secure protocol)
- `https://example.com` vs `https://www.example.com` (www vs non-www)
- `https://example.com/shop?sort=price` vs `https://example.com/shop` (URL parameters)

---

## 2. The 3 Core Defense Rules

### Rule 1: The Self-Referential Canonical Tag
Every single public HTML page MUST declare its one true canonical address inside `<head>`:

```html
<link rel="canonical" href="https://example.com/services/web-development" />
```

> [!IMPORTANT]
> - The canonical URL must be **absolute** (including `https://` and the domain name).
> - Never use relative paths like `href="/services"`.
> - If Page A is a duplicate or variant of Page B, Page A's canonical tag MUST point directly to Page B.

### Rule 2: The 60/40 Uniqueness Ratio for Templated Pages
On templated or programmatic pages (e.g. blog posts, category listings, location pages):
- At least **60% of the visible body text** must be completely unique to that specific URL.
- Common boilerplate (nav, sidebar, footer, standard trust badges) must never exceed **40%** of the page's total text volume.

### Rule 3: Unique Meta Title & Description Per Page
No two pages on a website may share the exact same `<title>` tag or `<meta name="description">`.

| Page Type | Recommended Title Pattern | Recommended Meta Description Pattern |
| :--- | :--- | :--- |
| **Homepage** | `[Primary Outcome] | [Brand Name]` | Direct answer stating what the company does and who it helps in $\le$ 155 chars. |
| **Feature Page**| `[Specific Capability] - [Brand Name]` | Outcome-focused benefit of this specific feature without generic filler. |
| **Blog Article**| `[Compelling Headline / Topic] | [Brand]` | Summary answer answering the user's primary query directly. |

---

## 3. Cross-Page Paragraph & Section Duplication Detection

When building or auditing multi-page websites, scan across all HTML/JSX/TSX files for repeated text chunks.

### Detection Mechanism:
1. **Extraction:** Strip HTML tags, navigation headers, footers, and scripts. Split body copy into paragraph blocks ($\ge 15$ words).
2. **Normalization:** Convert to lowercase, normalize unicode spaces and Bengali/Latin diacritics.
3. **Cross-Correlation:** Check if paragraph hash from `Page A` matches any paragraph hash in `Page B`.
4. **Jaccard Text Similarity:** Compute overall vocabulary overlap between pages:
   $$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$
   - **$J \ge 0.70$ (70%):** Severe duplicate content risk. Consolidate into a single authoritative URL or rewrite with unique insights.
   - **$J \ge 0.40$ (40% - 69%):** High boilerplate overlap. Differentiate with unique case studies, FAQs, and data points.
   - **$J < 0.40$ (<40%):** Healthy content differentiation.

---

## 4. Remediation Playbook: How to Fix Duplicate Content

When the CLI auditor detects duplicate content between two pages:

1. **Option A: 301 Permanent Redirect (Best for identical pages)**
   If two pages serve the same intent, permanently redirect the weaker URL to the authoritative URL via `.htaccess` or server routing:
   ```apache
   Redirect 301 /old-duplicate-page https://example.com/authoritative-page
   ```

2. **Option B: Canonicalize (Best for tracking or faceted navigation)**
   Keep both URLs active for users, but tell search engines which one to index:
   ```html
   <!-- On https://example.com/shop?sort=newest -->
   <link rel="canonical" href="https://example.com/shop" />
   ```

3. **Option C: Add `noindex, follow` (Best for internal search / print versions)**
   ```html
   <meta name="robots" content="noindex, follow" />
   ```

4. **Option D: Substantive Differentiation (Best for similar service pages)**
   Rewrite the shared sections with:
   - Unique client testimonials specific to that service.
   - Unique technical specifications or workflows.
   - Distinct FAQ accordions answering questions unique to that topic.

