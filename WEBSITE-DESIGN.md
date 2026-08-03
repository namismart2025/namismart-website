# Adding "Website Design" as a Service — Build Plan

Goal: add website design/development as a full peer service on namismart.com —
same nav weight, same page depth, same SEO treatment as Security Cameras,
Networking, Cabling, and Maintenance. Not a footnote, not shoehorned into the
homepage's existing camera/network narrative.

**Resume this in any chat window** — just say "read WEBSITE-DESIGN.md and
continue" and point at whichever step you're on.

---

## Hard constraints (don't break these)

- **Performance:** the site currently scores ~99 on PageSpeed. Any new page or
  homepage section must follow existing patterns exactly — Astro `<Image>`
  component (not raw `<img>`), `loading="lazy"` on below-fold images, no new
  JS libraries/frameworks, no heavy fonts. Test with PageSpeed Insights after
  each step that touches the homepage or adds images.
- **Don't touch the "What We Install" carousel** on the homepage
  (`src/pages/index.astro`, the `.caps` section, ~line 471-526). It's a
  focused "cameras + network as one system" pitch — even Structured Cabling
  and Maintenance don't get cards there. Web Design gets its own new section,
  not a slot in that one.
- **Match existing template patterns** — don't invent a new visual language.
  Every current service page (`security-cameras.astro`,
  `networking-wifi.astro`, `structured-cabling.astro`, `maintenance.astro`)
  follows: Hero → Service+FAQ JSON-LD → capability cards → process/features →
  areas covered → FAQ → CTA. New page should follow the same skeleton.
- **Brand voice callback:** the site's existing differentiator line is
  *"Most installers just mount cameras. We engineer the whole system."*
  (`index.astro` "Difference" section). Reuse that exact rhetorical pattern
  for web design copy — e.g. *"Most web designers hand you a template. We
  engineer a site that loads fast, ranks, and converts."* Ties the new
  service to the existing identity instead of feeling bolted on.

## Key files (already located)

| What | File |
|---|---|
| Site nav | `src/components/Header.astro` (the `nav` array, ~line 2-11) |
| Footer links | `src/components/Footer.astro` (SERVICES column, ~line 90-98) |
| Homepage | `src/pages/index.astro` |
| Template to copy from | `src/pages/security-cameras.astro` |
| Existing image spec doc (same style, reuse pattern) | `IMAGE-CHECKLIST.MD` |

---

## Step 1 — Build the service page

- Create `src/pages/website-design.astro`, following the
  `security-cameras.astro` skeleton (hero, Service + FAQPage JSON-LD, feature
  cards, process section, FAQ, CTA).
- URL: `/website-design`. Nav label: **"Web Design"**.
- Sections to include:
  - Hero: engineering-voice headline (see brand callback above) + subhead
  - "What's included" cards — e.g. design, build, mobile/responsive, SEO
    fundamentals, hosting/launch, ongoing edits
  - Process section (mirrors your install process — discovery → design →
    build → launch → support)
  - Portfolio strip (see Step 3)
  - FAQ (5-8 real questions: cost ballpark, timeline, do they need to provide
    content, do you handle hosting/domain, can you redesign an existing site,
    do you help with SEO)
  - CTA → `/contact`
- Title/meta pattern: `"Website Design & Development — Greater Los Angeles"` /
  description mirroring the style of other pages' `<Layout>` props.

## Step 2 — Wire it into navigation

- `Header.astro`: insert `{ label: 'Web Design', href: '/website-design' }`
  into the `nav` array — place it after Maintenance, before Industries (peer
  tier with the other 4 core services, not under Company-type links).
- `Footer.astro`: add `<a href="/website-design">Website Design</a>` to the
  SERVICES column, same tier as the other 4 service links.

## Step 3 — Homepage integration (new section, not the carousel)

- Add a compact standalone section lower on the homepage (after "The
  Difference" section or near the final CTA) introducing web design as a
  second core capability. 2-3 lines + link to `/website-design`. Does not
  replace or crowd the existing hero/carousel narrative.
- Low-risk optional add: include "WEBSITE DESIGN" as one more item in the
  existing homepage ticker component (`.ticker-inner` spans, ~line 380-393)
  — zero layout risk, free extra visibility, keep it consistent (duplicate
  the ticker item in both loop copies like the others).

## Step 4 — Portfolio proof

You have **3 real examples**: this site (namismart.com) + 2 others.

- Lead the portfolio strip with the 3 real ones. Your own site doubles as
  live proof — "the site you're looking at right now."
- If you want more visual variety, hypothetical/concept pieces are fine
  **but must be clearly labeled** ("Concept" / "Sample Design" badge on the
  card) — never presented as real client work. This matters for a
  trust-based local service business.
- Decide: does this live only on `/website-design`, or also get added to the
  existing `/projects` gallery as a new category? (Open question — see
  below.)
- Follow `IMAGE-CHECKLIST.MD`'s conventions for sizing/export specs when
  sourcing screenshots (16:9 card crops match the existing Project Gallery
  pattern).

## Step 5 — SEO + AI-search optimization

- **Schema:** Service + FAQPage JSON-LD on `/website-design`, same as other
  service pages (copy the pattern from `security-cameras.astro` lines ~29-49).
- **On-page targets:** local commercial terms ("website design [city]",
  "small business web designer near me"), don't over-index on the
  cross-sell angle ("web design for security clients") — most searchers just
  want a local web designer.
- **AI answer-engine optimization:** write FAQ answers as direct,
  self-contained paragraphs (no "click here" — answer engines lift text
  verbatim). Fast page load matters here too (same PageSpeed constraint).
- **Internal linking:** add to About's capability list, link from `/projects`
  if portfolio lives there, link from any future blog post on the topic.
- **Before finalizing copy/titles:** run proper keyword research (same
  Google Trends method used for the security camera keyword work — see
  memory `reference_google_trends_access.md`) rather than guessing terms.

## Step 6 — Blog support (later, optional)

- 1-2 posts once the page is live, following the existing
  [blog post checklist] pattern (always link back to the matching service
  page). Ideas: "Why Your Local Business Website Needs an Update in 2026",
  something on AI search changing how people find local businesses.

---

## Open questions (answer when resuming, or I'll make a reasonable call)

1. Does the portfolio live on `/website-design` only, or also get added as a
   new category on `/projects`?
2. Any pricing/package info on the page, or contact-for-quote only (matches
   current pattern — no other service page lists prices)?
3. Do you want a distinct "web design" style callout on the site (e.g. a
   small badge like "we practice what we preach") or keep it visually
   identical to the other service pages?

## Status

- [x] Step 1 — build `/website-design` page. Live at `src/pages/website-design.astro`,
      verified desktop + mobile in browser, no console/build errors. Hero image is a
      generated brand-matched browser-window mockup (`scripts/generate-website-design-hero.mjs`
      → `src/assets/images/website-design-hero-mockup.png`), not a real screenshot yet —
      swap for a real one in Step 4 if desired. OG image generated too
      (`og-website-design.png`, added as a new entry in `scripts/generate-og.mjs`).
      Portfolio section currently shows a placeholder note pointing to Contact —
      fill in once Step 4 photos/screenshots are ready.
- [x] Step 2 — nav + footer wiring. Added "Web Design" to `Header.astro` nav
      (peer position, between Maintenance and Industries) and "Website Design"
      to `Footer.astro`'s SERVICES column. Verified in-browser at 375/900/1024/1440px
      and in the mobile hamburger menu.
      **Found and fixed a pre-existing header bug while testing:** the desktop
      nav + status pill + CTA button required more width than the header's
      860px mobile breakpoint accounted for, so on real laptop/tablet widths
      (~860–1090px) the nav already overlapped the "REQUEST ESTIMATE" button
      before this change — adding a 9th (two-word) nav item made the overlap
      zone larger. Fixed by raising the breakpoint to 1200px (matches actual
      content width) and adding `white-space: nowrap` to nav links so
      "Web Design" can't wrap onto two lines. This is a general header fix,
      not scoped to website-design — it improves nav on every page.
- [x] Step 3 — homepage section (+ ticker item). Added a standalone `.wd-banner`
      section to `index.astro`, placed between "The Difference" and "Service Area"
      — does not touch the `.caps` carousel. Callout-style card (matches the
      `.callout` pattern from service pages): headline + "the site you're on
      right now is one of ours" copy + 3 tag pills + CTA link to `/website-design`.
      Also added "WEBSITE DESIGN" to the homepage ticker (both loop copies).
      Verified section order, content, and no-overflow at 375px/1440px, no
      console/build errors.
- [x] Step 4 — portfolio. Used 3 real examples, no fictional/concept pieces
      needed: NaMiVisa (private workout journal — namivisa.com), Casa Privée
      (luxury property rentals, pre-launch — casaprivee.vercel.app), and
      NaMiSmart itself. Captured via a new script
      (`scripts/capture-portfolio-screenshots.mjs`, Playwright) — real desktop
      (1440x900) + mobile (390x844) screenshots for all 3, saved to
      `src/assets/images/portfolio/`. Per your idea, each portfolio card shows
      both: a desktop screenshot with a small mobile-screenshot inset in the
      corner, to visually back up the mobile-first claim. Cards link out to
      the live site. Casa Privée is tagged "In Development" rather than
      presented as fully launched — kept the labeling honest per the plan's
      own portfolio rule.
      **Did not log into the NaMiVisa demo account** — credential entry is
      off-limits regardless of context, even for your own site. Only the
      public landing page was captured. If you want the logged-in
      dashboard/demo views included, log in yourself and send screenshots
      directly.
      Decided (per my earlier recommendation, not re-litigated): portfolio
      lives on `/website-design` only, not duplicated on `/projects`, since
      that page is themed specifically around physical camera/network
      installs.
      Verified: all 6 images render via Astro's image pipeline (resized +
      WebP), no overlap between the mobile inset and card text, no
      console/build errors, checked at 375px and 1440px.

      **Follow-up fix:** originally the whole card was a link straight to the
      live site, so clicking a screenshot just navigated away with no way to
      see it larger first — confusing, no visual cue it was clickable. Fixed
      by adding a proper lightbox: clicking the screenshot now opens a modal
      with bigger desktop + mobile shots and a hover hint ("View screenshots"),
      while a separate "Visit live site →" link in the card body handles
      navigating away. Verified open/close (click, backdrop click, Escape key)
      and mobile layout (shots stack vertically, no overflow).

      **Bigger follow-up — full in-site gallery:** you didn't want visitors
      leaving the site to view a project, and wanted multiple pages per
      project browsable in place, not just one screenshot. Rebuilt the
      portfolio around that:
      - Captured extra real pages per project with a rewritten
        `scripts/capture-portfolio-screenshots.mjs` (Playwright): NaMiVisa now
        includes the public demo app's Dashboard, Progress, Body Metrics, and
        AI Coach pages (confirmed "Open Demo Account" needs no credentials,
        just a click). Casa Privée adds Properties, a Property Detail page,
        Event Types, and How It Works. NaMiSmart adds Security Cameras,
        Project Gallery, and Contact (chosen to show off the spam-protected
        form — "Click to reveal" + hCaptcha).
      - The lightbox is now a real gallery/carousel: prev/next arrows, a
        clickable thumbnail filmstrip, keyboard arrow-key navigation, a
        counter ("2 / 6 — Dashboard"), wraps around at both ends.
      - The external link is no longer a prominent button — it's a small,
        muted text line at the bottom of the lightbox only ("View live at
        namivisa.com ↗"), removed entirely from the card itself. Visitors can
        still verify it's real without anything inviting them to leave.
      - **Two real bugs found and fixed:** (1) thumbnail buttons are created
        in client-side JS (`document.createElement`) — Astro's scoped
        `<style>` only auto-attaches to elements present in the template at
        build time, so the thumbnail sizing CSS was silently not applying at
        all. Fixed with a small `<style is:global>` block for just those
        elements. (2) the image stage div was collapsing to ~2px tall —
        `height:100%` on the image against a parent sized only by
        `max-height` doesn't establish a real height. Fixed by giving the
        stage an explicit `height`, not just `max-height`.
      - NaMiVisa's demo app only renders real data via actual link clicks
        after the "Open Demo Account" click — a hard page reload into an
        authenticated route shows an empty loading skeleton forever. The
        capture script replicates the real click path, not direct URL
        navigation, for that project.
      Verified: gallery counts correct per project (6/6/5 images including
      the mobile shot), prev/next/thumbnail/keyboard navigation, wraparound,
      no overflow or console errors at 375px and 1440px.
- [x] Step 5 — SEO/schema/keyword research (mostly done; one item deferred).
      Schema (Service + FAQPage JSON-LD) and title/meta were already in place
      from Step 1 — checked them against current best practice via web search
      (service+city title pattern, high-intent CTA language like "quote" /
      "consultation") and they already match; no changes needed.
      Added internal link: About page bio now links to `/website-design`
      ("I also design and build websites — including this one...").
      **Google Trends pull — done** (LA DMA, past 90 days, via the in-app
      browser once signed into Google — Chrome extension wasn't needed this
      time). Findings:
      - `small business website design` (exact phrase) — too low volume to
        be a reliable target, mostly zero with one spike. Not worth
        targeting directly.
      - `website design` — the strong, steady term (60-100 interest through
        May-June, cooling to 15-30 by early Aug, normal seasonal pattern).
        Confirms this is the right anchor phrase — already used correctly in
        the page title/nav/H1 area. No copy changes made; existing targeting
        validated by real data.
      - `web designer` — noisy/low value, polluted by job-seeker queries
        ("web designer jobs near me"). Not worth targeting.
      - Rising related queries under `website design` skew toward cost
        ("law firm website design cost") and industry-specific searches
        ("lawyer website design chicago", "wordpress website design
        services"). The page's existing cost FAQ already covers the cost
        intent. Industry-specific angles are a good candidate for future
        blog posts (Step 6), not a reason to rewrite this page.
      **Not done, flagged for later, not this pass:** dedicated city/service-area
      pages for website design (the site has these for camera/network services
      — Burbank, SFV, Ventura County, etc. — website design doesn't have them
      yet). Worth considering once there's real demand signal, not before.
- [ ] Step 6 — blog posts
