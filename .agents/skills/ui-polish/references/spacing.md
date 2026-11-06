# Module 02: Layout Geometry & 8pt Spacing Rhythm

Random margins and paddings make a UI feel unpolished. A strict 8-point spacing grid builds visual harmony and consistent breathing room across screens.

---

## 1. The 8-Point Spacing Scale

Use multiples of 8px (with 4px for tight inline items):

| Value | Tailwind | Common Purpose |
| :--- | :--- | :--- |
| **4px** | `p-1`, `gap-1` | Micro-spacing (icon to text, tag badge padding). |
| **8px** | `p-2`, `gap-2` | Tight component spacing (list items, button internal padding). |
| **16px** | `p-4`, `gap-4` | Standard card internal padding, compact grid gaps. |
| **24px** | `p-6`, `gap-6` | Standard content card padding, section gap on mobile. |
| **32px** | `p-8`, `gap-8` | Modal padding, generous card padding. |
| **48px** | `py-12` | Desktop section spacing. |
| **64px / 96px** | `py-16`, `py-24` | Major landing page block separation. |

---

## 2. Container vs. Child Padding Hierarchy

> **Golden Rule:** A parent container's padding must ALWAYS be greater than or equal to the gap between its inner children.

```html
<!-- ❌ BAD: Inner gap is larger than outer padding, causing cramped feel -->
<div class="p-2 flex gap-6">...</div>

<!-- ✅ GOOD: Balanced visual breathing room -->
<div class="p-6 flex flex-col gap-4">
  <div class="p-3 bg-slate-50 rounded-md">Child Item 1</div>
  <div class="p-3 bg-slate-50 rounded-md">Child Item 2</div>
</div>
```

---

## 3. Optical Alignment & Vertical Centering

- **Icon + Text:** Icons often look optically higher than adjacent text due to character descenders. Use `inline-flex items-center` with a subtle optical nudging if needed.
- **Button Padding:** In buttons, horizontal padding should always exceed vertical padding (e.g., `px-4 py-2` or `px-5 py-2.5`) to create a stable rectangular pill rather than an awkward square.
- **Form Controls:** Align input field labels optically with input borders, maintaining uniform 6px - 8px vertical gaps.

