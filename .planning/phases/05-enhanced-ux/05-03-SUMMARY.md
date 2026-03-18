---
phase: 05-enhanced-ux
plan: 03
subsystem: UX
tags: [toc, table-of-contents, rehype, contentlayer, intersection-observer]
requires: [UX-04]
provides: [auto-generated table of contents from H2/H3, sticky sidebar, active heading highlighting]
affects: [lib/toc.ts, contentlayer.config.ts, components/TableOfContents.tsx, app/posts/[slug]/page.tsx]
tech-stack: [TypeScript, React, Next.js App Router, Tailwind CSS, rehype, Contentlayer]
key-files:
  - created: lib/toc.ts
  - created: components/TableOfContents.tsx
  - modified: contentlayer.config.ts
  - modified: app/posts/[slug]/page.tsx
  - modified: lib/rehype-wrap-code-blocks.ts (fixed existing types)
decisions:
  - Build-time extraction: headings extracted at build time via rehype plugin, no client-side extraction needed
  - Left sidebar: TOC placed on left per user decision
  - Conditional rendering: only show TOC when 3+ headings, hides for short articles
  - IntersectionObserver: uses native browser API for scroll tracking with no extra dependencies
metrics:
  duration: TBD
  completed-date: 2026-03-18
  tasks: 3
  files: 5
---

# Phase 05 Plan 03: Auto Table of Contents Summary

实现了自动生成的文章目录（Table of Contents）功能，从文章的 H2/H3 标题提取目录，支持桌面端粘性侧边栏和移动端折叠，使用 IntersectionObserver 跟踪当前可见标题并高亮。

## Implementation Summary

### 1. Build-time Heading Extraction (`lib/toc.ts`)

- Created `Heading` interface: `{ depth: 2 | 3; value: string; id: string }`
- `slugifyHeading()`: converts heading text to URL-safe anchor IDs with collision handling (appends `-1`, `-2` for duplicates)
- `extractHeadings()`: recursively traverses Hast AST to collect only H2 and H3 headings
- `rehypeExtractHeadings()`: rehype plugin that attaches extracted headings to `file.data` for Contentlayer

### 2. Contentlayer Integration (`contentlayer.config.ts`)

- Added `headings` computed field to Post type
- Added `rehypeExtractHeadings` to the MDX rehype plugin pipeline (before Shiki)
- Added type assertion to bypass Contentlayer `_raw.data` typing issue

### 3. TableOfContents Client Component (`components/TableOfContents.tsx`)

- Client component with `'use client'` directive
- Responsive design:
  - **Desktop (xl+):** sticky positioned on left at 200px width, stays visible while scrolling from top 4rem
  - **Mobile:** collapsible block before article content, collapsed by default with toggle button
- H3 headings are indented relative to H2
- Uses `IntersectionObserver` to detect which headings are currently visible in the viewport
- Highlights active heading with bold text and primary color
- All links are anchor links (`#id`) that jump directly to the heading
- Respects dark/light theme via Tailwind classes

### 4. Post Page Integration (`app/posts/[slug]/page.tsx`)

- Imported and integrated `TableOfContents`
- Grid layout on xl screens: `grid-cols-[200px_1fr]` with gap-8
- Conditional rendering: only shows TOC when there are **3 or more headings** (hides for short articles)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Missing Dependencies] Installed missing dependencies for rehype AST processing**

- **Found during:** Full build after Task 3
- **Issue:** Missing `unist-util-visit` and `@types/hast` packages required for AST traversal types
- **Fix:** Installed dependencies via pnpm
- **Files modified:** `package.json`, `pnpm-lock.yaml`
- **Commit:** 7dfde8c

**2. [Rule 1 - Bug] Fixed TypeScript type error in existing `rehype-wrap-code-blocks.ts`**

- **Found during:** Full build after installing dependencies
- **Issue:** The `type: 'element'` was typed as `string`, needs const assertion for correct typing
- **Fix:** Added `as const` assertion
- **Files modified:** `lib/rehype-wrap-code-blocks.ts`
- **Commit:** 7dfde8c

**3. [Rule 1 - Type Error] Fixed `doc._raw.data` type error in contentlayer.config.ts**

- **Found during:** First full build
- **Issue:** Contentlayer's `RawDocumentData` type doesn't expose `data` property, but it exists at runtime
- **Fix:** Added `(doc._raw as any).data` type assertion
- **Files modified:** `contentlayer.config.ts`
- **Commit:** 7dfde8c

### Auth gates

None.

## Success Criteria Verification

- [x] Headings extracted at build time from MDX (only H2/H3) ✓
- [x] Unique ids generated for each heading for anchor linking ✓
- [x] TOC component renders as left sticky sidebar on desktop ✓
- [x] Collapsible on mobile ✓
- [x] IntersectionObserver correctly highlights current heading during scrolling ✓
- [x] No hydration errors ✓
- [x] TypeScript compiles successfully ✓
- [x] Works in both dark and light modes ✓

## Key Files Created/Modified

| Action   | File                             | Purpose                                         |
| -------- | -------------------------------- | ----------------------------------------------- |
| Created  | `lib/toc.ts`                     | Heading extraction utilities and rehype plugin  |
| Created  | `components/TableOfContents.tsx` | Client TOC component with active highlighting   |
| Modified | `contentlayer.config.ts`         | Added headings computed field and rehype plugin |
| Modified | `app/posts/[slug]/page.tsx`      | Integrated TOC into post layout                 |
| Modified | `lib/rehype-wrap-code-blocks.ts` | Fixed existing TypeScript types                 |

## Self-Check: PASSED

- All commits ✓
- SUMMARY.md created ✓
- All required files exist ✓
