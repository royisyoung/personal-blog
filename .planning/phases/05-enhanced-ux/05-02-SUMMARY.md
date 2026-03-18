---
phase: 05-enhanced-ux
plan: 02
subsystem: core
tags: [testing, contentlayer, ux]
dependency:
  requires: [contentlayer setup]
  provides: [readingTime, relatedPosts, vitest testing]
  affects: [Post type, post page]
tech-stack:
  added: [vitest, @testing-library/react, @testing-library/jest-dom, jsdom]
  patterns: [build-time calculation, contentlayer computed fields]
key-files:
  created: [vitest.config.ts, tests/setup.ts, lib/reading-time.ts, lib/related-posts.ts]
  modified: [package.json, pnpm-lock.yaml, contentlayer.config.ts, app/posts/[slug]/page.tsx]
decisions:
  - Use 200 WPM reading speed standard
  - Exclude code blocks from reading time calculation
  - Sort related posts by shared tag count then by recency
metrics:
  duration: 120 seconds
  completed-date: 2026-03-18
  tasks: 3
  files: 8
---

# Phase 05 Plan 02: Reading Time & Related Posts Summary

## One-Liner

搭建了 Vitest 测试基础设施，实现了排除代码块的预计阅读时间计算和基于共享标签排序的相关文章推荐功能。

## Completed Tasks

| Task | Name | Commit | Files |
| --- | --- | --- | --- |
| 1 | Setup Vitest testing infrastructure | a84f0f8 | package.json, pnpm-lock.yaml, vitest.config.ts, tests/setup.ts |
| 2 | Implement estimated reading time calculation | a648a57 | lib/reading-time.ts, contentlayer.config.ts, app/posts/[slug]/page.tsx |
| 3 | Implement related posts calculation | a70a21f | lib/related-posts.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect import package name in vitest.config.ts**

- **Found during:** Task 1 verification
- **Issue:** Wrote `@vite/plugin-react` instead of `@vitejs/plugin-react`
- **Fix:** Corrected package name and installed the missing dependency
- **Files modified:** vitest.config.ts, package.json
- **Commit:** a84f0f8

**2. [Rule 1 - Bug] Fixed alias import in contentlayer.config.ts**

- **Found during:** Contentlayer build
- **Issue:** `@/lib/reading-time` alias doesn't work in Contentlayer's standalone build
- **Fix:** Changed to relative path import `./lib/reading-time`
- **Files modified:** contentlayer.config.ts
- **Commit:** a70a21f

### Auth Gates

None - all dependencies were installable without authentication.

## Verification

All acceptance criteria met:

- ✅ All dev dependencies installed: vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- ✅ `vitest.config.ts` exists with correct configuration (defineConfig, environment: jsdom)
- ✅ `tests/setup.ts` exists and imports jest-dom
- ✅ `npx vitest run --passWithNoTests` exits with 0
- ✅ `calculateReadingTime` exported from `lib/reading-time.ts`
- ✅ Function excludes code blocks using `/```[\s\S]*?```/g` regex
- ✅ Calculation uses 200 WPM, `Math.ceil`, minimum 1 minute
- ✅ `readingTime` added as computed field to Post
- ✅ Reading time displayed in post page header (`min read`)
- ✅ `getRelatedPosts` exported with correct type signature
- ✅ Counts shared tags, sorts by `sharedTags descending, date descending`
- ✅ Handles edge case when current post has no tags
- ✅ Handles case when fewer than limit posts have shared tags
- ✅ `npm run lint -- --quiet` exits with 0
- ✅ `readingTime` field present on Post type in generated Contentlayer types

## Success Criteria Check

- [x] Vitest infrastructure configured and working
- [x] Reading time correctly calculated excluding code blocks
- [x] Reading time displayed in post header
- [x] Related posts algorithm correctly sorts by shared tags
- [x] No lint errors after adding computed field

## Open Notes

- Contentlayer build exited with a non-critical TypeError but types were generated correctly and `readingTime` is present on the Post type
- Full build error is unrelated to this change (existing issue with dynamic = force-dynamic and output: export on /api/og)

## Self-Check: PASSED

- All created files exist
- All commits verified
- All acceptance criteria checked
