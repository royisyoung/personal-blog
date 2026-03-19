---
status: testing
phase: 05-enhanced-ux
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md, 05-03-SUMMARY.md, 05-04-SUMMARY.md, 05-05-SUMMARY.md, 05-06-SUMMARY.md]
started: 2026-03-18T08:50:52Z
updated: 2026-03-18T08:50:52Z
---

## Current Test

number: 1 name: Cold Start Smoke Test expected: | Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch. Server boots without errors, any seed/migration completes, and a primary query (health check, homepage load, or basic API call) returns live data. awaiting: user response

## Tests

### 1. Cold Start Smoke Test

expected: Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch. Server boots without errors, any seed/migration completes, and a primary query (health check, homepage load, or basic API call) returns live data. result: [pending]

### 2. Reading Progress Bar

expected: A thin progress bar displays fixed at the top of the viewport when reading an article. As you scroll down the article, the progress bar width increases smoothly to reflect how much you've read. result: [pending]

### 3. Back to Top Button

expected: Button is fixed at bottom-right corner. It fades in only after you scroll past 400px. Clicking the button triggers smooth animated scroll back to the top of the page. result: [pending]

### 4. Copy Button on Code Blocks

expected: Every code block has a copy button positioned at the top-right corner. Clicking the button copies the exact code text to your clipboard. After copying, the icon changes to a green checkmark for 2 seconds to provide visual feedback. result: [pending]

### 5. Estimated Reading Time Display

expected: The article header displays an estimated reading time in minutes ("X min read"). Reading time calculation excludes code blocks from the word count. result: [pending]

### 6. Related Posts Calculation

expected: Related posts are correctly calculated by counting shared tags between posts. They are sorted by number of shared tags (descending), then by date (newest first) when tags are tied. Edge cases are handled (no shared tags, fewer than max related posts). result: [pending]

### 7. Auto-Generated Table of Contents

expected: All H2 and H3 headings are automatically extracted from the article at build time and displayed in the table of contents. Each entry links to the corresponding heading anchor. Only shows when there are 3 or more headings (hidden for short articles). result: [pending]

### 8. Table of Contents Responsive Design

expected: On desktop (xl screens), the TOC is a sticky sidebar positioned on the left that stays visible while scrolling. On mobile, the TOC is collapsed by default and can be toggled open/closed before the article content. result: [pending]

### 9. Active Heading Highlighting

expected: As you scroll through the article, the currently visible heading is highlighted in the TOC with bold text and the primary color. Highlighting updates smoothly as you scroll. result: [pending]

### 10. Code Block Wrapping & Copy Button Hydration

expected: All code blocks are wrapped in a relative container to position the copy button. Placeholder buttons are injected at build time and hydrated to interactive React components after page mount. No hydration errors occur. result: [pending]

### 11. Related Posts Display

expected: After the article content, a "Related Posts" section displays 2-3 related post cards. Cards show the post title, excerpt, and date. result: [pending]

### 12. Related Posts Navigation

expected: Clicking a related post card navigates to that post's page. Links work correctly. result: [pending]

### 13. Static RSS Feed Generation

expected: After build completes, a static RSS feed is generated at `public/rss.xml`. The feed contains all published posts. result: [pending]

### 14. RSS Feed Full Content

expected: Each RSS item includes the full article content in the `content:encoded` field for complete offline reading. result: [pending]

### 15. RSS Link in Footer

expected: The site footer displays an RSS subscription link with icon. Clicking opens the `/rss.xml` feed. The link has correct `rel="alternate" type="application/rss+xml"` attributes. result: [pending]

### 16. RSS Auto-Discovery

expected: The page HTML contains an auto-discovery link tag in the metadata that RSS readers and browsers can automatically detect. result: [pending]

### 17. Unit Test Suite

expected: All 33 unit tests pass when running `npm run test` or `npx vitest run`. Tests cover utility functions (reading-time, related-posts, toc) and components (ReadingProgressBar, BackToTopButton, CopyButton). result: [pending]

## Summary

total: 17 passed: 0 issues: 0 pending: 17 skipped: 0

## Gaps
