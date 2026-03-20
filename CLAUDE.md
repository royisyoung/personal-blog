# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production (includes sitemap and RSS generation)
pnpm build

# Start production server
pnpm start

# Run lint
pnpm lint

# Run tests
npx vitest run

# Run tests in watch mode
npx vitest
```

## Architecture

This is a **static blog website** built with:

- **Framework**: Next.js 15 (App Router) with static export (`output: 'export'`)
- **Content**: Contentlayer for MDX-based blog posts (located in `content/posts/`)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Language**: TypeScript
- **Search**: Pagefind for full-text static search
- **Testing**: Vitest for unit tests

## Directory Structure

```
app/                  # Next.js App Router routes
  about/              # About page
  api/                # API routes
  categories/         # Category listing page
  posts/[slug]/       # Individual post page
  tags/               # Tag listing page
  layout.tsx          # Root layout
  page.tsx            # Homepage

components/           # React components
  ui/                 # shadcn/ui base components
  *.tsx               # Blog-specific components

content/posts/       # Blog posts (MDX format)
  {slug}/index.mdx   # Each post in its own directory

lib/                 # Utility functions
  content.ts          # Content queries
  pagination.ts       # Pagination logic
  reading-time.ts     # Reading time calculation
  related-posts.ts    # Related posts algorithm
  rehype-*.ts         # Rehype plugins for MDX processing
  search.ts           # Search integration
  toc.ts              # Table of contents extraction

scripts/             # Build scripts
  generate-sitemap.mjs   # Generate sitemap.xml
  generate-rss.js        # Generate RSS feed

tests/               # Test files
```

## Key Files

- `contentlayer.config.ts` - Contentlayer configuration (defines Post schema)
- `next.config.ts` - Next.js configuration (static export enabled)
- `tailwind.config.ts` - Tailwind configuration
- `vitest.config.ts` - Vitest configuration
- `components.json` - shadcn/ui configuration

## Content Format

Each blog post is an MDX file at `content/posts/{slug}/index.mdx` with frontmatter:

```yaml
---
title: 'Post Title'
date: YYYY-MM-DD
description: 'Post description for SEO'
category: 'Category Name'
tags: ['tag1', 'tag2']
---
```

## Build Process

Full build sequence:

1. Next.js builds the site → outputs to `out/`
2. Pagefind indexes content for search
3. Generate sitemap.xml
4. Generate RSS feed

## Environment Variables

- `.env.local` - Local environment variables (gitignored)
- `.env.example` - Example environment variables template
