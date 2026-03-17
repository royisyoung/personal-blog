# Roadmap: Personal Static Technology Blog

## Overview

This roadmap delivers a fully functional static technical blog built with Next.js 15, following the content-as-code pattern. All v1 requirements are mapped to phases with clear observable success criteria.

**Project Core Value:** Provide a fast, clean reading experience that lets readers focus on technical content.

## Phases

- [x] **Phase 1: Project Foundation & Setup** - Initialize Next.js project with correct static export configuration (completed 2026-03-16)
- [x] **Phase 2: Core Content Infrastructure** - Build Markdown/MDX content processing pipeline with frontmatter validation (completed 2026-03-17)
- [x] **Phase 3: Core Pages & UI Components** - Implement all main pages and responsive UI layout (completed 2026-03-17)
- [ ] **Phase 4: SEO, Search & Deployment** - Add SEO optimization, full-text search, and Vercel deployment configuration
- [ ] **Phase 5: Enhanced UX Features** - Add P2 quality-of-life improvements that enhance the reading experience

## Phase Details

### Phase 1: Project Foundation & Setup

**Goal:** Working Next.js 15 project with all dependencies correctly configured for static export **Depends on:** Nothing (first phase) **Requirements:** CONT-01 **Success Criteria** (what must be TRUE):

1. `next dev` starts a local development server on localhost:3000 without errors
2. `next build` completes successfully and generates a static `out` directory
3. Static output configuration is correct for Vercel deployment
4. Tailwind CSS 4 with dark mode support is properly configured

**Plans:** 3/3 plans complete

- [ ] 01-project-foundation-01-PLAN.md — Project scaffolding with create-next-app
- [ ] 01-project-foundation-02-PLAN.md — Core configuration (static export + dark mode)
- [ ] 01-project-foundation-03-PLAN.md — Developer tools (husky + VS Code)

### Phase 2: Core Content Infrastructure

**Goal:** Markdown/MDX content can be processed with metadata extraction and code highlighting at build time **Depends on:** Phase 1 **Requirements:** CONT-02, CONT-03, CONT-04, CONT-05 **Success Criteria** (what must be TRUE):

1. Blog posts can be written as Markdown/MDX files in `/content/posts/` directory
2. Frontmatter (title, date, description, category, tags) is correctly parsed and validated
3. All posts metadata is extracted at build time for listing and filtering
4. Code blocks in articles have correct syntax highlighting using Shiki
5. Build fails if any post has invalid frontmatter (validation catches errors)

**Plans:** 3/3 plans complete

- [ ] 02-01-PLAN.md — Install dependencies and configure Contentlayer with Next.js
- [ ] 02-02-PLAN.md — Define Post document type with frontmatter validation and content utilities
- [ ] 02-03-PLAN.md — Configure Shiki code highlighting and create content directory structure

### Phase 3: Core Pages & UI Components

**Goal:** Users can browse blog content through a responsive, clean interface with proper navigation **Depends on:** Phase 2 **Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, UI-01, UI-02, UI-03, UI-04, UI-05 **Success Criteria** (what must be TRUE):

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

**Plans:** 4/4 plans complete

Plans:

- [ ] 03-01-PLAN.md — Shared layout foundation: header + theme toggle + container
- [ ] 03-02-PLAN.md — Home page + about page + reusable post list components
- [ ] 03-03-PLAN.md — Post detail page + category/tag filter pages + pagination
- [ ] 03-04-PLAN.md — Add pagination to home page (gap closure for UI-05)

### Phase 4: SEO, Search & Deployment

**Goal:** Blog is discoverable by search engines, searchable by readers, and deployable to Vercel with one click **Depends on:** Phase 3 **Requirements:** SEO-01, SEO-02, SEO-03, DEP-01, SRCH-01, SRCH-02 **Success Criteria** (what must be TRUE):

1. Each page has correct meta tags (title, description, Open Graph) for social sharing
2. `sitemap.xml` is generated automatically at build time
3. `robots.txt` is present and properly configured
4. Full-text search works across all blog posts using Pagefind
5. Search UI component is accessible from any page and returns relevant results
6. Project can be deployed to Vercel with one click without configuration errors
7. Deployed site is fully functional with all assets loading correctly

**Plans:** 2/3 plans executed

Plans:

- [ ] 04-01-PLAN.md — SEO infrastructure (meta tags + OG image + sitemap + robots
- [ ] 04-02-PLAN.md — Pagefind 搜索集成
- [ ] 04-03-PLAN.md — Search UI 模态弹窗组件

### Phase 5: Enhanced UX Features

**Goal:** Additional quality-of-life features that improve the reading experience (P2) **Depends on:** Phase 4 **Requirements:** (v2 requirements deferred from v1, added here based on priority) **Success Criteria** (what must be TRUE):

1. Reading progress bar displays at the top of the page during scrolling
2. Users can click a button to copy code blocks to clipboard
3. Long articles have an auto-generated table of contents for navigation
4. Related posts are suggested at the bottom of each article based on shared tags
5. RSS feed is available for subscription
6. Estimated reading time is displayed for each article

**Plans:** TBD

## Progress

| Phase                          | Plans Complete | Status      | Completed  |
| ------------------------------ | -------------- | ----------- | ---------- |
| 1. Project Foundation & Setup  | 3/3            | Complete    | 2026-03-16 |
| 2. Core Content Infrastructure | 3/3            | Complete    | 2026-03-17 |
| 3. Core Pages & UI Components  | 4/4            | Complete    | 2026-03-17 |
| 4. SEO, Search & Deployment    | 2/3            | In Progress |            |
| 5. Enhanced UX Features        | 0/0            | Not started | -          |

---

_Roadmap created: 2026-03-16_ _Last updated: 2026-03-17_
