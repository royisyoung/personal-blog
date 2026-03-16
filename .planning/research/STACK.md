# Technology Stack

**Project:** Personal Static Technology Blog
**Researched:** 2026-03-16

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x | React 框架，提供 SSG 能力 | Next.js 15 是当前稳定版本，App Router + 静态导出(standalone output)是官方推荐方案，零配置即可部署到 Vercel，生态成熟 |
| React | 19.x | UI 库 | Next.js 15 默认搭配 React 19，支持新的 React 特性如 Server Components，性能更好 |
| TypeScript | 5.7.x | 类型系统 | 静态类型减少 bug，提升开发体验，Next.js 官方原生支持 |

### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS 框架 | 快速开发，易于维护，支持深色模式，与 Next.js 集成完美，社区主题丰富 |

### Markdown Processing
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| gray-matter | 4.x | 解析 Markdown frontmatter | 轻量，稳定，广泛使用，专门处理 YAML 元数据 |
| next-mdx-remote | 5.x | 在 Next.js 中远程渲染 MDX | 支持 MDX 中的 React 组件，无需把 MDX 编译提前到构建步骤，适合内容驱动博客 |
| Shiki | 1.x | 代码高亮 | 使用 VSCode 相同的语法引擎，高亮准确，支持所有主题，性能优秀，比 Prism 更现代 |

### Search
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Pagefind | 1.x | 静态全文搜索 | 构建后生成索引，零后端，纯前端搜索，体积小，开箱即用，专为静态网站设计 |

### Analytics
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel Analytics | 1.x | 访问统计 | 免费，无侵入，与 Next.js/Vercel 深度集成，无需第三方脚本，隐私友好 |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.464.x | SVG 图标库 | 现代，轻量，React 原生支持，可按需导入 |
| clsx | 2.x | Tailwind class 合并工具 | 合并条件类名，避免类名冲突，体积极小 |
| date-fns | 3.x | 日期处理 | 轻量，只导入需要的函数，比 moment.js 小很多 |
| rehype-highlight | 7.x | rehype 代码高亮插件 | 如果使用 remark/rehype 处理 pipeline 时使用 |
| remark-gfm | 4.x | GitHub Flavored Markdown 支持 | 支持表格、删除线、任务列表等扩展语法 |

## Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | 代码检查 | Next.js 内置配置，开箱即用 |
| Prettier | 代码格式化 | 配合 prettier-plugin-tailwindcss 自动排序 class |
| @tailwindcss/typography | 文章内容样式 | Tailwind 官方插件，提供专业的文章排版 |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Gatsby | Gatsby 社区活跃度下降，构建速度慢，Next.js 在静态导出方面已经做得很好 |
| Framework | Next.js 15 | Astro | Astro 更适合内容网站，但项目已经指定使用 Next.js |
| Markdown 处理 | next-mdx-remote | contentlayer | Contentlayer 虽然好用但维护不如 next-mdx-remote 活跃，配置复杂 |
| 代码高亮 | Shiki | Prism | Prism 功能老旧，对现代语言支持不足，bundle 体积更大 |
| 搜索 | Pagefind | Algolia | Algolia 需要第三方服务，有免费额度限制，Pagefind 完全自托管免费 |
| CSS | Tailwind CSS | CSS Modules | Tailwind 开发更快，维护更容易，社区资源丰富 |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Next.js Pages Router | 官方已经转向 App Router，新项目应该使用 App Router 架构 | App Router |
| `getStaticProps` 动态路由 + SSR/ISR | 纯静态博客不需要增量更新，完整静态导出更简单 | `output: export` 静态导出 |
| Prism.js | 项目不活跃，对新语言支持差，样式老旧 | Shiki |
| Moment.js | 包体积大，不支持 tree-shaking，项目进入维护模式 | date-fns 或 dayjs |
| remark-prism | 基于 Prism，同样过时 | remark-shiki 直接用 Shiki |
| Disqus/utterances 评论系统 | 项目要求静态博客配合第三方服务，如果需要评论可以使用，但会增加外部依赖 | 可选：Giscus，不过本项目 Scope 不包含评论功能，不需要 |

## Installation

```bash
# Core
npm install next@15 react@19 react-dom@19 typescript@5

# Styling
npm install tailwindcss@4 @tailwindcss/typography

# Markdown
npm install gray-matter next-mdx-remote@5 shiki@1

# Search
npm install @pagefind/bundled pagefind

# Analytics
npm install @vercel/analytics

# Supporting
npm install lucide-react clsx date-fns remark-gfm
```

```bash
# Dev dependencies
npm install -D eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 15.x | React 19.x | Next.js 15 requires React 19 as peer dependency |
| Tailwind 4.x | Next.js 15.x | Officially supported, zero configuration needed |
| next-mdx-remote 5.x | Next.js 15.x | App Router compatible |
| Shiki 1.x | All | Works with any framework |

## Sources

- [Next.js 15 Release Notes](https://github.com/vercel/next.js/releases) — Next.js 15 is current stable version (MEDIUM confidence)
- [Tailwind CSS 4 Release](https://tailwindcss.com/blog/tailwind-css-v4) — Tailwind 4 is latest stable (MEDIUM confidence)
- [Shiki Documentation](https://shiki.style/) — Modern syntax highlighting (MEDIUM confidence)
- [Pagefind](https://pagefind.app/) — Static search for static sites (MEDIUM confidence)
- Community patterns from GitHub Next.js blog starters — Common stack choices (LOW confidence)

---
*Stack research for: Next.js Static Technology Blog*
*Researched: 2026-03-16*
