# Module 04: Color Contrast, Dark/Light Mode & Design Tokens (WCAG 2.2 AA)

Color must look intentional and maintain high readability across both Light and Dark themes, preventing invisible text, harsh eye strain, and theme-switch flashes (FOUC).

---

## 1. Contrast Ratios (WCAG 2.2 AA Standards)

- **Normal Text (< 18pt / 24px regular):** Minimum **4.5:1** contrast ratio against background.
- **Large Text (>= 18pt / 14pt bold):** Minimum **3.0:1** contrast ratio.
- **Interactive UI Components & Form Borders:** Minimum **3.0:1** contrast ratio.
- **Anti-pattern:** Never use light grey text like `#94a3b8` on white background for body copy. Use `#475569` or darker.

---

## 2. Dark & Light Mode Implementation Architecture

There are two primary ways to support dual themes:

### 2.1 CSS Variables (System & Class Agnostic)
The most robust approach. The same CSS classes (`bg-surface`, `text-primary`) work in both themes automatically:

```css
:root {
  /* ── Light Mode Palette ── */
  --bg-canvas: #fafafa;
  --bg-surface: #ffffff;
  --bg-surface-hover: #f4f4f5;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.18);
  
  --text-primary: #09090b;   /* 18:1 contrast on white */
  --text-secondary: #52525b; /* 6.5:1 contrast on white */
  --text-muted: #71717a;     /* 4.6:1 contrast on white */
  
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --focus-ring: #3b82f6;
}

/* System preference trigger */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-canvas: #09090b;
    --bg-surface: #18181b;
    --bg-surface-hover: #27272a;
    --border-subtle: rgba(255, 255, 255, 0.1);
    --border-strong: rgba(255, 255, 255, 0.2);
    
    --text-primary: #f4f4f5;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    
    --primary: #3b82f6;
    --primary-hover: #60a5fa;
    --focus-ring: #60a5fa;
  }
}

/* Explicit class or data-attribute override for manual toggle */
[data-theme="dark"], .dark {
  --bg-canvas: #09090b;
  --bg-surface: #18181b;
  --bg-surface-hover: #27272a;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);
  
  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
}
```

---

## 3. Dark Mode Common Traps & Audit Rules

| Anti-Pattern / Trap | Problem | Fix |
| :--- | :--- | :--- |
| **Hardcoded `#000` text in HTML** | In dark mode, background turns dark, making black text **completely invisible**. | Never hardcode `#000` or `#333`. Use `var(--text-primary)` or `text-slate-900 dark:text-zinc-100`. |
| **Pure `#000000` Pitch Black Background** | Creates harsh contrast and intense eye fatigue with white text. | Use dark slate / zinc (`#09090b`, `#121212`, or `#18181b`) with layered surface elevation. |
| **Theme Flash (FOUC)** | Screen flashes white for 200ms before dark theme JS loads from localStorage. | Add `<meta name="color-scheme" content="light dark">` and place an inline theme-check script in `<head>`. |
| **Unlabelled Theme Toggle Button** | Screen reader reads "button" with no purpose. | Add `aria-label="Switch to dark mode"` or `aria-label="Toggle theme"`. |
| **Un-dimmed High-Key Images** | Blinding white diagrams or logos in dark mode. | Add `dark:brightness-90` or swap to a dark-mode SVG variant. |

---

## 4. Flash of Unstyled Content (FOUC) Prevention Script

Place this tiny script in `<head>` before any stylesheets render:

```html
<head>
  <meta name="color-scheme" content="light dark" />
  <script>
    (function() {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
</head>
```
