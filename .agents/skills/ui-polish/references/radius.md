# Module 03: Concentric Border-Radius & Subtle Elevation

Sharp mismatched corners and dark heavy drop-shadows scream unpolished UI. Modern design relies on mathematical corner curvature and feather-light ambient borders.

---

## 1. The Concentric Border-Radius Formula

When nesting a rounded card inside another rounded container, the radii must share the same focal center:

$$\text{Outer Radius} = \text{Inner Radius} + \text{Padding}$$

```text
Formula: R_outer = R_inner + Padding
Example:
If Inner Card has 8px radius and Container Padding is 8px:
  Outer Container Radius = 8px + 8px = 16px!
```

```html
<!-- ✅ PERFECT CONCENTRIC CORNERS -->
<div class="p-2 rounded-[16px] bg-slate-200">
  <div class="p-4 rounded-[8px] bg-white shadow-sm">
    Inner content with perfectly matched curvature.
  </div>
</div>
```

---

## 2. Elevation: Subtle 1px Alpha Borders Over Dark Shadows

Never use dark, heavy box shadows (`box-shadow: 0 10px 25px rgba(0,0,0,0.5)`). Modern UI uses crisp 1px borders with feather-light ambient diffusion:

```css
/* Light Mode Polished Card Elevation */
.polished-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08); /* Crisp edge boundary */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.03); /* Soft ambient depth */
}

/* Dark Mode Equivalent */
.dark .polished-card {
  background: #18181b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}
```

---

## 3. Layering Surface Tokens

| Level | Surface Name | Role | Border Tone |
| :--- | :--- | :--- | :--- |
| **Layer 0** | Canvas / Background | Page base canvas (`#fafafa` / `#09090b`) | None |
| **Layer 1** | Base Surface / Card | Content cards, sidebars (`#ffffff` / `#18181b`) | `rgba(0,0,0,0.08)` / `rgba(255,255,255,0.08)` |
| **Layer 2** | Floating Surface | Dropdowns, popovers, tooltips (`#ffffff` / `#27272a`) | `rgba(0,0,0,0.12)` / `rgba(255,255,255,0.15)` |
| **Layer 3** | Modal Surface | High-priority dialogs with backdrop blur | `rgba(0,0,0,0.18)` / `rgba(255,255,255,0.20)` |

