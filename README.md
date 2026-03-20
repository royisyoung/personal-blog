# MyClaudes

> A clean, minimalist personal technology blog built with Next.js and Contentlayer.

## Features

- ⚡ **Fast & Static**: Fully static export with Next.js
- 📝 **MDX Powered**: Write posts in MDX with syntax highlighting
- 🔍 **Full-text Search**: Built-in search with [Pagefind](https://pagefind.app/)
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 🏷️ **Categories & Tags**: Organize content with categories and tags
- 📡 **RSS Feed**: Auto-generated RSS feed
- 🗺️ **Sitemap**: Auto-generated sitemap
- 🎨 **Modern Styling**: Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
- ✅ **Tested**: Unit tests with Vitest
- 📊 **Reading Time**: Automatic reading time calculation
- 🔖 **Table of Contents**: Auto-generated TOC for blog posts
- 📋 **Pagination**: Paginated post listing

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Content**: [Contentlayer](https://contentlayer.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Search**: [Pagefind](https://pagefind.app/)
- **Language**: TypeScript
- **Testing**: Vitest
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production (includes sitemap and RSS generation)
pnpm build
```

The output will be in the `out/` directory ready for static deployment.

### Production

```bash
# Start production server
pnpm start
```

### Lint

```bash
pnpm lint
```

### Tests

```bash
# Run all tests
npx vitest run

# Watch mode
npx vitest
```

## Writing Posts

Create a new post at `content/posts/{slug}/index.mdx` with frontmatter:

```mdx
---
title: 'Getting Started with Next.js'
date: 2024-03-20
description: 'Learn how to build a modern blog with Next.js and Contentlayer'
category: 'Development'
tags: ['Next.js', 'React', 'TypeScript']
---

Your content here...
```

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── about/            # About page
│   ├── categories/       # Category listing
│   ├── posts/[slug]/     # Single post page
│   ├── tags/             # Tag listing
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # React components
│   └── ui/               # shadcn/ui components
├── content/posts/        # Blog posts (MDX)
├── lib/                 # Utility functions
├── public/              # Static assets
├── scripts/             # Build scripts
│   ├── generate-sitemap.mjs
│   └── generate-rss.js
├── tests/               # Test files
└── contentlayer.config.ts  # Contentlayer configuration
```

## Features in Detail

### Search

After building, Pagefind automatically indexes all content in the `out/` directory, enabling client-side full-text search without any external services.

### Syntax Highlighting

Code blocks are automatically highlighted using [Shiki](https://github.com/shikijs/shiki) with GitHub themes.

### Related Posts

Posts are automatically related based on shared tags.

## Deployment

This blog is configured for static export (`output: 'export'` in `next.config.ts`), so it can be deployed to any static hosting:

- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- Any other static hosting

### Environment Variables

| Variable               | Description                                 | Required                                 |
| ---------------------- | ------------------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (e.g., `https://example.com`) | No (defaults to `http://localhost:3000`) |

See `.env.example` for an example.

## License

MIT
