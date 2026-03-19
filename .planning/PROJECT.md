# Personal Blog

## What This Is

一个基于 Next.js 的静态技术博客网站，用于分享技术文章和开发经验。内容以 Markdown 编写，静态生成，配合第三方服务实现动态功能（搜索、统计）。目标读者是技术社区，帮助他人学习同时沉淀个人知识。

## Core Value

提供快速、简洁的阅读体验，让读者专注于技术内容本身。

## Requirements

### Validated

- ✓ 基于 Next.js SSG 静态生成，Markdown 文档即数据源 — v1.0
- ✓ 代码高亮支持，适配多种编程语言 — v1.0
- ✓ 文章按分类和标签组织，方便导航 — v1.0
- ✓ 全文搜索功能，可以快速找到相关文章 — v1.0
- ✓ 支持浅色/深色主题切换 — v1.0
- ✓ 极简简洁设计风格，突出内容可读性 — v1.0
- ✓ 可一键部署到 Vercel — v1.0
- ✓ 阅读进度条显示 — v1.0
- ✓ 返回顶部按钮 — v1.0
- ✓ 代码块一键复制 — v1.0
- ✓ 文章自动生成目录 — v1.0
- ✓ 相关文章推荐（基于标签）— v1.0
- ✓ RSS 订阅 — v1.0
- ✓ 预计阅读时间显示 — v1.0

### Active

(No active requirements — planning next milestone)

### Out of Scope

- 用户注册/登录系统 — 博客是只读的，增加安全维护开销，不符合 SSG 架构
- 在线写文章后台 — 需要数据库，增加运维复杂度，与"文档即数据"理念矛盾
- 复杂多人协作 — 单一作者博客，Git 协作已足够
- 服务器端动态功能 — 破坏全静态优势，需要服务器运维；使用第三方服务代替
- 富文本 WYSIWYG 编辑器 — 纯 Markdown 更简单，Git diff 友好
- 将长文章拆分为多页 — 损害阅读流和 SEO，保持单页
- 广告 — 干扰干净阅读体验，与极简理念矛盾

## Context

**Current State:** v1.0 已交付，功能完整可用。

这是一个从零开始构建的静态博客项目：

- 基于 Next.js 15 + Contentlayer
- 使用 Tailwind CSS + shadcn/ui 组件库
- 静态导出 (output: "export") 生成纯静态 HTML
- ~5,000 行代码 (TypeScript/TSX + content)
- 所有 v1.0 需求已实现并通过验证

## Constraints

- **Framework**: Next.js (React) — 生态成熟，便于后续扩展
- **Architecture**: Static Site Generation (SSG) — 文档即数据，无需数据库
- **Deployment**: Vercel — 一键部署，与 Next.js 最佳集成
- **Design**: 极简简洁风格 — 减少不必要的视觉干扰

## Key Decisions

| Decision                            | Rationale                                     | Outcome |
| ----------------------------------- | --------------------------------------------- | ------- |
| 选择静态博客架构                    | 文档即数据，不需要数据库，简单高效            | ✓ Good  |
| 选择 Next.js 框架                   | React 生态成熟，SSG 支持完善，适合现代博客    | ✓ Good  |
| 选择 Contentlayer                   | 类型安全的内容处理，与 Next.js 集成良好       | ✓ Good  |
| 选择 Shiki 代码高亮                 | VSCode 同款引擎，准确支持所有语言，双主题适配 | ✓ Good  |
| 选择 Pagefind 全文搜索              | 静态站点最佳方案，零后端，打包后生成索引      | ✓ Good  |
| 支持深色模式                        | 用户需求明确，现代博客标配                    | ✓ Good  |
| 极简简洁设计                        | 突出技术内容阅读体验                          | ✓ Good  |
| 每篇文章独立目录 `{slug}/index.mdx` | 便于存放文章相关资源（图片等）                | ✓ Good  |

---

_Last updated: 2026-03-19 after v1.0 milestone completion_
