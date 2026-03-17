---
phase: 02-core-content-infrastructure
plan: 02-01
subsystem: content
tags: [contentlayer, next.js, setup, dependencies]
dependency_graph:
  requires: []
  provides: [contentlayer-setup, nextjs-contentlayer-integration]
  affects: [content-infrastructure]
tech-stack:
  added: [contentlayer 0.3.4, next-contentlayer 0.3.4, shiki 4.0.2]
  patterns: [contentlayer.config.ts, content processing at build time]
key-files:
  created: [contentlayer.config.ts]
  modified: [package.json, pnpm-lock.yaml, next.config.ts, .env.example, .gitignore]
decisions:
  - "Corrected package name: used next-contentlayer instead of @contentlayer/next (package doesn't exist in npm registry)"
  - 'Fixed import paths: defineDocumentType and makeSource from contentlayer/source-files (not from contentlayer/core)'
  - 'Approved required build scripts for contentlayer, esbuild and protobufjs due to pnpm strict-optional-sidebar'
metrics:
  duration_seconds: 324
  completed_date: 2026-03-17
  tasks_total: 2
  tasks_completed: 2
  files_changed: 6
---

# Phase 02 Plan 02-01: Contentlayer 安装与基础配置总结

## One-liner

成功安装并配置了 Contentlayer 与 Next.js 15 的集成，修复了包名和导入路径问题，构建验证通过。Contentlayer 现在可以从 `content/` 目录处理 MDX 内容文件，为后续定义文档类型做好了准备。

## Completed Tasks

| Task | Name | Commit | Files |
| --- | --- | --- | --- |
| 1 | Install Contentlayer and Shiki dependencies | abd9eaa | package.json, pnpm-lock.yaml |
| 2 | Configure Contentlayer with Next.js | 549d855 | next.config.ts, contentlayer.config.ts, .env.example, .gitignore |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected package name for Next.js integration**

- **Found during:** Task 1
- **Issue:** Plan specified `@contentlayer/next` which doesn't exist in npm registry. The correct package name is `next-contentlayer`.
- **Fix:** Changed to `next-contentlayer` which is the correct published package for Next.js integration.
- **Files modified:** package.json, pnpm-lock.yaml
- **Commit:** abd9eaa

**2. [Rule 1 - Bug] Fixed incorrect import paths for defineDocumentType and makeSource**

- **Found during:** Task 2 / build verification
- **Issue:** Initial configuration followed plan import paths which caused export errors. `defineDocumentType` and `makeSource` are actually exported from `contentlayer/source-files`.
- **Fix:** Corrected imports to import both from `contentlayer/source-files`.
- **Files modified:** contentlayer.config.ts
- **Commit:** 549d855

**3. [Rule 3 - Auto-fix] Approved missing build scripts**

- **Found during:** Task 2 / build verification
- **Issue:** pnpm ignored build scripts for contentlayer, esbuild and protobufjs by default, causing missing @contentlayer packages in node_modules.
- **Fix:** Ran `pnpm approve-builds` to allow build scripts to execute and complete installation.
- **Files modified:** pnpm-lock.yaml (indirect)
- **Commit:** 549d855

### Authentication Gates

None.

## Verification Results

- All dependencies installed ✓
- package.json contains contentlayer, next-contentlayer, shiki ✓
- next.config.ts wrapped with withContentlayer ✓
- contentlayer.config.ts exists with basic configuration ✓
- .env.example contains CONTENTLAYER_ENABLED=true ✓
- `pnpm build` completes successfully ✓
- Contentlayer generated 0 documents (expected since no document types defined yet) ✓

## Success Criteria Verification

All success criteria met:

- [x] All required dependencies installed successfully
- [x] Contentlayer plugin integrated into Next.js configuration
- [x] contentlayer.config.ts file exists with correct base configuration
- [x] pnpm build completes without configuration errors

## Self-Check: PASSED

- All created files exist: contentlayer.config.ts ✓
- All commits verified: abd9eaa, 549d855 ✓
