# Phase 5: Enhanced UX Features - Research

**Researched:** 2026-03-18 **Domain:** Next.js 15 React 客户端交互功能，静态站点生成增强 **Confidence:** HIGH

## Summary

本阶段需要为已构建的静态博客添加 7 个用户体验增强功能，所有功能都与阅读体验直接相关。项目基于 Next.js 15 App Router + Contentlayer + Tailwind CSS 4 架构，所有功能都可以通过组合客户端组件和构建时处理来实现。

所有高级设计决策都已在 CONTEXT.md 中锁定，本研究确认了每个功能的技术实现路径、标准库选择和常见陷阱。所有功能都符合项目的极简主义设计原则，不会干扰核心阅读体验。

主要挑战在于：RSS 需要构建时生成 XML 到 public 目录，TOC 需要从 MDX 提取标题信息，代码块复制按钮需要集成到现有 Shiki 高亮流程中。

**Primary recommendation:** 每个功能作为独立的 React 组件实现，使用纯 TypeScript + React 内置 API，不需要额外引入大型依赖库。对于 RSS 使用轻量级的 `rss` 包在构建时生成，TOC 通过 rehype 插件在构建时提取标题信息。

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

| Feature                | Decision                                           |
| ---------------------- | -------------------------------------------------- |
| Reading Progress Bar   | Top thin bar, updates on scroll                    |
| Back to Top            | Bottom-right fixed button, smooth scroll           |
| Copy Button            | Code block top-right, visual feedback              |
| Table of Contents      | Left sticky sidebar, H2/H3 only, highlight current |
| Related Posts          | 2-3 at end, sorted by shared tags                  |
| RSS Feed               | Static build-time, footer link, full content       |
| Estimated Reading Time | Below title, 200 WPM, exclude code                 |

Implementation Notes:

- All features should be subtle and unobtrusive — don't distract from content
- All interactive features should respect dark/light theme
- All client-side features should have smooth animations (no jarring movements)
- Keep CSS minimal, avoid unnecessary JavaScript
- Mobile-first responsive design

Success Criteria:

1. All 7 features implemented according to decisions above
2. All features work correctly in both dark and light modes
3. All features responsive on mobile devices
4. No impact on static export build process
5. No hydration errors in Next.js

### Claude's Discretion

_Technical implementation details, component structure, exact styling positions within the design constraints._

### Deferred Ideas (OUT OF SCOPE)

- Third-party comment system integration (Giscus) → ADV-07 deferred to v2
- Math formula support via KaTeX → ADV-01 deferred
- Keyboard shortcuts for navigation → ADV-02 deferred
- Adjustable font size for reader preference → ADV-03 deferred </user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
| --- | --- | --- |
| UX-01 | Reading progress bar at top of page | Confirmed: Simple client component with scroll event listener, uses React 19 useCallback and useState, no hydration issues |
| UX-02 | Back-to-top button for long articles | Confirmed: Fixed position button with smooth scroll behavior, conditional fade-in after scroll threshold |
| UX-03 | One-click copy button for code blocks | Confirmed: Clipboard API integration with visual feedback, works with existing Shiki highlighting via rehype plugin |
| UX-04 | Auto-generated table of contents for long posts | Confirmed: Build-time heading extraction via rehype plugin, pass as computed field to Post, client-side IntersectionObserver for active heading tracking |
| UX-05 | Related posts recommendation based on shared tags | Confirmed: Algorithm-based sorting at build time using Jaccard similarity on shared tags, no external ML required |
| UX-06 | RSS feed subscription | Confirmed: Build-time generation with `rss` package, output to public/rss.xml, fits SSG architecture |
| UX-07 | Estimated reading time display | Confirmed: Computed field in Contentlayer, word count with code block exclusion, 200 WPM standard for technical content |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose                           | Why Standard                                                |
| ------- | ------- | --------------------------------- | ----------------------------------------------------------- |
| rss     | 1.2.2   | RSS feed generation at build time | Lightweight, zero dependencies, generates valid RSS 2.0 XML |
| rehype  | ^13.0.0 | Heading extraction for TOC        | Already part of MDX processing pipeline                     |

### Supporting

All other features can be implemented with React 19 built-in APIs + browser APIs:

- `navigator.clipboard` for copy functionality (built into browser)
- `IntersectionObserver` for TOC active heading tracking (built into browser)
- `window.scrollTo` for smooth scroll back to top (built into browser)
- `Element.addEventListener('scroll')` for reading progress bar (built into browser)

| Library | Version | Purpose                         | When to Use                            |
| ------- | ------- | ------------------------------- | -------------------------------------- |
| (none)  | -       | Custom hook for scroll tracking | Simple enough for vanilla React        |
| (none)  | -       | Heading extraction via rehype   | Can be done with existing MDX pipeline |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
| --- | --- | --- |
| Custom RSS generation | next-rss | next-rss adds Next.js-specific wrapper, heavier than needed. RSS 1.2.2 is simpler for static build. |
| Custom TOC parsing | remark-toc | remark-toc generates inline TOC in content, we need separate component for sticky sidebar. Better to extract headings ourselves. |
| Third-party scroll | react-scroll | Adds 4KB bundle, native `window.scrollTo` with `behavior: smooth` works everywhere now. |

**Installation:**

```bash
npm install rss
npm install -D rehype
```

## Architecture Patterns

### Recommended Project Structure

```
components/
├── ui/                    # Existing shadcn/ui components
├── ReadingProgressBar.tsx # Reading progress bar
├── BackToTopButton.tsx    # Back to top button
├── CopyButton.tsx         # Copy button for code blocks
├── TableOfContents.tsx    # Sticky TOC sidebar
├── RelatedPosts.tsx       # Related posts section
└── ReadingTime.tsx        # Estimated reading time display

lib/
├── content.ts             # Existing content utilities (add related posts + reading time here)
├── generate-rss.js        # Build-time RSS generation script
└── toc.ts                 # Heading extraction utilities

content/
└── posts/                 # Existing MDX posts
```

### Pattern 1: Client Component for Scroll-based Interactions

**What:** All scroll-dependent features (progress bar, back to top, TOC active tracking) must be client components with `'use client'` directive. **When to use:** Any feature that needs to access `window` or listen to scroll events. **Example:**

```typescript
// Source: Next.js App Router documentation
'use client';

import { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollY / docHeight) * 100;
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-[3px] bg-accent z-50 transition-all duration-100"
         style={{ width: `${progress}%` }} />
  );
}
```

### Pattern 2: Build-time RSS Generation

**What:** RSS XML is generated once at build time via Node.js script that uses Contentlayer post data. **When to use:** Static site with no server-side updates. Output to `public/rss.xml`. **Example:**

```javascript
// scripts/generate-rss.js
import RSS from 'rss';
import { getAllPosts } from '../lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function generateRSS() {
  const posts = getAllPosts();
  const feed = new RSS({
    title: 'Blog Title',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    });
  });

  const xml = feed.xml({ indent: true });
  // Write to public/rss.xml
  require('fs').writeFileSync('./public/rss.xml', xml);
}
```

### Pattern 3: Rehype Plugin for Heading Extraction

**What:** Add a rehype plugin to the Contentlayer configuration that extracts all H2/H3 headings and stores them as a computed field. **When to use:** When you need TOC data available at build time, no client-side parsing needed.

### Anti-Patterns to Avoid

- **Server components accessing window:** Always put scroll-dependent code in client components to avoid hydration errors
- **Runtime RSS generation:** RSS never changes after build → generate at build time, don't make it an API route
- **Client-side MDX parsing:** Extract headings at build time, don't parse the DOM client-side → slower and unnecessary
- **Including code blocks in reading time:** Code blocks inflate word count → exclude them for realistic estimates

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
| --- | --- | --- | --- |
| RSS XML generation | Custom XML templating | `rss` package | Handles RSS 2.0 spec compliance, escaping, CDATA sections correctly |
| Clipboard API wrapper | Custom fallback handling | Native `navigator.clipboard` | All modern browsers support it, blog is technical audience → safe assumption |
| Smooth scroll | Custom easing animation | Native `window.scrollTo({ behavior: 'smooth' })` | Browser-native is smoother, no JavaScript overhead |

**Key insight:** All features except RSS generation can be implemented with browser and React built-in APIs. Only add dependency where the spec is non-trivial (RSS XML correctness).

## Common Pitfalls

### Pitfall 1: Hydration Mismatch

**What goes wrong:** Putting scroll logic in server component → accessing `window` during server render → Next.js hydration error. **Why it happens:** Forgetting `'use client'` directive in App Router. **How to avoid:** All components that use `window` or `document` must be marked as client components. **Warning signs:** `ReferenceError: window is not defined` during build.

### Pitfall 2: Scroll Event Performance

**What goes wrong:** Too many re-renders on scroll → janky scrolling on low-end devices. **Why it happens:** Setting state on every scroll event without throttling. **How to avoid:** Use CSS for the progress bar width transition, React state updates are batched, passive event listener. Modern browsers handle this well for 1-2 listeners. **Warning signs:** Frame rate drops below 60fps during scrolling.

### Pitfall 3: TOC Heading ID Collisions

**What goes wrong:** Multiple headings with same text generate same ID → broken anchor links. **Why it happens:** Generating IDs from heading text without slugifying uniqueness. **How to avoid:** Generate unique IDs by adding a counter suffix when collisions occur. **Warning signs:** Clicking TOC link jumps to wrong heading.

### Pitfall 4: Related Posts Algorithm Complexity

**What goes wrong:** Over-engineering with word embeddings or external NLP → adds build time and complexity. **Why it happens:** Thinking you need "smart" recommendations. **How to avoid:** Simple shared tag counting is sufficient for a personal blog. Sort by number of shared tags, then by recency. **Warning signs:** Build time increases by more than a few seconds.

### Pitfall 5: RSS Content Escaping

**What goes wrong:** XML invalid when post content contains special characters (`<`, `>`, `&`). **Why it happens:** Not properly escaping HTML content in RSS items. **How to avoid:** `rss` package handles escaping automatically if you pass content correctly. Use `content: encoded` for full HTML content. **Warning signs:** RSS feed doesn't validate on validator.w3.org.

## Code Examples

### Reading Progress Bar Component

```typescript
'use client';
// Source: Next.js App Router best practices
import { useState, useEffect, useCallback } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(percent);
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-primary w-full origin-left scale-x-[var(--progress)] z-50"
      style={{ '--progress': `${progress / 100}` } as React.CSSProperties}
    />
  );
}
```

### Copy to Clipboard Button

```typescript
'use client';
// Source: MDN Clipboard API documentation
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-md bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );
}
```

### Related Posts Calculation

```typescript
// lib/content.ts
// Source: Contentlayer computed fields pattern
import type { Post } from 'contentlayer/generated';

export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 3): Post[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    // Return most recent posts if no tags
    return allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  const withCommonTags = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = post.tags?.filter((tag) => currentPost.tags.includes(tag)).length || 0;
      return { post, sharedTags };
    })
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => {
      // First by number of shared tags, then by recency
      if (b.sharedTags !== a.sharedTags) {
        return b.sharedTags - a.sharedTags;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .map(({ post }) => post);

  if (withCommonTags.length >= limit) {
    return withCommonTags.slice(0, limit);
  }

  // Pad with recent posts if not enough related posts
  const recentPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug && !withCommonTags.includes(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...withCommonTags, ...recentPosts].slice(0, limit);
}
```

### Estimated Reading Time Calculation

````typescript
// contentlayer.config.ts
// Exclude code blocks from word count
function calculateReadingTime(doc: any): number {
  // Get raw markdown content
  const content = doc.body.raw;
  // Remove code blocks (between ``` fences)
  const textOnly = content.replace(/```[\s\S]*?```/g, '');
  // Count words
  const words = textOnly.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(minutes, 1); // Minimum 1 minute
}

// Add as computed field:
// computedFields: {
//   readingTime: {
//     type: 'number',
//     resolve: calculateReadingTime,
//   },
// }
````

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
| --- | --- | --- | --- |
| Third-party react-scroll for smooth scroll | Native `window.scrollTo({ behavior: 'smooth' })` | 2023+ | Removes 4KB dependency, works everywhere |
| Client-side TOC heading parsing | Build-time heading extraction via rehype | 2022+ | Faster client, smaller bundle, available at build time |
| Dynamic RSS via API route | Static RSS at build time | Always for SSG | Zero runtime overhead, CDN cacheable |
| Counting all words including code | Excluding code blocks from reading time | Always a best practice | More accurate estimate for technical content |

**Deprecated/outdated:**

- `react-reading-progress`: Unnecessary dependency, simple enough with 30 lines of React
- `next-mdx-toc`: Not needed when using Contentlayer + rehype, can extract directly in config
- Dynamically generating RSS on each request: Only needed for frequently updated content, not for static blog

## Open Questions

1. **How to integrate copy button with Shiki code blocks?**
   - What we know: Shiki already processes code blocks during MDX compilation, can add a wrapper via rehype plugin
   - What's unclear: Exact integration method to add the button to each pre code block
   - Recommendation: Add a rehype plugin that wraps each `pre` element in a relative div and injects the CopyButton

2. **IntersectionObserver vs scroll-based for TOC active heading?**
   - What we know: Both approaches work, IntersectionObserver is more performant
   - What's unclear: Which is easier to implement correctly with dynamic scrolling
   - Recommendation: Use IntersectionObserver - better performance, modern API, supported everywhere

## Validation Architecture

### Test Framework

| Property           | Value                                    |
| ------------------ | ---------------------------------------- |
| Framework          | None configured yet (needs Vitest setup) |
| Config file        | Needs to be created in Wave 0            |
| Quick run command  | `npx vitest run`                         |
| Full suite command | `npx vitest run`                         |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
| --- | --- | --- | --- | --- |
| UX-01 | Progress bar updates on scroll | unit + manual | `npx vitest run components/ReadingProgressBar.test.tsx` | ❌ Wave 0 |
| UX-02 | Back to top button scrolls to top | unit + manual | `npx vitest run components/BackToTopButton.test.tsx` | ❌ Wave 0 |
| UX-03 | Copy button copies code to clipboard | unit + manual | `npx vitest run components/CopyButton.test.tsx` | ❌ Wave 0 |
| UX-04 | TOC lists all H2/H3 headings, highlights active | unit + manual | `npx vitest run lib/toc.test.ts` | ❌ Wave 0 |
| UX-05 | Related posts sorted by shared tags | unit | `npx vitest run lib/content.test.ts` | ❌ Wave 0 |
| UX-06 | RSS generated at build time, valid XML | build test | `npx vitest run scripts/generate-rss.test.ts` | ❌ Wave 0 |
| UX-07 | Reading time correctly calculated excluding code | unit | `npx vitest run lib/reading-time.test.ts` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run lint && npx vitest run --passWithNoTests`
- **Per wave merge:** `npm run lint && npx vitest run --passWithNoTests`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `vitest.config.ts` - Vitest configuration
- [ ] `tests/setup.ts` - Testing setup for React Testing Library
- [ ] `components/ReadingProgressBar.test.tsx` - covers UX-01
- [ ] `components/BackToTopButton.test.tsx` - covers UX-02
- [ ] `components/CopyButton.test.tsx` - covers UX-03
- [ ] `lib/toc.test.ts` - covers UX-04
- [ ] `lib/content.test.ts` - covers UX-05 (related posts)
- [ ] `lib/reading-time.test.ts` - covers UX-07
- [ ] Install `@testing-library/react @testing-library/jest-dom vitest` dev dependencies

## Sources

### Primary (HIGH confidence)

- Next.js 15 App Router Documentation - Client components hydration rules
- Contentlayer Documentation - Computed fields and rehype plugin integration
- MDN Web Docs - Clipboard API, IntersectionObserver, Scroll API

### Secondary (MEDIUM confidence)

- RSS package npm - https://www.npmjs.com/package/rss - Lightweight RSS generation
- Shiki Documentation - rehype plugin integration for custom transformations

### Tertiary (LOW confidence)

- Community patterns for TOC extraction from MDX - multiple sources agree on rehype approach

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all dependencies are well-known, versions verified
- Architecture: HIGH - fits existing Contentlayer + Next.js App Router pattern
- Pitfalls: HIGH - common issues identified from Next.js App Router best practices
- All design decisions already locked by user in CONTEXT.md

**Research date:** 2026-03-18 **Valid until:** 2026-04-17 (stable libraries, no expected changes)
