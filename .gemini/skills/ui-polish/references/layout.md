# Module 06: Responsive Precision & Zero-CLS Layout Stability

Unwanted layout shifts (CLS) and awkward text wrapping destroy an otherwise polished experience.

---

## 1. Zero Cumulative Layout Shift (CLS = 0)

1. **Explicit Dimensions on Images & Video:**
   - Always supply `width` and `height` attributes or specify modern CSS `aspect-ratio`:
   ```html
   <img src="dashboard.webp" alt="Analytics dashboard" width="1280" height="720" class="w-full h-auto aspect-video rounded-xl" />
   ```
2. **Skeleton Reserve Space:**
   - Always render skeleton placeholders with the exact expected height for async content blocks, ad banners, and dynamic user feeds.

---

## 2. Modern Typography Wrap Polish

- **Headlines (`text-wrap: balance`):**
  - Prevents lonely single-word orphan lines on headings across mobile breakpoints.
  ```css
  h1, h2, h3 {
    text-wrap: balance;
  }
  ```
- **Body Text (`text-wrap: pretty`):**
  - Optimizes paragraph line breaks and hyphenation automatically in modern browsers.
- **Reading Container Max Width:**
  - Cap long-form reading content containers to `max-w-prose` (approx 65 to 75 characters per line).

