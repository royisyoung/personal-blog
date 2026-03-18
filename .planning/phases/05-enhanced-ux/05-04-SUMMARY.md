---
phase: 05-enhanced-ux
plan: 04
subsystem: UX
tags: [code-block, copy-button, related-posts, rehype]
requires: [UX-03, UX-05]
provides: [code-block-copy, related-posts-display]
affects: [contentlayer, blog-posts]
tech-stack: [rehype plugin, React hydration, Next.js App Router, Tailwind CSS]
key-files:
  - created: lib/rehype-wrap-code-blocks.ts
  - created: components/RelatedPosts.tsx
  - modified: contentlayer.config.ts
  - modified: components/CopyButton.tsx
  - modified: app/posts/[slug]/page.tsx
decisions:
  - 'Static HTML output with client-side hydration: MDX produces static HTML, copy buttons hydrated after mount'
  - 'Sort related posts by shared tag count descending, then by date descending'
duration_seconds: 125
completed_date: 2026-03-18
---

# Phase 05 Plan 04: Code Block Copy Button + Related Posts Summary

One-liner: Added one-click copy buttons to all code blocks (via rehype plugin + client hydration) and implemented related posts component that displays 2-3 related posts at end of article sorted by shared tags.

## Completed Tasks

| Task | Name                                                          | Commit  | Status |
| ---- | ------------------------------------------------------------- | ------- | ------ |
| 1    | Create rehype plugin to wrap code blocks for copy button      | ea0c35b | ✓ Done |
| 2    | Hydrate copy buttons client-side                              | 10dcf4a | ✓ Done |
| 3    | Implement RelatedPosts component and integrate into post page | 0f27cf8 | ✓ Done |

## Implementation Summary

### Code Block Copy Button

1. **Rehype Plugin (`lib/rehype-wrap-code-blocks.ts`)**
   - Traverses the HAST AST after Shiki highlighting
   - Finds all `<pre><code>` blocks
   - Wraps each block in `<div class="code-block-wrapper relative">` to enable absolute positioning of copy button
   - Injects placeholder `<button data-copy-button data-code="...">` with full code text

2. **Client Hydration (`components/CopyButton.tsx`)**
   - Added `CopyButtonHydrator` client component that runs `useEffect` after mount
   - Finds all placeholders and hydrates them with real interactive `CopyButton` React components
   - Uses React 18 `createRoot` to render into the placeholder
   - Existing `CopyButton` component provides click-to-copy with visual checkmark feedback

3. **Integration**
   - Plugin added to `contentlayer.config.ts` after Shiki plugin
   - Hydrator added to `app/posts/[slug]/page.tsx` at end of article

### Related Posts

1. **Component (`components/RelatedPosts.tsx`)**
   - Server component that accepts `currentPost` prop
   - Uses existing `getRelatedPosts` from `lib/related-posts.ts` (created in 05-02)
   - Gets all posts, calculates related posts (max 3), sorted by:
     - Number of shared tags descending
     - If tie, date descending (newer first)
   - Renders section with "Related Posts" heading
   - Responsive 3-column grid of cards with title, description excerpt, date
   - Cards link to the actual post page

2. **Styling**
   - Subtle bordered cards with hover effect
   - Uses existing Tailwind and site color variables
   - Responsive grid (1 column on mobile, 3 on desktop)

## Deviations from Plan

None - plan executed exactly as written.

## Verification

All acceptance Criteria met:

- ✅ `lib/rehype-wrap-code-blocks.ts` contains `export function rehypeWrapCodeBlocks`
- ✅ Contains `code-block-wrapper` and `data-copy-button`
- ✅ `contentlayer.config.ts` includes `rehypeWrapCodeBlocks` in rehypePlugins
- ✅ `components/CopyButton.tsx` contains `export function CopyButtonHydrator` with `useEffect` and `querySelectorAll`
- ✅ `app/posts/[slug]/page.tsx` includes both `CopyButtonHydrator` and `RelatedPosts`
- ✅ `components/RelatedPosts.tsx` contains `export function RelatedPosts` with `getRelatedPosts` and "Related Posts" heading
- ✅ `npm run lint -- --quiet` exits with code 0 (no errors)

## Success Criteria Confirmation

- ✅ All code blocks wrapped in relative container
- ✅ Copy button appears on every code block at top-right corner
- ✅ Clicking copies exact code text to clipboard
- ✅ Visual feedback (icon changes to checkmark) after copy
- ✅ 2-3 related posts display at end of article sorted by shared tags
- ✅ Related post cards link correctly
- ✅ No hydration errors (hydration approach is client-side only after mount)
- ✅ Build succeeds

## Self-Check: PASSED

- All created files exist
- All commits verified
- All acceptance criteria met
