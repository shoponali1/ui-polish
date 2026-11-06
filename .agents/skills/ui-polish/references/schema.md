# Module 14: Structured Data & Schema.org JSON-LD

Structured data provides explicit clues to search engines (Google, Bing, Perplexity, AI crawlers) about the meaning of a page. Implementing Schema.org JSON-LD unlocks Google Rich Results (star ratings, FAQ drop-downs, sitelinks search boxes, and entity knowledge graphs).

---

## 1. Core Principles of Schema Implementation

1. **Always Use JSON-LD Format:** Google explicitly prefers `<script type="application/ld+json">` inside `<head>` or at the end of `<body>`. Avoid legacy Microdata or RDFa attributes.
2. **Represent Only Visible Content:** Never markup content, reviews, or FAQs that are hidden from human visitors. Doing so triggers Google's Structured Data Spam manual action.
3. **Valid JSON Syntax:** Zero trailing commas, unescaped quotes, or broken brackets.

---

## 2. The Big 6 Schema.org JSON-LD Templates

### 1. Organization Schema (Homepage / About Us)
Tells Google your legal name, official URL, brand logo, and official social media profiles:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Cloud Technologies",
  "url": "https://example.com",
  "logo": "https://example.com/assets/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-555-0199",
    "contactType": "Customer Support",
    "email": "support@example.com"
  },
  "sameAs": [
    "https://twitter.com/acmecloud",
    "https://github.com/acmecloud",
    "https://linkedin.com/company/acmecloud"
  ]
}
</script>
```

### 2. WebSite Schema + Sitelinks Search Box (Homepage)
Enables Google to display an in-search sitelinks search bar for your domain:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Acme Cloud",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 3. FAQPage Schema (FAQ Sections & Accordions)
Renders collapsible Question & Answer dropdowns directly in Google search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does automated database migration take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most databases with under 100GB of records migrate with zero downtime in under 8 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a credit card to start the free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No credit card is required. You can test all enterprise features for 14 days completely free."
      }
    }
  ]
}
</script>
```

### 4. Article / BlogPosting Schema (Content Pages)
Enables Google Top Stories carousel and rich article cards:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Achieve 100/100 Core Web Vitals on Next.js",
  "image": [
    "https://example.com/images/web-vitals-cover.webp"
  ],
  "datePublished": "2026-11-01T08:00:00+06:00",
  "dateModified": "2026-11-06T12:00:00+06:00",
  "author": [{
    "@type": "Person",
    "name": "Labiba Rahman",
    "url": "https://example.com/authors/labiba"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Acme Cloud",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "description": "A comprehensive engineering guide to eliminating CLS and achieving sub-second LCP on production React apps."
}
</script>
```

### 5. Product & Offer Schema (E-Commerce / SaaS Plans)
Renders live pricing, stock availability, and star ratings:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "UI Polish Enterprise License",
  "image": "https://example.com/images/product.webp",
  "description": "Production UI audit suite and semantic design tokens.",
  "brand": {
    "@type": "Brand",
    "name": "UI Polish"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/pricing",
    "priceCurrency": "USD",
    "price": "49.00",
    "priceValidUntil": "2027-12-31",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  }
}
</script>
```

---

## 3. Schema Quality & Validation Checklist

- [ ] `@context` is strictly `"https://schema.org"`.
- [ ] JSON parses cleanly with zero syntax errors.
- [ ] Required properties are present for the given `@type` (`headline` + `author` for Article; `name` + `url` for Organization).
- [ ] Dates use ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`).
- [ ] All URLs are absolute (`https://...`), never relative paths.

