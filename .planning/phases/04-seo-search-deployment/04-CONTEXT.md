# Phase 4: SEO, Search & Deployment - Context

**Gathered:** 2026-03-17 **Status:** Ready for planning

<domain>
## Phase Boundary

Complete the v1 requirements by adding:

- SEO meta tags (title, description, Open Graph) for all pages
- Dynamic OG image generation for each post
- Generate `sitemap.xml` at build time
- Provide `robots.txt` for search engines
- Full-text search across all posts using Pagefind
- Search UI for users to find content
- Configure project for one-click deployment to Vercel

All content infrastructure and UI pages are already complete in Phases 2 and 3 — this phase adds discoverability and deployment capability.

</domain>

<decisions>
## Implementation Decisions

### Meta Tags & Open Graph

- Use Next.js App Router built-in **`generateMetadata` function** for meta tags
- No extra dependencies needed, native approach recommended by Next.js
- Use **`@vercel/og` for automatic dynamic OG image generation**
- Each post gets a unique OG image with the post title automatically generated at build time
- No need for authors to manually provide OG images

### Search UI

- **Dedicated `/search` page** for full-text search
- Clean separation, simple to implement with Pagefind
- Users can access search via navigation link from any page

### Sitemap Generation

- **Automatic generation at build time**
- Scans all routes and posts to generate up-to-date `sitemap.xml`
- **Include all pages + all posts** in sitemap: home, about, categories, tags, and all individual posts
- Complete coverage for search engines

### Vercel Deployment Configuration

- Let Vercel handle the build process natively — zero-config static export
- `robots.txt` as a **static file in `public/` directory**
- Simple static file with allow-all rule and sitemap reference is sufficient for a blog

### Claude's Discretion

- `@vercel/og` Image design (font, background, layout)
- Pagefind configuration output path for static export
- Exact meta tags to include (beyond title/description/OG)
- Search results styling (match minimalist aesthetic)

</decisions>

<specifics>
## Specific Ideas

No specific additional requirements beyond the decisions captured above — implementation should follow the core project value: "fast, clean reading experience that lets readers focus on technical content".

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements

- `.planning/PROJECT.md` — Overall project vision, core value (minimalist focused on content)
- `.planning/REQUIREMENTS.md` — Full requirements list including SEO-01, SEO-02, SEO-03, DEP-01, SRCH-01, SRCH-02
- `.planning/ROADMAP.md` — Phase boundaries and success criteria for Phase 4

### Prior Decisions

- `.planning/phases/01-project-foundation/01-CONTEXT.md` — Next.js 15, App Router, Tailwind dark mode
- `.planning/phases/02-core-content-infrastructure/02-CONTEXT.md` — Contentlayer processing, post metadata
- `.planning/phases/03-core-pages-ui-components/03-CONTEXT.md` — Layout, pagination, navigation patterns

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `app/layout.tsx` — Root layout with Geist fonts already set up
- `lib/content.ts` — `getAllPosts()` utility available for enumerating posts
- All page routes already exist (home, post, category, tag, about)
- Tailwind CSS with dark mode already configured

### Established Patterns

- App Router file-system routing
- `generateMetadata` in each page file for dynamic metadata
- Configuration files at project root (no `src/` wrapper)
- Contentlayer provides all post metadata at build time

### Integration Points

- OG image route will need a new Route Handler at `app/api/og/route.tsx`
- Search page at `app/search/page.tsx`
- `next.config.ts` needs Pagefind output path configuration
- Package.json needs `@vercel/og` and `pagefind` dependencies

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 04-seo-search-deployment_ _Context gathered: 2026-03-17_
