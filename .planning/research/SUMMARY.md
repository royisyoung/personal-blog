# Project Research Summary

**Project:** Personal Static Technology Blog
**Domain:** Next.js Static Site Generator (SSG) Blog
**Researched:** 2026-03-16
**Confidence:** MEDIUM

## Executive Summary

This is a personal static technology blog built with Next.js 15, following the "content-as-code" pattern where all posts are stored as Markdown files in Git and rendered to static HTML at build time. Experts agree this approach is optimal for personal technical blogs — it's simple, maintainable, performant, and leverages Git's version control naturally.

The recommended stack is modern and minimal: Next.js 15 with App Router, React 19, TypeScript 5.7, Tailwind CSS 4 for styling, gray-matter for frontmatter, Shiki for code highlighting, and Pagefind for static client-side search. No database or CMS is needed — all processing happens at build time and the output can be deployed entirely to a CDN.

Key risks to avoid are over-engineering the content pipeline upfront, incorrect image optimization configuration for static export, missing frontmatter validation, and client-side search without pre-generation. The mitigation strategy is to start simple, add complexity only when needed, and follow established Next.js static site patterns.

## Key Findings

### Recommended Stack

The recommended stack is based on modern Next.js ecosystem with well-maintained libraries that fit the static blog use case. All core technologies are at current stable versions with good TypeScript support.

**Core technologies:**
- **Next.js 15.x** — React framework with SSG/static export capabilities — current stable version, App Router is official recommendation, excellent Vercel deployment integration
- **React 19.x** — UI library — Next.js 15 default peer dependency, leverages Server Components for better performance
- **TypeScript 5.7.x** — Type system — reduces bugs, improves developer experience, natively supported by Next.js
- **Tailwind CSS 4.x** — Utility-first CSS framework — fast development, easy maintenance, built-in dark mode support
- **gray-matter 4.x** — Frontmatter parser — lightweight, standard tool for extracting YAML metadata from Markdown
- **next-mdx-remote 5.x** — MDX rendering — supports React components in content without pre-compilation
- **Shiki 1.x** — Code syntax highlighting — uses VSCode engine, accurate highlighting, modern alternative to Prism
- **Pagefind 1.x** — Static full-text search — generates index at build time, zero backend, designed for static sites
- **Vercel Analytics** — Privacy-friendly traffic analytics — free, integrates seamlessly with Next.js/Vercel

### Expected Features

The feature set is well-scoped with clear prioritization based on MVP needs. Anti-features are explicitly identified to avoid scope creep and architectural mistakes.

**Must have (table stakes - P1 for launch):**
- Markdown content support — core authoring requirement for technical blog
- Code syntax highlighting — essential for technical articles
- Article list page + individual post page — basic browsing functionality
- Category/tag organization — content navigation and filtering
- Light/dark theme toggle — modern blog standard
- Responsive design — required for mobile reading
- Basic SEO optimization — needed for search engine traffic
- One-click Vercel deployment — project requirement

**Should have (competitive differentiators - P2 add after MVP):**
- Client-side full-text search — improves content discovery
- Code block copy to clipboard — small but high-UX improvement
- Table of contents navigation — helpful for long articles
- RSS feed subscription — expected by technical audience
- Reading progress bar — UX improvement for long articles
- Related posts recommendation — increases content discovery
- Third-party comment system via Giscus — enables reader discussion

**Defer (v2+ - P3 future consideration):**
- Math formula (KaTeX) support — only needed for specific topics like algorithms/ML
- Keyboard shortcuts — niche user preference
- Font size adjustment — accessibility enhancement, not essential
- Multi-author support — only if expanding beyond single author

### Architecture Approach

The architecture follows a clean three-layer pattern with well-defined component boundaries, all processing happening at build time for maximum performance.

**Major components:**
1. **Content Layer** — Stores blog posts as Markdown files in `/content/posts/` — Git is the source of truth, no database needed
2. **Data Processing Layer** — Reads and processes content at build time — extracts metadata, parses Markdown, generates taxonomy indexes, builds search index
3. **Presentation Layer** — Next.js App Router page components render the UI — includes shared components for header, footer, post cards, code blocks

**Key patterns to follow:**
- **Static Generation with `generateStaticParams`:** All routes generated at build time, best performance for blogs
- **Build-Time Data Processing:** All content processing done upfront, no runtime database needed
- **Client-Side Search with Pre-Generated Index:** No backend required, works entirely from static files

**Clear anti-patterns to avoid:**
- Don't put Markdown in `public/` and parse client-side
- Don't add a database/Headless CMS when Git+Markdown works fine
- Don't over-engineer state management (React Context is enough)

### Critical Pitfalls

1. **Over-Engineering the Content Pipeline** — Start with the simplest possible parsing using `gray-matter` and `remark`, only add plugins and complexity when specific features actually require it. Keep Markdown processing under 500 lines initially.
2. **Incorrect Image Handling for Static Export** — Use `next/image` with `unoptimized: true` configuration when using `output: 'export'`. Configure the loader correctly for images stored with content.
3. **Missing Frontmatter Validation** — Add Zod schema validation for required fields (title, date, slug, excerpt) and fail the build on invalid frontmatter to catch errors before deployment.
4. **Client-Side Search Without Preprocessing** — Always pre-generate the search index at build time (using Pagefind), don't load all post content client-side. This keeps bundle size small.
5. **Ignoring Build Performance with Many Posts** — Monitor build times as post count grows past 50, add incremental caching or incremental static generation when needed.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Project Foundation & Setup
**Rationale:** Must set up the project correctly with all dependencies and configuration before adding features. Avoids architectural mistakes from the start.
**Delivers:** Working Next.js project with correct configuration for static export.
**Addresses:** Must-have project scaffolding
**Avoids:** Incorrect Next.js router choice (Pages vs App Router), wrong image optimization settings

### Phase 2: Core Content Infrastructure
**Rationale:** Content processing is the foundation of the blog — all other features depend on it. Get this right before building UI.
**Delivers:** Content layer structure, Markdown processing, frontmatter validation, TypeScript types.
**Addresses:** Markdown support, frontmatter metadata extraction
**Avoids:** Over-engineered content pipeline, missing validation

### Phase 3: Basic UI & Core Pages
**Rationale:** Once content processing works, build the main pages that users interact with. Dependencies are resolved in previous phases.
**Delivers:** Homepage, post list, post detail, tag pages, shared components (header, footer, post card).
**Addresses:** Article list, article detail, tag organization, responsive design
**Uses:** Next.js App Router, Tailwind CSS, Shiki for code highlighting

### Phase 4: Polish & P1 Features
**Rationale:** Add the remaining must-have features that complete the MVP.
**Delivers:** Dark mode toggle, SEO optimization, responsive styling, accessibility.
**Addresses:** Theme switching, SEO, responsive design, accessibility
**Avoids:** Missing table stake features that users expect

### Phase 5: Enhanced Features (P2)
**Rationale:** Add competitive differentiators only after MVP is working and stable.
**Delivers:** Full-text search (Pagefind), table of contents, code copy button, RSS feed, reading progress, related posts.
**Addresses:** Differentiator features that improve UX
**Avoids:** Client-side search performance issues by using pre-generated index

### Phase 6: Launch Preparation
**Rationale:** Final checks before public deployment. Verify all gotchas are addressed.
**Delivers:** RSS generation, sitemap, performance audit, deployment configuration.
**Addresses:** Final verification for production launch

### Phase Ordering Rationale

- **Dependency-based ordering:** Content infrastructure before UI, core pages before enhanced features. This matches the natural dependency graph identified in architecture research.
- **MVP validation:** All P1 features complete by end of Phase 4, allowing for early validation before investing in P2 features.
- **Pitfall avoidance:** Critical pitfalls (over-engineering, image configuration, validation) are addressed in the earliest phases where prevention matters most.
- **Incremental complexity:** Starts simple, adds complexity gradually. This aligns with the research advice to avoid building for all possible use cases upfront.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Core Content Infrastructure):** Need to verify next-mdx-remote configuration with App Router and static export — there are known gotchas.
- **Phase 5 (Enhanced Features):** Pagefind integration with Next.js static export needs correct configuration — verify output paths.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Project Foundation):** Well-documented standard Next.js + TypeScript + Tailwind setup, established patterns.
- **Phase 3 (Basic UI):** Standard App Router page structure, follows Next.js conventions clearly.
- **Phase 4 (Polish):** Dark mode with `next-themes` is a solved problem, tailwind-typography is standard.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Based on official documentation and current stable versions, all choices are mainstream in Next.js ecosystem |
| Features | MEDIUM | Feature prioritization based on community patterns and explicit project scope, clear P1/P2/P3 defined |
| Architecture | MEDIUM | Architecture follows established Next.js static blog patterns, component boundaries clear, well-known data flows |
| Pitfalls | MEDIUM | Pitfalls compiled from common issues observed in community implementations, prevention strategies documented |

**Overall confidence:** MEDIUM

### Gaps to Address

- **next-mdx-remote + App Router integration:** Configuration needs verification during implementation — there are different approaches for App Router vs Pages Router.
- **Pagefind output path for Next.js static export:** Need to ensure the generated search index ends up in the correct location in the `out` directory.
- **Build performance characteristics:** Actual build times with ~100 posts not measured — may need incremental optimizations later.
- **Shiki integration with next-mdx-remote:** Different integration approaches possible, need to pick the simplest that works.

## Sources

### Primary (HIGH confidence)
- Next.js 15 official documentation — App Router and static export patterns
- Tailwind CSS 4 official documentation — styling and dark mode patterns

### Secondary (MEDIUM confidence)
- Shiki documentation — modern syntax highlighting
- Pagefind documentation — static site search
- Community patterns from Next.js blog starters — common architectures and pitfalls
- Vercel deployment documentation — one-click deployment

### Tertiary (LOW confidence)
- Community consensus on feature prioritization for personal technical blogs

---
*Research completed: 2026-03-16*
*Ready for roadmap: yes*
