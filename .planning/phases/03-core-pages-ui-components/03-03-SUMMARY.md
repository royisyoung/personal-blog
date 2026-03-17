---
phase: 03-core-pages-ui-components
plan: 03-03
subsystem: Core Pages
tags: [nextjs, dynamic-routes, pagination, mdx]
requires: [PAGE-02, PAGE-03, PAGE-04, UI-05]
provides: [Individual post page, Category filtered page, Tag filtered page, Pagination component]
tech-stack: [Next.js 15/16 App Router, TypeScript, shadcn/ui, Contentlayer]
key-files:
  created:
    - lib/pagination.ts
    - components/Pagination.tsx
    - app/posts/[slug]/page.tsx
    - app/categories/[category]/page.tsx
    - app/tags/[tag]/page.tsx
decisions:
  - Follow Next.js 16 async params pattern for all dynamic routes
  - Traditional pagination with page numbers instead of infinite scroll
  - Reuse PostList component for consistency across all listing pages
  - Ellipsis truncation for many pages to avoid too many buttons
---

# Phase 03 Plan 03-03: Dynamic Routes and Pagination Summary

One-liner: Implemented all core dynamic routes - individual post page with full MDX rendering, category filtering page, tag filtering page, and a complete pagination system.

## Completed Tasks

| Task | Name | Commit | Files |
| --- | --- | --- | --- |
| 1 | Create pagination utility functions and component | 473f7d4 | lib/pagination.ts, components/Pagination.tsx |
| 2 | Implement individual post page | df5e604 | app/posts/[slug]/page.tsx |
| 3 | Implement category page and tag page | cee5ddc | app/categories/[category]/page.tsx, app/tags/[tag]/page.tsx |

## Implementation Details

### 1. Pagination System (`lib/pagination.ts` + `components/Pagination.tsx`)

- **lib/pagination.ts**:
  - `postsPerPage = 10` constant defined
  - `calculatePagination()` computes totalPages, prevPage, nextPage, and page array with ellipsis for many pages
  - `getPaginatedPosts()` returns sliced posts for current page
  - Full TypeScript types exported

- **components/Pagination.tsx**:
  - Uses shadcn/ui Button component
  - Uses Next.js Link for navigation
  - Disabled Previous on first page, disabled Next on last page
  - Highlights current page with default variant
  - Shows ellipsis when there are more than 7 pages
  - Accepts `basePath` for use on any listing page (home, category, tag)

### 2. Individual Post Page (`app/posts/[slug]/page.tsx`)

- Dynamic route `/posts/[slug]`
- `generateStaticParams()` statically generates all post slugs at build time
- Uses `getPostBySlug()` from `lib/content.ts` to retrieve post
- Renders title (28px semibold), formatted date, and category
- Renders full MDX content via Contentlayer's `MDXContent`
- Shiki syntax highlighting already configured in contentlayer.config.ts
- Uses Container for width constraint
- Returns 404-style message if post not found
- Follows Next.js 16 async params pattern

### 3. Category Page (`app/categories/[category]/page.tsx`)

- Dynamic route `/categories/[category]`
- `generateStaticParams()` extracts all unique categories and generates all pagination pages
- Filters posts by `post.category === params.category`
- Page title shows "Category: Name" with post count
- Reuses PostList component for consistent layout
- Pagination enabled when posts exceed 10
- Base path `/categories/{category}` for pagination links
- Follows Next.js 16 async params pattern

### 4. Tag Page (`app/tags/[tag]/page.tsx`)

- Dynamic route `/tags/[tag]`
- `generateStaticParams()` extracts all unique tags and generates all pagination pages
- Filters posts by `post.tags.includes(params.tag)`
- Page title shows "Tag: Name" with post count
- Reuses PostList component
- Pagination enabled
- Base path `/tags/{tag}` for pagination links
- Follows Next.js 16 async params pattern

## Deviations from Plan

None - plan executed exactly as written. All acceptance criteria met.

## Success Criteria Verification

| Criteria | Status |
| --- | --- |
| Every post has a dedicated page at /posts/{slug} with full content rendered | ✅ Pass |
| MDX code blocks have correct syntax highlighting that adapts to theme | ✅ Pass (already configured in Phase 2) |
| /categories/{category} shows all posts in that category with same post list layout | ✅ Pass |
| /tags/{tag} shows all posts with that tag with same post list layout | ✅ Pass |
| Pagination appears when post count exceeds 10 posts per page | ✅ Pass |
| All links navigate correctly between pages | ✅ Pass |
| Static generation works at build time for all posts, categories, and tags | ✅ Pass (generateStaticParams implemented for all) |

## Self-Check: PASSED

- All required files created: lib/pagination.ts, components/Pagination.tsx, app/posts/[slug]/page.tsx, app/categories/[category]/page.tsx, app/tags/[tag]/page.tsx
- All commits verified: 473f7d4, df5e604, cee5ddc
- All exports present: calculatePagination, getPaginatedPosts, Pagination, generateStaticParams for all pages
- All acceptance criteria satisfied
