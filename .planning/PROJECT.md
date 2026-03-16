# Personal Blog

## What This Is

一个基于 Next.js 的静态技术博客网站，用于分享技术文章和开发经验。内容以 Markdown 编写，静态生成，配合第三方服务实现动态功能（搜索、统计）。目标读者是技术社区，帮助他人学习同时沉淀个人知识。

## Core Value

提供快速、简洁的阅读体验，让读者专注于技术内容本身。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 基于 Next.js SSG 静态生成，Markdown 文档即数据源
- [ ] 代码高亮支持，适配多种编程语言
- [ ] 文章按分类和标签组织，方便导航
- [ ] 全文搜索功能，可以快速找到相关文章
- [ ] 支持浅色/深色主题切换
- [ ] 极简简洁设计风格，突出内容可读性
- [ ] 可一键部署到 Vercel

### Out of Scope

- [用户注册/系统] — 博客是只读的，不需要用户系统
- [在线写文章后台] — 本地 Markdown 编写，CI/CD 部署足够
[复杂多人协作] — 单一作者，不需要权限管理

## Context

这是一个全新的绿色项目，从零开始构建。选择 Next.js 作为框架，利用其 SSG 能力获得最佳性能。

## Constraints

- **Framework**: Next.js (React) — 生态成熟，便于后续扩展
- **Architecture**: Static Site Generation (SSG) — 文档即数据，无需数据库
- **Deployment**: Vercel — 一键部署，与 Next.js 最佳集成
- **Design**: 极简简洁风格 — 减少不必要的视觉干扰

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 选择静态博客架构 | 文档即数据，不需要数据库，简单高效 | ✓ Good |
| 选择 Next.js 框架 | React 生态成熟，SSG 支持完善，适合现代博客 | ✓ Good |
| 支持深色模式 | 用户需求明确，现代博客标配 | ✓ Good |
| 极简简洁设计 | 突出技术内容阅读体验 | ✓ Good |

---
*Last updated: 2026-03-16 after initialization*
