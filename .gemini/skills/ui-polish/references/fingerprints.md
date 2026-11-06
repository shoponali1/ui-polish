# Module 08: AI Fingerprint Signatures & Technical Tells

Beyond overt buzzwords, AI leaves distinct statistical signatures across sentence rhythm, punctuation, and clause structuring.

---

## 1. The Core AI Fingerprint Signatures

### 1.1 The Em-Dash (`—`) Epidemic
- **The Signature:** LLMs compulsively glue independent clauses with em-dashes `—` instead of writing confident, standalone sentences.
- ❌ *“Our API delivers sub-10ms latency — ensuring your distributed application never skips a frame.”*
- ✅ *“Our API responds in under 10ms so your app never drops a frame.”*

### 1.2 The Symmetrical Triad (Obsessive Rule of Three)
- **The Signature:** Grouping features, benefits, or adjective bullets strictly in triads (`A, B, and C`).
- ❌ *“Fast, reliable, and secure.”* / *“Design, build, and deploy.”* / *“সহজ, দ্রুত এবং সাশ্রয়ী।”*
- ✅ Break the symmetry. Give the single most distinctive benefit: *“Deploy in 4 seconds with 99.99% uptime.”*

### 1.3 Trailing Participial `-ing` Clauses (Superficial Puffery)
- **The Signature:** Tacking on a weak trailing clause (*, highlighting...*, *, underscoring...*, *, reflecting...*, *, ensuring...*) to explain synthetic importance.
- ❌ *“Version 3.0 introduces webhook retries, highlighting our commitment to enterprise reliability.”*
- ✅ *“Version 3.0 retries failed webhooks up to 5 times with exponential backoff.”*

### 1.4 Low Burstiness & Uniform Sentence Length
- **The Signature:** Monotonic, metronomic sentence rhythm where every sentence is approximately 12 to 16 words long.
- **Fix (High Burstiness):** Vary sentence cadence. Mix punchy 3-word statements with detailed descriptive sentences. Write like a human talking to an engineer.

### 1.5 Preachy Metadiscourse & Weasel Commentary
- **The Signature:** Stepping outside the subject to instruct the reader on how to feel (*"It's worth noting that..."*, *"Crucially,..."*, *"উল্লেখযোগ্য যে..."*).
- **Fix:** Delete the commentary entirely. Let the facts and metrics prove the significance.

