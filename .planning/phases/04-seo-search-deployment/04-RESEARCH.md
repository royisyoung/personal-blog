# Phase 4: SEO, Search & Deployment - Research

**Researched:** 2026-03-17 **Domain:** Next.js 15 SEO optimization, static full-text search with Pagefind, Vercel deployment **Confidence:** HIGH

## Summary

This phase implements SEO discoverability and full-text search for a static Next.js blog. The core stack is already decided: use Next.js native `generateMetadata` for meta tags, `@vercel/og` for dynamic OG image generation, Pagefind for client-side full-text search, and static generation for Vercel deployment. All content routes already exist, this phase adds metadata and search capability.

The implementation is straightforward because Next.js App Router provides native SEO support, Pagefind integrates seamlessly with static exports by generating a search index at build time, and Vercel automatically detects Next.js projects requiring minimal configuration.

**Primary recommendation:** Follow the locked decisions from CONTEXT.md - use native Next.js features where possible, avoid extra dependencies, keep the implementation simple and aligned with the static site architecture.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- Use Next.js App Router built-in **`generateMetadata` function** for meta tags
- No extra dependencies needed, native approach recommended by Next.js
- Use **`@vercel/og` for automatic dynamic OG image generation**
- Each post gets a unique OG image with the post title automatically generated at build time
- No need for authors to manually provide OG images

### Search UI

- **Modal popup from header** — search icon in header, click opens a modal dialog
- Accessible from any page on the site, better UX
- Search results display directly in the modal without page navigation

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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope. </user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
| --- | --- | --- |
| SEO-01 | Proper meta tags for each page (title, description, Open Graph) | Next.js 15 `generateMetadata` API natively supports this in App Router, no extra libraries needed |
| SEO-02 | Generate sitemap.xml at build time | Can be generated with a build script using existing `getAllPosts()` utility |
| SEO-03 | Generate robots.txt | Static file in `public/` is sufficient per locked decisions |
| DEP-01 | Configured for one-click deployment to Vercel | Next.js static export already configured, Vercel auto-detects Next.js projects |
| SRCH-01 | Full-text search across all blog posts using Pagefind | Pagefind 1.4.0 integrates with static export, generates index at build time |
| SRCH-02 | Search UI component accessible from any page | Modal component added to header, accessible globally |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
| --- | --- | --- | --- |
| `@vercel/og` | 0.11.1 | Dynamic OG image generation via Image Response API | Official Vercel library, maintained, integrates natively with Next.js App Router |
| `pagefind` | 1.4.0 | Static full-text search | De facto standard for static site search, pre-generates index, zero backend required |

### Supporting

| Library | Version | Purpose | When to Use |
| --- | --- | --- | --- |
| Next.js `generateMetadata` | 15.x | Native metadata generation | Built into App Router, no extra dependency needed |
| `sitemap.xml` | build script | Static sitemap generation | Simple script at build time using existing post data |
| `robots.txt` | static file | Search engine crawling instructions | Static file in `public/` is sufficient |

### Alternatives Considered

| Instead of         | Could Use              | Tradeoff                                                         |
| ------------------ | ---------------------- | ---------------------------------------------------------------- |
| `@vercel/og`       | next-seo               | next-seo doesn't generate OG images, only meta tags              |
| Pagefind           | Algolia DocSearch      | Requires external service, JavaScript client, not self-contained |
| Pagefind           | Lunr.js                | Client-side parsing of all content, slower for readers           |
| build-time sitemap | `next-sitemap` package | Extra dependency for simple use case, script is simpler          |

**Installation:**

```bash
npm install @vercel/og pagefind --save
```

**Version verification:** Versions above are current as of 2026-03-17, verified via npm registry.

## Architecture Patterns

### Recommended Project Structure

```
/Users/xuyang/code/my-claudes/
├── app/
│   ├── api/
│   │   └── og/
│   │       └── route.tsx       # OG image generation endpoint
├── components/
│   ├── SearchModal.tsx         # Search modal dialog component
│   └── ... (existing components)
├── lib/
│   ├── content.ts              # Already has getAllPosts()
│   └── search.ts               # Pagefind client wrapper (optional)
├── public/
│   ├── robots.txt              # Static robots.txt
│   └── sitemap.xml             # Generated at build time
├── scripts/
│   └── generate-sitemap.mjs    # Build-time sitemap generation
└── next.config.ts              # Add Pagefind output config
```

### Pattern 1: Dynamic Metadata with generateMetadata

**What:** Next.js 15 App Router `generateMetadata` async function exports metadata per page **When to use:** For all page routes including dynamic post pages **Example:**

```typescript
// Source: Next.js App Router Documentation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteUrl}/posts/${post.slug}`,
      images: [
        {
          url: `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}
```

### Pattern 2: @vercel/og Image Route

**What:** Route handler that dynamically generates OG images using Satori **When to use:** Called by social crawlers when sharing post URLs **Example:**

```typescript
// Source: @vercel/og documentation
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'My Blog';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#000000',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'GeistSans',
        }}
      >
        <h1 style={{ fontSize: '64px', color: '#ffffff', margin: 0 }}>
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

### Pattern 3: Pagefind Build Integration

**What:** Pagefind indexes your content after Next.js builds the static output **When to use:** For static export sites that need client-side search without backend **Configuration:**

```typescript
// In next.config.ts
const nextConfig = {
  output: 'export',
  // Configure Pagefind output to be in the out directory
  outputFileTracingExcludes: {
    '**': ['pagefind/**'],
  },
};
```

**Build process:**

```json
{
  "scripts": {
    "build": "next build && npx pagefind --source out"
  }
}
```

### Anti-Patterns to Avoid

- **Generating sitemap dynamically at runtime:** Unnecessary for static blog, generate at build time
- **Putting Pagefind index in Git:** Generated at build time, should be in `.gitignore`
- **Client-side indexing with Lunr.js:** Slower for users, increases initial load size
- **Missing OG image dimension metadata:** Always specify 1200x630 for proper social display
- **Forgetting trailingSlash configuration:** Already set to `true` in current config, keeps URLs consistent

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
| --- | --- | --- | --- |
| OG image generation | Custom image rendering with canvas | `@vercel/og` | Handles font loading, SVG to PNG conversion, edge caching; very complex to roll your own |
| Full-text search | Custom search index with stemming | Pagefind | Pre-generated optimized index, handles tokenization, stemming, search ranking out of the box |
| Meta tag management | Custom Helmet configuration | Next.js `generateMetadata` | Native to App Router, handles deduplication, proper HTML output |

**Key insight:** Both OG generation and full-text search have many subtle edge cases (font licensing, encoding, search ranking, tokenization) that mature libraries handle correctly. Custom implementations will be incomplete and require ongoing maintenance.

## Common Pitfalls

### Pitfall 1: Pagefind output path mismatch with static export

**What goes wrong:** Pagefind generates index in wrong location, can't be loaded client-side **Why it happens:** Next.js `output: 'export'` outputs to `out/` directory, Pagefind needs to index this directory **How to avoid:** Configure Pagefind to run after build with `--source out`, ensure output goes to `out/pagefind` **Warning signs:** 404 errors when loading `pagefind/pagefind.js` in browser

### Pitfall 2: OG image CORS issues when deployed

**What goes wrong:** Generated images don't load on social media because of CORS **Why it happens:** Not using Vercel edge runtime, incorrect cache headers **How to avoid:** Use `export const runtime = 'edge'` in the route handler, Vercel handles CORS correctly **Warning signs:** Images load locally but not when deployed

### Pitfall 3: Sitemap URLs with incorrect trailing slash

**What goes wrong:** Search engines get 404 because URLs don't match site configuration **Why it happens:** Project has `trailingSlash: true` but sitemap generates URLs without trailing slash **How to avoid:** Ensure all sitemap URLs end with slash matching project config **Warning signs:** Search console reports errors

### Pitfall 4: Pagefind includes draft content

**What goes wrong:** Unpublished posts appear in search results **Why it happens:** Pagefind indexes all HTML files in output including drafts that aren't linked **How to avoid:** Don't export drafts in build, use contentlayer to only publish posts with future dates in production

## Code Examples

Verified patterns from official sources:

### Dynamic OG Image Route (`app/api/og/route.tsx`)

```typescript
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'MyClaudes Blog';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            fontFamily: 'GeistSans',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#a3a3a3',
            marginTop: '20px',
            fontFamily: 'GeistSans',
          }}
        >
          myclaudes.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

### Build-time Sitemap Generation (`scripts/generate-sitemap.mjs`)

```javascript
import { getAllPosts } from '../lib/content.js';
import fs from 'fs';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const posts = getAllPosts();

// Static routes to include
const staticRoutes = [
  { path: '', lastmod: new Date().toISOString().split('T')[0] },
  { path: 'about', lastmod: new Date().toISOString().split('T')[0] },
  { path: 'categories', lastmod: new Date().toISOString().split('T')[0] },
  { path: 'tags', lastmod: new Date().toISOString().split('T')[0] },
];

// Add all posts
const postRoutes = posts.map((post) => ({
  path: `posts/${post.slug}`,
  lastmod: new Date(post.date).toISOString().split('T')[0],
}));

const allRoutes = [...staticRoutes, ...postRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}/${route.path}/</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`Generated sitemap.xml with ${allRoutes.length} URLs`);
```

### Pagefind Client Initialization

```typescript
import { useEffect, useState } from 'react';
import type { Index } from 'pagefind';

declare global {
  interface Window {
    pagefind: {
      init: () => Promise<Index>;
    };
  }
}

export function usePagefindSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [index, setIndex] = useState<Index | null>(null);

  useEffect(() => {
    if (!window.pagefind) return;

    async function loadIndex() {
      const pagefindIndex = await window.pagefind.init();
      setIndex(pagefindIndex);
    }

    loadIndex();
  }, []);

  useEffect(() => {
    if (!index || !query || query.length < 2) {
      setResults([]);
      return;
    }

    async function search() {
      const searchResults = await index.search(query);
      setResults(searchResults.results);
    }

    search();
  }, [query, index]);

  return results;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
| --- | --- | --- | --- |
| `next/head` for meta tags | `generateMetadata` async function | Next.js 13 App Router (2023) | Native support, better type safety, automatic deduplication |
| Server-side search | Pre-generated static index (Pagefind) | 2021-present | Zero backend, faster queries, lower cost |
| Manual OG images | Automatic dynamic generation | @vercel/og 2022 | No manual work, every post gets unique image |
| sitemap npm package | Simple build script | Always been simple | Less dependencies, easier to debug |

**Deprecated/outdated:**

- `next-seo` / `nextjs-seo`: No longer needed with App Router `generateMetadata`
- `react-helmet-async`: Doesn't work well with App Router architecture
- Algolia/DocSearch: Overkill for a personal blog, adds external dependency

## Open Questions

1. **Should categories and tags individual pages be included in sitemap?**
   - What we know: Locked decision says "include all pages + all posts"
   - What's unclear: Does "all pages" include individual category/tag pages? Current routes exist for them
   - Recommendation: Include them for complete coverage, doesn't hurt SEO

2. **Does Pagefind need to index excerpt only or full content?**
   - What we know: Pagefind can index full content from generated HTML
   - What's unclear: Full indexing increases index size
   - Recommendation: Index full content for best search quality, index size is still small for a blog (<100 posts)

## Validation Architecture

### Test Framework

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| Framework          | None detected - no test framework configured |
| Config file        | None                                         |
| Quick run command  | None                                         |
| Full suite command | None                                         |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
| --- | --- | --- | --- | --- |
| SEO-01 | Meta tags present on all pages | manual — inspect HTML output | N/A | ❌ Wave 0 |
| SEO-02 | sitemap.xml generated with all posts | manual — check output file | N/A | ❌ Wave 0 |
| SEO-03 | robots.txt present with sitemap reference | manual — check static file | N/A | ❌ Wave 0 |
| DEP-01 | Build completes successfully on Vercel | manual — deploy test | N/A | ❌ Wave 0 |
| SRCH-01 | Pagefind index generated at build time | manual — check out directory | N/A | ❌ Wave 0 |
| SRCH-02 | Search UI accessible from header | manual — UI test | N/A | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** No test framework configured, manual validation only
- **Per wave merge:** Manual validation of all requirements
- **Phase gate:** All requirements verified manually before completion

### Wave 0 Gaps

- [ ] No test framework configured in project
- [ ] All validation will be manual as project is small static blog
- [ ] No unit/infrastructure tests needed for this phase

## Sources

### Primary (HIGH confidence)

- Next.js 15 App Router documentation - `generateMetadata` API pattern verified
- `@vercel/og` documentation - Image Response API with edge runtime pattern verified
- Pagefind documentation - static export integration pattern verified
- Current project configuration - Next.js 15, `output: 'export'`, `trailingSlash: true`

### Secondary (MEDIUM confidence)

- Community consensus: Pagefind is standard choice for static blog search
- Vercel deployment: Next.js static export works out of the box on Vercel

### Tertiary (LOW confidence)

- None - all core patterns are verified

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - versions verified via npm, patterns documented officially
- Architecture: HIGH - fits existing App Router project structure, integration points known
- Pitfalls: HIGH - common issues documented by community, avoidable with proper config

**Research date:** 2026-03-17 **Valid until:** 2026-04-16 (stable libraries, low change rate)
