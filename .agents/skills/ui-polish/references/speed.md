# Module 09: Page Speed & Core Web Vitals Optimization

A beautiful UI that loads slowly loses 50%+ of visitors before they even see it. Polished engineering ensures sub-second initial render and pristine Google Core Web Vitals scores.

---

## 1. Core Web Vitals Thresholds (Google Targets)

| Metric | Full Name | What It Measures | Target Threshold |
| :--- | :--- | :--- | :--- |
| **LCP** | **Largest Contentful Paint** | Time taken to render the primary hero banner or heading. | **< 2.5 seconds** (Good) |
| **INP** | **Interaction to Next Paint** | UI responsiveness when tapping buttons or menus. | **< 200 ms** (Good) |
| **CLS** | **Cumulative Layout Shift** | Visual layout stability while resources load asynchronously. | **< 0.1** (Good) |
| **TTFB** | **Time to First Byte** | Server response time to deliver the initial HTML byte. | **< 800 ms** (Good) |

---

## 2. Image & Media Speed Optimization

Images account for 60%+ of total page weight. Optimize aggressively:

### 2.1 Next-Gen Formats
- Always serve images in **WebP** or **AVIF** instead of heavy raw PNGs or JPEGs (saves 60-80% file size).

### 2.2 Hero Image Preload (LCP Speedup)
The hero image is usually the LCP element. Preload it in the `<head>`:
```html
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" type="image/webp" />
```

### 2.3 Below-the-Fold Lazy Loading
Never lazy-load the hero image. **Always** lazy-load images below the fold:
```html
<!-- ✅ Below-the-fold image: lazy loaded with decoding async -->
<img src="/images/feature-1.webp" alt="Feature screenshot" width="600" height="400" loading="lazy" decoding="async" class="w-full h-auto aspect-[3/2] rounded-lg" />
```

---

## 3. Font Loading & Render-Blocking Prevention

### 3.1 Font Display Swap
Fonts that block rendering cause blank screens (FOIT). Always use `font-display: swap`:
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
```

### 3.2 Preconnecting Third-Party Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

## 4. JavaScript & CSS Delivery

### 4.1 Defer Non-Critical Scripts
Scripts in the `<head>` without `defer` or `async` block the HTML parser:
```html
<!-- ❌ BAD: Blocks HTML rendering -->
<script src="/analytics.js"></script>

<!-- ✅ GOOD: Non-blocking background download -->
<script src="/analytics.js" defer></script>
```

### 4.2 Inline Critical CSS / Utility First
Keep your initial CSS bundle small (< 50KB gzipped). Tailwind CSS utility pruning eliminates unused styles automatically.

---

## 5. Performance Budget Checklist

- [ ] Total page weight < **1.5 MB** on initial load.
- [ ] Initial HTML document < **50 KB**.
- [ ] No more than **2 external web font families** loaded.
- [ ] Hero image preloaded with `fetchpriority="high"`.
- [ ] All below-the-fold media tagged with `loading="lazy"` and `decoding="async"`.
- [ ] Zero parser-blocking `<script>` tags in `<head>`.

