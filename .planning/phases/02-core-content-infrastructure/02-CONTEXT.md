# Phase 2: Core Content Infrastructure - Context

**Gathered:** 2026-03-16 **Status:** Ready for planning

<domain>
## Phase Boundary

Build the content processing pipeline that reads Markdown/MDX files from `/content/posts/`, parses frontmatter, extracts all posts metadata at build time, and renders content with Shiki syntax highlighting. This phase delivers the core "content as data" capability that all subsequent phases depend on.

Success criteria:

1. Blog posts can be written as Markdown/MDX files in `/content/posts/` directory
2. Frontmatter (title, date, description, category, tags) is correctly parsed and validated
3. All posts metadata is extracted at build time for listing and filtering
4. Code blocks in articles have correct syntax highlighting using Shiki
5. Build fails if any post has invalid frontmatter (validation catches errors)

</domain>

<decisions>
## Implementation Decisions

### MDX Processing

- Use **Contentlayer** as the MDX/content processing library
- Contentlayer automatically generates TypeScript types and provides Zod-based validation out of the box
- Good integration with Next.js App Router

### Content Directory Structure

- Each post gets its own subfolder under `/content/posts/`
- Format: `/content/posts/{slug}/index.mdx`
- Related images/assets can be placed in the same subfolder alongside the post for better organization

### Frontmatter Validation

- Full Zod validation enabled via Contentlayer
- Build will fail immediately if any post has missing required fields or invalid types
- Catches errors early during development/build, prevents broken content from being deployed

### Metadata Extraction

- Extract all posts metadata in-memory at build time only
- No caching to JSON file - keep it simple
- Rebuilds metadata from scratch on every build, which is acceptable for a small-to-medium number of posts

### Claude's Discretion

- Exact Contentlayer configuration options within best practices
- Shiki theme selection (match light/dark mode to site theme)
- Where to place the content utility functions (lib/content.ts vs similar location)

</decisions>

<specifics>
## Specific Ideas

No specific additional requirements beyond the decisions captured above — open to standard implementation approaches.

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements

- `.planning/PROJECT.md` — Overall project vision, core value, and constraints
- `.planning/REQUIREMENTS.md` — Full requirements list including CONT-02, CONT-03, CONT-04, CONT-05
- `.planning/ROADMAP.md` — Phase boundaries and success criteria for Phase 2

### Prior Decisions

- `.planning/phases/01-project-foundation/01-CONTEXT.md` — Project foundation decisions (Next.js 15, App Router, Tailwind v4, pnpm)

</canonical_refs>

<code_context>

## Existing Code Insights

This phase builds on the initialized Next.js project from Phase 1.

### Reusable Assets

- Next.js 15 App Router structure already set up
- Tailwind CSS v4 with dark mode already configured
- pnpm package manager configured

### Established Patterns

- Configuration files at project root (no `src/` wrapper)
- App Router pattern for routes in `app/` directory

### Integration Points

- Content processing utilities will integrate with: `app/` (post list, post page), `next.config.ts` (Contentlayer plugin)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 02-core-content-infrastructure_ _Context gathered: 2026-03-16_
