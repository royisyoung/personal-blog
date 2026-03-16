---
phase: 01-project-foundation
plan: 02
subsystem: build configuration
tags: [next.js, tailwind, static-export, build-config]
dependency:
  requires: [initialized-next-project]
  provides: [static-export-config, dark-mode-config, pnpm-hoisting]
  affects: [build-output, deployment]
tech-stack:
  added: [next.config.ts: static export, tailwind.config.ts: class dark mode, .npmrc: pnpm hoist]
  patterns: [static-site-generation, class-based-dark-mode]
key-files:
  created: [.npmrc]
  modified: [next.config.ts, tailwind.config.ts]
decisions:
  - "Use output: 'export' for full static site generation compatible with any static host"
  - "Use unoptimized: true for images because Next.js image optimization doesn't work with static export"
  - "Use class-based dark mode to enable manual theme switching with user preference persistence"
  - "Configure pnpm hoisting for next/react modules to avoid resolution issues in strict hoisting mode"
metrics:
  duration: 2 minutes
  completed_date: 2026-03-16
  tasks_total: 3
  tasks_completed: 3
  files_changed: 3
---

# Phase 1 Plan 2: 核心构建选项配置总结

## One-liner

配置 Next.js 静态导出（output: export + 图片未优化）、Tailwind CSS class 深色模式、以及 pnpm hoisting 模式避免模块解析问题。

## 计划执行情况

| 任务 | 名称 | 状态 | 提交 |
|------|------|------|------|
| 1 | 配置 Next.js 静态导出 | ✅ 完成 | dfe1716 |
| 2 | 配置 Tailwind 深色模式 | ✅ 完成 | 3c39811 |
| 3 | 更新 .gitignore 和 pnpm 配置 | ✅ 完成 | d256f7c |

## 关键配置变更

### next.config.ts

已添加完整静态导出配置：

- `output: "export"` - 启用静态导出，生成 `out` 目录
- `images.unoptimized: true` - 禁用 Next.js 图片优化（兼容静态导出）
- `trailingSlash: true` - 生成 `/page.html` 格式，兼容静态托管
- `skipTrailingSlashRedirect: true` - 跳过重定向，优化输出

### tailwind.config.ts

已配置 class-based 深色模式：

- `darkMode: "class"` - 启用基于 class 的深色模式，支持后续手动切换主题

### .npmrc

新建文件配置 pnpm hoisting：

- `hoist-pattern[]=*next*` - hoist next 相关模块到根目录
- `hoist-pattern[]=*react*` - hoist react 相关模块到根目录

这解决了 pnpm 严格提升模式下 Next.js 偶尔遇到的模块找不到问题。

## 偏离计划

None - 计划完全执行，没有需要偏离的地方。

- out/ 已经存在于 .gitignore，无需额外添加

## 验证结果

- ✅ `pnpm build` 构建成功，无错误
- ✅ 静态导出成功生成 `out` 目录
- ✅ 所有验收标准满足

## 依赖和影响

- 依赖：已初始化的 Next.js + TypeScript 项目
- 提供：静态导出配置可用于构建静态站点，深色模式配置支持后续主题切换功能

## Self-Check: PASSED

- 所有任务已执行
- 每个任务都已独立提交
- SUMMARY.md 已创建
- 所有配置验证通过
- 构建成功
