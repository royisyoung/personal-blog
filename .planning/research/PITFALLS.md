# Pitfalls Research

**Domain:** Next.js Static Technical Blog
**Researched:** 2026-03-16
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Over-Engineering the Content Pipeline

**What goes wrong:**
Building complex parsing, validation, and transformation pipelines for Markdown content upfront. Adding unnecessary plugins, custom processors, and metadata systems that complicate the codebase before validating the blog content strategy.

**Why it happens:**
Developers expect future scaling needs and "clean architecture" from day one. Next.js' flexible architecture encourages custom solutions, and it's tempting to build for all possible content types immediately.

**How to avoid:**
Start with the simplest possible frontmatter + Markdown parsing using `gray-matter` and `remark`. Only add complexity when specific content features require it. Keep parsing logic in one place and resist adding custom transformations until needed.

**Warning signs:**
- More than 500 lines of code dedicated to Markdown processing
- Multiple chained remark/rehype plugins for features you don't yet need
- Complex TypeScript types for metadata that aren't used anywhere

**Phase to address:**
Foundation / MVP phase — keep it simple from the start.

---

### Pitfall 2: Incorrect Image Handling and Missing Optimization

**What goes wrong:**
Using raw `<img>` tags for blog images, or not configuring Next.js Image correctly for static export. This causes layout shifts, poor LCP (Largest Contentful Paint), and broken images in the static output.

**Why it happens:**
Next.js Image has different configurations between App Router and Pages Router. Static export requires specific settings (`unoptimized=true`) that aren't obvious to beginners. Developers copy-paste code without understanding the constraints.

**How to avoid:**
Use `next/image` with the correct configuration for static export: set `unoptimized: true` when using `output: 'export'`. Store images alongside markdown files in the content directory and configure the loader properly.

**Warning signs:**
- Getting "missed optimized image" errors during build
- Layout shift when images load
- Images broken after static export

**Phase to address:**
Foundation phase — set up image optimization correctly from the start.

---

### Pitfall 3: Not Handling Frontmatter Validation

**What goes wrong:**
Typos or missing fields in Markdown frontmatter cause silent failures during build, or broken pages with missing titles/dates. These errors are often caught after deployment.

**Why it happens:**
Blog content lives in plain files, no database schema validation. Developers assume all frontmatter is correct and don't add runtime checks.

**How to avoid:**
Add a schema validation step (using Zod or similar) when loading posts. Validate all required fields (title, date, slug, excerpt) at build time and fail the build on invalid frontmatter.

**Warning signs:**
- Posts with missing titles or dates in production
- `Cannot read property 'date' of undefined` in browser console
- Inconsistent sorting because some dates are strings and others are undefined

**Phase to address:**
Foundation phase — add validation when implementing content loading.

---

### Pitfall 4: Client-Side Search Without Preprocessing

**What goes wrong:**
Loading all post content client-side for search, causing large bundle sizes and slow initial page loads. Search indexing happens on every page load.

**Why it happens:**
Implementing full-text search feels simpler to do all client-side — no server required. Developers don't realize how much bandwidth the full content adds.

**How to avoid:**
Pregenerate a search index at build time (using libraries like `lunr` or `mini-search`) that only includes necessary fields (title, description, slug, tags). The client only loads the pre-built index, not all post content.

**Warning signs:**
- Initial JavaScript bundle larger than 200KB
- Search is slow on mobile devices
- Network tab shows hundreds of KB of content loaded upfront

**Phase to address:**
Search feature implementation — address when adding search.

---

### Pitfall 5: Ignoring Build Performance with Many Posts

**What goes wrong:**
Build times get progressively slower as more posts are added. What started as 30 seconds becomes 10+ minutes with hundreds of posts.

**Why it happens:**
Processing all Markdown files from scratch on every build, no caching. Incremental static regeneration (ISR) isn't configured properly for static exports.

**How to avoid:**
- Use incremental builds or caching for content processing
- For Next.js 15+, leverage incremental Static Site Generation
- Only process changed files during development

**Warning signs:**
- `next build` takes more than 2 minutes with under 100 posts
- Development server restart is slow after changing one post

**Phase to address:**
Can be addressed incrementally — revisit when post count grows past ~50 posts.

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hard-coding categories/tags in the layout | Faster to build initial version | Adding a new category requires changing code everywhere | Only acceptable in MVP, refactor before public launch |
| Inline CSS styles instead of proper design system | Quick to get styling done | Consistency is hard to maintain, CSS bloat | Never for a public blog — invest in a simple design system |
| Putting all styles in one global CSS file | No build configuration needed | Hard to find and modify existing styles | Acceptable for MVP if kept under 500 lines |
| Hard-coding site URLs in content | No configuration needed | Breaking links when changing domain or routes | Never — use constants and configuration |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Analytics / Umami | Loading the script on every page with client-side effect | Include the script in the root layout with proper `strategy` settings to avoid blocking |
| Disqus / Comment sections | Loading the comment JS on page load | Lazy-load comments only when the user scrolls to the comment section |
| RSS feed generation | Forgetting to generate RSS at build time | Generate `rss.xml` during the build, output to `public` directory |
| Sitemap generation | Manually maintaining sitemap | Generate sitemap automatically at build time from all posts |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all posts on the home page | Home page becomes large and slow with many posts | Implement pagination or infinite scroll starting early | ~50 posts |
| Syntax highlighting without tree-shaking | Bundle size bloats with all language grammars | Use dynamic imports or lighter highlighting alternatives like `shiki` | ~20 posts with code examples |
| Client-side route transitions without prefetch | Slow navigation between posts | Next.js does this automatically, avoid implementing custom routing | Always a problem if custom implemented |
| Uncached API calls for content in dev | Slow dev server reloads | Cache processed content or read only changed files | First post, gets progressively worse |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Embedding third-party iframes without sandbox | XSS risk from malicious embedded content | Always set `sandbox` attribute on iframes |
| Allowing raw HTML in Markdown without sanitization | Cross-site scripting if an attacker can modify content | Always sanitize raw HTML output from Markdown |
| Deploying with `.env` containing secrets checked in | Secret exposure in static output (though less risky with SSG) | Never commit `.env`, use environment variables only for build-time config |
| Linking to external sites without `rel="noopener noreferrer"` | Tabnabbing vulnerabilities | Always add `rel="noopener noreferrer"` to external links |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Open all external links in same tab | Users lose their place reading your blog | Open external links in new tab with `target="_blank"` |
| No table of contents for long posts | Hard to navigate to relevant sections | Auto-generate heading anchors and TOC for posts over 1000 words |
| Missing dark mode styles for syntax highlighting | Poor readability in dark mode | Test code highlighting in both light and dark themes |
| No copy button for code blocks | Users have to manually select and copy | Add one-click copy to clipboard for all code blocks |
| Broken heading anchors / deep linking | Can't share specific sections of articles | Generate proper ids from heading text and implement anchor linking |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **RSS Feed:** Often empty or missing posts — verify all posts are included
- [ ] **Sitemap:** Verify sitemap.xml includes all posts and is submitted to search consoles
- [ ] **SEO Meta Tags:** Check that og:image, description, and title are correctly set per-post
- [ ] **Dark Mode:** Test all content types (code blocks, images, quotes) in both themes
- [ ] **Mobile Responsiveness:** Verify code blocks don't overflow on small screens
- [ ] **Image Alt Text:** Not just missing, but frontmatter doesn't even have a field for it
- [ ] **404 Page:** Custom 404 page works correctly in static export
- [ ] **Slug Collisions:** Two posts can't accidentally end up with the same slug

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Over-engineered content pipeline | MEDIUM | Extract the minimal schema you actually need, delete unused plugins, rewrite incrementally |
| Broken image optimization | LOW | Switch to correct `next/image` config with `unoptimized: true`, move images to correct location |
| Missing frontmatter validation | LOW | Add Zod schema, fix invalid posts, add validation to build process |
| Slow builds with many posts | MEDIUM | Add build caching, implement incremental processing, consider ISR if hosting allows |
| Large bundle from client search | MEDIUM | Switch to pregenerated search index, prune unused fields from index |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Over-Engineering content pipeline | MVP | Verify Markdown processing < 500 lines, only plugins for current needs |
| Incorrect image handling | Foundation | Verify images load correctly after static export, no layout shift |
| Frontmatter validation | Foundation | Build fails when required fields missing, not just warns |
| Client-side search without preprocessing | Search feature | Verify bundle size doesn't increase more than 50KB |
| Slow builds with many posts | Post-MVP optimization | Check build time after 50 posts, optimize when needed |
| Missing RSS / sitemap | Launch preparation | Verify files exist and contain all posts |

## Sources

- Community knowledge from Next.js static blog implementations
- Common patterns observed in public Next.js blog repositories
- Next.js official documentation on static site generation gotchas
- Known issues with App Router static export configuration

---
*Pitfalls research for: Next.js Static Technical Blog*
*Researched: 2026-03-16*
