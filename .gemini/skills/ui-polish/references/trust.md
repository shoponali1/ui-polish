# Module 13: E-E-A-T Trust Signals & Essential Trust Pages

Google's Search Quality Rater Guidelines prioritize **E-E-A-T** (Experience, Expertise, Authoritativeness, and Trustworthiness). Beyond search engines, human visitors will not purchase, sign up, or share payment details without clear, credible trust signals.

---

## 1. The 4 Essential Trust Pages

Every public website (especially commercial, SaaS, e-commerce, or lead-generation sites) must have dedicated, accessible trust pages linked in the primary navigation or footer:

### A. Privacy Policy (`/privacy` or `privacy.html`)
- **Legal Mandate:** Required by GDPR, CCPA, and Google Ads/Analytics terms.
- **Must Include:** What personal data is collected, how cookies are used, third-party services (Stripe, Google Analytics), and how users can request data deletion.

### B. Terms of Service / Conditions (`/terms` or `terms.html`)
- **Must Include:** Service rules, refund and cancellation policies, intellectual property rights, and limitation of liability.

### C. Contact Page (`/contact` or `contact.html`)
- **Real-World Verifiability:** Anonymous sites are heavily penalized by Google's anti-spam algorithms.
- **Must Include:** Real support email (`support@domain.com`, not generic Gmail), physical operating address or business jurisdiction, phone number (or live support hours), and a working contact form.

### D. About Us / Team Page (`/about` or `about.html`)
- **E-E-A-T Foundation:** Show real people, founder credentials, company registration, and mission.
- **Author Bylines:** For blogs and articles, link authors to their bio page with social/LinkedIn verification.

---

## 2. On-Page Trust Signals Checklist

### 1. Dynamic / Current Copyright Year
Outdated copyright notices (*"© 2019 Acme Corp"*) signal an abandoned website.
- **Requirement:** Always display the current year dynamically or maintain up-to-date static dates:
```html
<p class="text-xs text-slate-500">
  &copy; <span id="year">2026</span> Acme Inc. All rights reserved.
</p>
```

### 2. Verified Social Proof (Not Anonymous Testimonials)
Anonymous quotes (*"Great product! - John D."*) trigger skepticism.
- **The Standard:** Full name, real headshot/avatar, company name, and job title or verified purchase badge:
```html
<figure class="p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
  <blockquote class="text-slate-700 dark:text-zinc-300 mb-4">
    "UI Polish cut our frontend QA cycle from 3 days to under 2 hours."
  </blockquote>
  <figcaption class="flex items-center gap-3">
    <img src="/avatars/sarah.webp" alt="Sarah Connor" class="w-10 h-10 rounded-full" width="40" height="40" loading="lazy" />
    <div>
      <div class="font-semibold text-slate-900 dark:text-white">Sarah Connor</div>
      <div class="text-xs text-slate-500">VP of Engineering at CloudScale</div>
    </div>
  </figcaption>
</figure>
```

### 3. Clear Guarantees & Friction Reducers
- **Trial Terms:** Explicitly state trial length and renewal terms (*"Free 14-day trial &bull; No credit card required &bull; Cancel in 1 click"*).
- **Money-Back Guarantee:** State refund window clearly (*"30-day no-questions-asked refund guarantee"*).
- **Security Standards:** Mention encryption (*"256-bit bank-grade encryption &bull; SOC-2 Type II Certified"*).

---

## 3. Trust Score Audit Matrix

The automated auditor evaluates sites across these trust dimensions:

| Trust Element | Check Type | Minimum Requirement | Failure Impact |
| :--- | :--- | :--- | :--- |
| **Privacy Policy** | Site-wide link | Accessible from footer on all pages | Legal non-compliance, ad account bans |
| **Terms of Service** | Site-wide link | Accessible from footer | User disputes, merchant gateway holds |
| **Contact Info** | On-page / Footer | Real email or phone detected | Low Google E-E-A-T score |
| **Copyright Year** | Footer regex | Current year ($2026$) | Signals abandoned/unmaintained website |
| **Trust Anchors** | Below primary CTA | Factual friction reducer present | 20-40% lower conversion rate |

