# CLAUDE.md — sharanjeetdigital.in revamp brief

Drop this file at the root of the website repo. Claude Code should read it before touching any file.

---

## 1. Context

**Site:** https://www.sharanjeetdigital.in — static multi-page site (HTML + CSS + JS, dark theme).

**Pages:** `index.html`, `services.html`, `packages.html`, `portfolio.html`, `contact.html`, `privacy.html`, `terms.html`, `refund.html`, plus `assets/`.

**Owner:** Sharanjeet Singh — solo AI automation consultant, Delhi. Trading as **Sharanjeet Singh AI Systems**.

**What the business actually sells today:**
- AI voice agents (inbound + outbound) built on Bolna — clinics, real estate, dealerships
- WhatsApp automation on Meta Cloud API + n8n — lead qualification, nurture, notifications
- Lead pipelines and CRM integrations (Google Sheets, Supabase, client CRMs)
- Ongoing retainers for the above

**Typical deal size:** ₹35,000–₹65,000 setup + ₹15,000–₹18,000/month retainer.

**Who lands on the site:** Indian SME owners (clinics, brokerages, dealerships, distributors) who found him on Instagram, plus occasional overseas leads (Dubai, Canada). Mostly mobile. Mostly non-technical.

---

## 2. The core problem to fix

The site sells the 2024 version of this business — "AI Content Creator", video editing, ₹999 reel edits, ₹4,999 landing pages. A prospect evaluating a ₹50,000 automation system reads that and re-prices the whole conversation downward.

**Every change in this brief serves one goal: make the site say "I build systems that run your business" instead of "I make videos and websites cheap."**

---

## 3. Hard constraints

Read these before proposing anything.

1. **Do not migrate the stack.** No Next.js, no React, no build tooling beyond a tiny include step (Task 8). Static HTML stays. It's fast and it works.
2. **Do not invent numbers, client names, testimonials, or metrics.** Anywhere real data is needed, insert a `<!-- FILL: ... -->` comment and leave the visible text as an obvious placeholder. Section 6 lists everything the owner must supply.
3. **Do not name clients** unless the fill data explicitly includes a name and permission. Default to category descriptions ("an aesthetic clinic in Delhi").
4. **Work in the order below.** Content tasks (1–5) before polish tasks (6–9). Do not start visual work until copy is settled.
5. **Ask before deleting a page.** Propose, don't remove.
6. **Mobile first.** Check every change at 375px width before considering it done.
7. **One task per commit**, message format: `content: rewrite hero positioning`, `feat: add case study cards`, etc.

---

## 4. Work order

### P0 — Positioning and proof

#### Task 1 — Rewrite the homepage hero and meta

**Files:** `index.html`, plus `<title>` / `<meta name="description">` on every page.

Current hero reads "Professional website development and digital solutions" and the sub-line is "We help businesses build modern websites, e-commerce stores, and digital systems." Generic — it describes a category, not an outcome.

Replace with copy built on this idea: *AI voice agents and WhatsApp systems that answer, qualify, and follow up with every lead — automatically, in Hindi and English.*

Requirements:
- Headline names the outcome, not the technology stack
- Sub-line names the audience (Indian businesses) and the mechanism in one sentence
- Two CTAs: primary = hear/try a live demo (Task 4), secondary = WhatsApp
- Keep the "Available for work" status pill — it's honest and it works

Meta descriptions currently still say "Video Editing, AI Tools." Rewrite each page's title and description around voice agents, WhatsApp automation, and lead systems. Include "India" or "Delhi" in at least the homepage description.

**Done when:** nothing in the hero or any meta tag references video editing as a primary service.

---

#### Task 2 — Fix or remove the stats counter

**File:** `index.html`

Currently: `5+ Projects Completed`, `3+ Happy Clients`, `8+ Services Offered`, `100% Client Satisfaction`.

`3+ Happy Clients` is worse than showing nothing — it reads as a beginner. `100% Client Satisfaction` is an unverifiable claim that every template site makes.

Two acceptable outcomes:
- **(a)** Replace with real, specific, verifiable numbers supplied by the owner. Prefer system-level metrics over vanity counts — calls handled, leads qualified, minutes of conversation, months of uptime.
- **(b)** Delete the section entirely and let the case studies carry the credibility.

Default to **(b)** if fill data isn't provided. Never keep the current numbers.

---

#### Task 3 — Replace the portfolio with real case studies

**Files:** `portfolio.html`, and the "Selected Projects" block on `index.html`

This is the highest-leverage change on the site. Current state: `AI-Generated Video #1 / #2 / #3` with emoji tiles linking to an Instagram *profile* (not even to specific posts), plus placeholder cards labelled "Business Website" and "E‑commerce Store" that link back to the portfolio page. It reads as an empty portfolio, which is worse than a short one.

Build 3–4 case study cards. Fixed structure for each:

```
[Category label]        e.g. Aesthetic clinic · Delhi
[Headline]              What the system does, one line
[The problem]           2 sentences, in the client's language not ours
[What was built]        3-4 bullets, named components (Bolna agent, n8n, WhatsApp API, Sheets)
[Result]                1-3 concrete numbers  <!-- FILL -->
[Stack tags]            small pills
```

Card set to build (owner supplies the specifics):
1. Aesthetic clinic — outbound lead-recall voice agent, CRM-connected
2. Real estate brokerage — inbound Hinglish voice agent + listing scraper + nurture pipeline
3. Used car dealership — WhatsApp lead qualification, showroom visits as the KPI
4. Optional fourth — social/content system, only if it fits the new positioning

Homepage shows the top 2 with a link through to the full page. Kill the emoji tiles; see Task 6.

**Done when:** every project on the site is a real system with a real described outcome, and no card links to a bare Instagram profile.

---

#### Task 4 — Add a live demo

**Files:** `index.html`, new section; possibly a new `demo.html`

The single strongest asset this business has and the site doesn't use it: prospects can *talk to a working AI agent*. Competitors show screenshots.

Build a demo section with:
- A short explainer: what the agent does, roughly how long the call takes
- Primary path: a callback request form — name, phone, business type — posting to an n8n webhook (owner supplies the URL; use a `<!-- FILL: webhook URL -->` placeholder), which triggers the outbound demo call
- Secondary path: a click-to-call number for people who'd rather dial in
- Set expectations honestly: it's a demo agent, it's a real AI voice, calls are for demonstration

Also link the existing PDF lead magnets and HTML demo pages that already live under `/r/` — they're built and getting zero traffic from the site.

**Done when:** a visitor can get an AI agent to call them without opening WhatsApp.

---

#### Task 5 — Rework the packages page

**File:** `packages.html`

Currently lists ₹999 reel edits through ₹12,999 websites with Razorpay buy buttons. Two problems: the prices anchor every conversation far below current deal sizes, and public fixed pricing removes the qualification step the sales process depends on.

Preferred direction — turn it into **"How I work"**:
- The engagement model: discovery call → system design → build → go-live → retainer
- What a typical engagement includes, and realistic timelines
- Retainer explained: what ongoing support covers, why systems need it
- Price framing: "Systems start at ₹XX,XXX setup + monthly retainer, scoped to your call volume" — an anchor, not a menu
- CTA is booking a call, never a checkout

If the owner wants to keep self-serve checkout, keep at most one low-friction entry product and move it off the main nav. Do not keep the current six-tile pricing grid.

Ask the owner which direction before rewriting. Preserve the Razorpay integration code even if the section is removed — comment it out rather than deleting.

---

### P1 — Conversion and consistency

#### Task 6 — Replace emoji icons with SVG

**Files:** all pages, `assets/`

🤖 🌐 ✨ 🛒 ⚙️ 💳 📲 📆 are currently doing the job of an icon system. Emoji render differently on every device and read as templated.

Build a small inline SVG sprite — consistent stroke weight (1.5px), single accent colour, 24px grid. One icon per service and per stack tag. Keep them geometric and quiet; the case studies should be the loud part of the page, not the decoration.

---

#### Task 7 — Add lead capture

**Files:** `contact.html`, `index.html`, new `assets/js/form.js`

Every CTA on the site currently goes to `wa.me`. That's right for Indian mobile traffic but it's the only path — no form, no email, nothing for someone browsing on desktop at work or an overseas lead who doesn't use WhatsApp.

Add a short form: name, business type, what they're trying to fix, phone, optional email. POST to an n8n webhook (`<!-- FILL: webhook URL -->`). Client-side validation, honest error states, a real confirmation message that says what happens next and when.

Keep WhatsApp as the primary CTA. The form is the fallback, not the replacement.

---

#### Task 8 — Fix voice, and de-duplicate the header/footer

**Files:** all pages

**Voice:** `index.html` says "We are a small team" and "We help businesses." `services.html` says "My Services" and "I handle all kinds of AI-related work." Pick one and apply it everywhere. Recommendation: first person singular. It's true, it's differentiating for this buyer, and a solo operator who's clearly excellent beats a vague "small team."

**Duplication:** the nav and footer are copy-pasted into eight files, so every nav change is an eight-file edit. Also, footers are inconsistent — `services.html` is missing the legal links the others have.

Fix with the lightest possible tool: a small Node script that injects `partials/header.html` and `partials/footer.html` into each page at build time, or a plain JS include at runtime if the SEO tradeoff is acceptable (it usually isn't — prefer the build step). No framework.

---

### P2 — Polish

#### Task 9 — Trust, sharing, and technical hygiene

- **Testimonials:** add a section, 2–3 quotes with name, business, and city. `<!-- FILL -->` until supplied. Skip the section entirely rather than writing fake ones.
- **Instagram proof:** the owner's audience is on Instagram and the site barely mentions it. Add a small strip — handle, follower count, one line about the content.
- **Open Graph + Twitter card tags** on every page, plus a 1200×630 share image. Right now a link shared on WhatsApp previews as nothing, and WhatsApp is the main distribution channel.
- **Favicon** across sizes.
- **JSON-LD** `ProfessionalService` schema on the homepage: name, description, area served, contact.
- **Accessibility floor:** visible keyboard focus states, alt text on every image and SVG, colour contrast checked against the dark background, `prefers-reduced-motion` respected.
- **Legal pages:** verify `privacy.html`, `terms.html`, `refund.html` still describe the actual services after the repositioning.

---

## 5. Visual direction

The dark theme stays — it fits and it's already built. Refinement, not redesign.

**Palette** (anchor to the existing brand):
- Ink / background: `#16161A`
- Accent: `#378ADD`
- Derive 2–3 supporting neutrals for surfaces, borders, and muted text from these. Keep the accent scarce — CTAs and one highlight per section, nothing more.

**Type:** the current setup is a neutral delivery vehicle. Pick a display face with some character for headlines and pair it with a clean, highly readable body face — this audience reads on mid-range Android phones in bright light, so body size and contrast matter more than elegance. Set a real type scale rather than ad-hoc sizes.

**Motion:** one orchestrated moment, not scattered effects. A scroll reveal on the case studies is enough. Anything more and the site starts to feel AI-generated, which is a bad look for someone selling AI systems.

**The signature element** should be the live demo — it's the only thing on the site no competitor can copy. Design the page so that's what a visitor remembers.

---

## 6. Data the owner must supply before P0 can finish

Claude Code: block on these and ask, don't invent.

| # | Needed | Used in |
|---|--------|---------|
| 1 | Real project count and client count, or a decision to drop the stats section | Task 2 |
| 2 | Per case study: the problem, what was built, and 1–3 real result numbers | Task 3 |
| 3 | Whether client names may be used, or category descriptions only | Task 3 |
| 4 | Demo agent phone number and the n8n webhook URL for callbacks | Task 4 |
| 5 | Decision on packages: "How I work" page vs. keep checkout | Task 5 |
| 6 | Setup price anchor to publish, if any | Task 5 |
| 7 | n8n webhook URL for the contact form | Task 7 |
| 8 | Testimonials — quote, name, business, city | Task 9 |
| 9 | Instagram follower count | Task 9 |

---

## 7. Definition of done

- [ ] No page describes the business primarily as video editing or content creation
- [ ] No fabricated statistic, testimonial, or result appears anywhere
- [ ] Every portfolio item is a real system with a described outcome
- [ ] A visitor can request a live demo call without leaving the site
- [ ] Pricing either qualifies the lead or is absent — it never anchors low
- [ ] First person singular, consistently, on every page
- [ ] Header and footer live in one file each
- [ ] Every page passes at 375px width
- [ ] Link previews render correctly when shared on WhatsApp
- [ ] Keyboard focus is visible throughout; reduced motion respected
