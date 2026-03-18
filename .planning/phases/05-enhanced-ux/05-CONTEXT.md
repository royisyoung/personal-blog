# Phase 5: Enhanced UX Features — Context & Decisions

## Overview

Phase 5 adds 7 quality-of-life UX improvements to the blog after core functionality is complete. Goal: Improve reading experience with subtle, unobtrusive features that align with the project core value:

> "fast, clean reading experience that lets readers focus on technical content"

---

## UX-01: Reading Progress Bar

**Decision:**

- **Position:** Thin bar at the very top of the viewport
- **Height:** 2-3px (thin, minimal footprint)
- **Visibility:** Always visible while scrolling
- **Behavior:** Updates width dynamically based on scroll position (scroll Y ÷ total document height)
- **Styling:** Uses accent color of the site theme

**Rationale:** Subtle visual feedback that shows how much content remains. Doesn't interfere with reading.

---

## UX-02: Back to Top Button

**Decision:**

- **Position:** Fixed at bottom-right corner of the screen
- **Visual:** Circular button with upward arrow icon
- **Visibility:** Always visible (or fades in after scrolling past 1000px)
- **Animation:** Smooth scroll to top when clicked
- **Size:** Medium (48px × 48px) — easy to tap on mobile

**Rationale:** Convenient for long articles, especially on mobile where scrolling back up is tedious.

---

## UX-03: Code Block Copy Button

**Decision:**

- **Position:** Fixed at top-right corner of each code block
- **Interaction:** Click to copy → icon changes to checkmark for 2 seconds then reverts
- **Styling:** Follows site theme (dark/light mode) — semi-transparent background by default, solid on hover
- **Behavior:** Copies the raw code text to clipboard

**Rationale:** Readers frequently copy code examples from technical blogs — this is a huge quality of life improvement.

---

## UX-04: Auto-generated Table of Contents

**Decision:**

- **Position:** Left sidebar at the beginning of the article
- **Scope:** Only includes H2 and H3 headings (H1 is article title)
- **Behavior:** Highlights current heading while scrolling through article
- **Positioning:** Sticky to top when scrolling (stays visible)
- **Collapsible:** On mobile: collapsed by default, can expand

**Rationale:** Helps readers navigate long articles, jump to sections of interest. Aligns with technical blog use case.

---

## UX-05: Related Posts

**Decision:**

- **Quantity:** Show 2-3 related posts at the end of the article
- **Sorting:** By number of shared tags (more shared tags = more relevant)
- **Display:** Show title + excerpt + publish date
- **Position:** After article content, before comments section (if comments enabled)

**Rationale:** Keeps readers engaged, helps discover more content on similar topics. Improves site navigation.

---

## UX-06: RSS Feed

**Decision:**

- **Generation:** Static generation at build time → output to `public/rss.xml`
- **Link Placement:** Footer alongside other links (social, about, etc.)
- **Content:** Include full article content in RSS (readers can read complete article in their RSS reader)
- **Format:** Standard RSS 2.0 format with proper metadata (title, link, pubDate, description/content)

**Rationale:** Static generation fits the SSG architecture perfectly, zero runtime cost. Full content is better for RSS subscribers.

---

## UX-07: Estimated Reading Time

**Decision:**

- **Placement:** Article metadata area below title (next to date, category, tags)
- **Calculation:** `totalWordCount ÷ 200 words per minute` → round up to nearest minute, minimum 1 minute
- **Word Counting:** Excludes code blocks from word count (code is scanned, not read word-by-word)
- **Display Format:** `"X min read"`

**Rationale:** 200 WPM is appropriate for technical content (readers pause to think about code/concepts). Excluding code gives a more realistic estimate. Helps readers decide if they have enough time to read now or save it for later.

---

## Summary of All Decisions

| Feature                | Decision                                           |
| ---------------------- | -------------------------------------------------- |
| Reading Progress Bar   | Top thin bar, updates on scroll                    |
| Back to Top            | Bottom-right fixed button, smooth scroll           |
| Copy Button            | Code block top-right, visual feedback              |
| Table of Contents      | Left sticky sidebar, H2/H3 only, highlight current |
| Related Posts          | 2-3 at end, sorted by shared tags                  |
| RSS Feed               | Static build-time, footer link, full content       |
| Estimated Reading Time | Below title, 200 WPM, exclude code                 |

---

## Implementation Notes

- All features should be subtle and unobtrusive — don't distract from content
- All interactive features should respect dark/light theme
- All client-side features should have smooth animations (no jarring movements)
- Keep CSS minimal, avoid unnecessary JavaScript
- Mobile-first responsive design

## Success Criteria

1. All 7 features implemented according to decisions above
2. All features work correctly in both dark and light modes
3. All features responsive on mobile devices
4. No impact on static export build process
5. No hydration errors in Next.js

Next step: Create implementation plan → `05-PLAN.md`
