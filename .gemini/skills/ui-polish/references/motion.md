# Module 05: Micro-Interactions, Motion & State Matrix

Tactile interactive feedback transforms static HTML into software that feels alive and responsive.

---

## 1. The 5-State Interactive Matrix

Every clickable element (button, link, interactive card) must define 5 distinct visual states:

1. **Default:** Clean base state with readable text and defined surface.
2. **Hover:** Light elevation change or subtle background tinting (`150ms`).
3. **Active (Click / Press):** Micro-compression feel using `transform: scale(0.98)` (`100ms`).
4. **Focus-Visible:** Accessible, high-contrast keyboard focus ring with outline offset. Never trigger on standard mouse clicks.
5. **Disabled:** Suppressed pointer events (`pointer-events: none`), reduced opacity (`0.5`), and `cursor: not-allowed`.

```html
<!-- ✅ THE COMPLETE 5-STATE POLISHED BUTTON -->
<button class="
  inline-flex items-center justify-center gap-2 px-4 py-2
  text-sm font-medium text-white bg-blue-600 rounded-lg
  shadow-sm border border-transparent
  transition-all duration-150 ease-out
  hover:bg-blue-700 hover:shadow
  active:scale-[0.98] active:bg-blue-800
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
">
  <span>Save Changes</span>
</button>
```

---

## 2. 60fps Transition Rules

- **Golden Performance Rule:** **ONLY** animate `transform` and `opacity`. Animating `width`, `height`, `margin`, or `top` forces browser layout reflow and causes micro-stutter.
- **Duration Guidelines:**
  - Active press down: `100ms - 150ms`.
  - Hover states: `150ms - 200ms`.
  - Dropdown / Modal entrance: `200ms - 250ms` using `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 3. Respecting Reduced Motion

Always respect users with vestibular disorders or motion sensitivity:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

