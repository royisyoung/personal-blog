# Roadmap: Personal Static Technology Blog

## Overview

This roadmap delivers a fully functional static technical blog built with Next.js, following the content-as-code pattern.

---

## Milestones

- ✅ **v1.0 MVP** — Phases 1-5 (shipped 2026-03-19)

---

<details>
<summary>✅ v1.0 MVP (Phases 1-5) — SHIPPED 2026-03-19</summary>

### 1. Project Foundation & Setup

**Goal:** Working Next.js 15 project with all dependencies correctly configured for static export **Depends on:** Nothing (first phase) **Plans:** 3/3 plans complete

Plans:

- [x] 01-01: Project scaffolding with create-next-app
- [x] 01-02: Core configuration (static export + dark mode)
- [x] 01-03: Developer tools (husky + VS Code)

**Success Criteria:**

1. `next dev` starts a local development server on localhost:3000 without errors
2. `next build` completes successfully and generates a static `out` directory
3. Static output configuration is correct for Vercel deployment
4. Tailwind CSS 4 with dark mode support is properly configured

---

### 2. Core Content Infrastructure

**Goal:** Markdown/MDX content can be processed with metadata extraction and code highlighting at build time **Depends on:** Phase 1 **Plans:** 3/3 plans complete

Plans:

- [x] 02-01: Install dependencies and configure Contentlayer with Next.js
- [x] 02-02: Define Post document type with frontmatter validation and content utilities
- [x] 02-03: Configure Shiki code highlighting and create content directory structure

**Success Criteria:**

1. Blog posts can be written as Markdown/MDX files in `/content/posts/` directory
2. Frontmatter (title, date, description, category, tags) is correctly parsed and validated
3. All posts metadata is extracted at build time for listing and filtering
4. Code blocks in articles have correct syntax highlighting using Shiki
5. Build fails if any post has invalid frontmatter (validation catches errors)

---

### 3. Core Pages & UI Components

**Goal:** Users can browse blog content through a responsive, clean interface with proper navigation **Depends on:** Phase 2 **Plans:** 4/4 plans complete

Plans:

- [x] 03-01: Shared layout foundation: header + theme toggle + container
- [x] 03-02: Home page + about page + reusable post list components
- [x] 03-03: Post detail page + category/tag filter pages + pagination
- [x] 03-04: Add pagination to home page (gap closure for UI-05)

**Success Criteria:**

1. Home page displays blog description and a list of all posts sorted by date
2. Clicking a post opens the individual post page with full content rendered correctly
3. Users can filter posts by category on the category page
4. Users can filter posts by tag on the tag page
5. About page displays author information
6. Design is minimalist and clean, focusing attention on content readability
7. Layout adapts correctly to mobile, tablet, and desktop screen sizes
8. Users can toggle between light and dark themes, and preference persists across visits
9. Site header with navigation links is visible on all pages
10. Pagination works for post lists when there are many posts

---

### 4. SEO, Search & Deployment

**Goal:** Blog is discoverable by search engines, searchable by readers, and deployable to Vercel with one click **Depends on:** Phase 3 **Plans:** 3/3 plans complete

Plans:

- [x] 04-01: SEO infrastructure (meta tags + OG image + sitemap + robots)
- [x] 04-02: Pagefind 搜索集成
- [x] 04-03: Search UI 模态弹窗组件

**Success Criteria:**

1. Each page has correct meta tags (title, description, Open Graph) for social sharing
2. `sitemap.xml` is generated automatically at build time
3. `robots.txt` is present and properly configured
4. Full-text search works across all blog posts using Pagefind
5. Search UI component is accessible from any page and returns relevant results
6. Project can be deployed to Vercel with one click without configuration errors
7. Deployed site is fully functional with all assets loading correctly

---

### 5. Enhanced UX Features

**Goal:** Additional quality-of-life features that improve the reading experience (P2) **Depends on:** Phase 4 **Plans:** 6/6 plans complete

Plans:

- [x] 05-01: 基础客户端组件: Reading Progress Bar + Back to Top + Copy Button
- [x] 05-02: 测试基础设施 + 阅读时间计算 + 相关文章算法
- [x] 05-03: 自动生成目录 (TOC) 提取和组件
- [x] 05-04: 复制按钮集成到代码块 + 相关文章展示组件
- [x] 05-05: RSS 静态生成 + footer 链接
- [x] 05-06: 单元测试全覆盖

**Success Criteria:**

1. Reading progress bar displays at the top of the page during scrolling
2. Users can click a button to copy code blocks to clipboard
3. Long articles have an auto-generated table of contents for navigation
4. Related posts are suggested at the bottom of each article based on shared tags
5. RSS feed is available for subscription
6. Estimated reading time is displayed for each article

---

**v1.0 Progress:** | Phase | Plans Complete | Status | Completed | | ------------------------------ | -------------- | -------- | ---------- | | 1. Project Foundation & Setup | 3/3 | Complete | 2026-03-16 | | 2. Core Content Infrastructure | 3/3 | Complete | 2026-03-17 | | 3. Core Pages & UI Components | 4/4 | Complete | 2026-03-17 | | 4. SEO, Search & Deployment | 3/3 | Complete | 2026-03-17 | | 5. Enhanced UX Features | 6/6 | Complete | 2026-03-18 |

</details>

---

## Next Milestone

Planning for v1.1 or v2.0 has not started. Use `/gsd:new-milestone` to start planning the next milestone.

---

_Last updated: 2026-03-19 after v1.0 completion_
