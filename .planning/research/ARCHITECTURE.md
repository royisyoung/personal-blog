# Architecture Research

**Domain:** Next.js Static Technology Blog
**Researched:** 2026-03-16
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  Home   │  │ Article │  │ Archive │  │  Tags   │        │
│  │  Page   │  │  Page   │  │  Page   │  │  Page   │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
│       └────────────┴────────────┴────────────┘              │
│                    Reusable UI Components                    │
│  ┌──────────┐┌──────────┐┌────────┐┌────────┐┌─────────┐  │
│  │  Header  ││  Footer  ││  Nav   ││  Card  ││  Code   │  │
│  └──────────┘└──────────┘└────────┘└────────┘└─────────┘  │
├─────────────────────────────────────────────────────────────┤
│                     Data Processing Layer                    │
│  ┌─────────────────────┐ ┌─────────────────────────────┐   │
│  │  Markdown Parser    │ │  Metadata Extractor         │   │
│  └──────────┬──────────┘ └──────────┬────────────────┘   │
│             │                       │                     │
│  ┌──────────▼──────────┐ ┌──────────▼────────────────┐   │
│  │  Slug Generation    │ │  Taxonomy (Tags/Categories)│   │
│  └──────────┬──────────┘ └────────────────────────────┘   │
│             │                                             │
│  ┌──────────▼──────────┐                                  │
│  │  Search Indexing    │                                  │
│  └─────────────────────┘                                  │
├─────────────────────────────────────────────────────────────┤
│                       Content Layer                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               /content/posts (Markdown files)        │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               /public (static assets)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Content Layer** | Source of truth for all blog posts | Markdown files in Git, no database needed |
| **Metadata Extractor** | Extract title, date, tags, description from frontmatter | gray-matter library |
| **Markdown Parser** | Convert Markdown to HTML/React components | remark + rehype ecosystem |
| **Code Highlighter** | Syntax highlighting for code blocks | shiki or prism-react-renderer |
| **Taxonomy Builder** | Generate tag/category indexes from all posts | In-memory aggregation at build time |
| **Search Indexer** | Build searchable index for client-side search | lunr.js or mini-search, pre-generated at build time |
| **Page Components** | Render different page routes | Next.js App Router page.tsx files |
| **Shared UI Components** | Reusable UI elements across pages | React components in components/ |
| **Theme Provider** | Manage light/dark theme state | Context API + next-themes |

## Recommended Project Structure

```
/
├── content/
│   └── posts/              # Markdown blog posts
│       └── *.md
├── public/
│   ├── images/             # Post images and assets
│   └── static/             # Other static files
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── posts/
│   │   │   ├── page.tsx    # All posts archive
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Individual post
│   │   ├── tags/
│   │   │   ├── page.tsx    # All tags list
│   │   │   └── [tag]/
│   │   │       └── page.tsx # Posts by tag
│   │   ├── about/
│   │   │   └── page.tsx    # About page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Shared React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── CodeBlock.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/               # Utility functions and libraries
│   │   ├── posts.ts        # Post reading and processing
│   │   ├── tags.ts         # Tag processing
│   │   ├── search.ts       # Search utilities
│   │   └── config.ts       # Site configuration
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   └── styles/            # Global styles
│       └── globals.css
├── next.config.js
├── package.json
└── tsconfig.json
```

### Structure Rationale

- **content/posts/:** Separates content from code, makes it easy to write posts using any editor, content is versioned in Git
- **src/app/:** Follows Next.js App Router conventions, routes map directly to URL structure
- **src/components/:** Groups reusable UI together, easy to find and maintain
- **src/lib/:** Keeps business logic separate from UI, improves testability
- **src/types/:** Centralizes TypeScript interfaces for the whole app

## Architectural Patterns

### Pattern 1: Static Generation with `generateStaticParams`

**What:** All routes are generated at build time using all Markdown posts. Next.js pre-renders every page to static HTML.

**When to use:** Always for blogs - content doesn't change between deployments, maximum performance.

**Trade-offs:**
+ Best performance (static files served from CDN)
+ No server-side computation needed at request time
+ Content changes require rebuild/redeploy
- Slower build times as number of posts grows (still fine for <1000 posts)

**Example:**
```typescript
// src/app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### Pattern 2: Build-Time Data Processing

**What:** Read and process all Markdown files at build time to generate post metadata, tag indexes, and search indices.

**When to use:** Always for static blogs - all data is known at build time.

**Trade-offs:**
+ No runtime database required
+ Faster client response
+ Everything is cached statically
- Adding a post requires rebuild/redeploy

**Example:**
```typescript
// src/lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return { slug, ...data, content }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}
```

### Pattern 3: Client-Side Full-Text Search

**What:** Pre-generate a search index at build time, load it on the client, and perform search entirely in the browser.

**When to use:** Blogs with <1000 posts - simpler than hosting a separate search service.

**Trade-offs:**
+ No external service dependency
+ Free, no API rate limits
+ Works offline
+ Index size grows with number of posts
- Search happens on user's device

**Example:**
```typescript
// Build-time: generate search index
import MiniSearch from 'minisearch'

export function buildSearchIndex(posts) {
  const miniSearch = new MiniSearch({
    fields: ['title', 'content', 'tags'],
    storeFields: ['title', 'slug', 'date']
  })
  miniSearch.addAll(posts)
  return miniSearch
}

// Client-side: search from pre-generated index
const searchResults = searchIndex.search(query)
```

## Data Flow

### Build-Time Data Flow

```
Markdown Files in content/posts/
    ↓
Read from filesystem (fs.readdir/fs.readFile)
    ↓
gray-matter → Extract frontmatter (title, date, tags, description) + raw content
    ↓
remark/rehype → Parse Markdown → Transform to HTML/JSX
    ↓
Aggregate:
  ├─ Generate all post list (for archive)
  ├─ Group by tag (for tag pages)
  ├─ Build search index (for client search)
  └─ Generate static params for Next.js
    ↓
Next.js renders all pages to static HTML
    ↓
Deploy static output to CDN
```

### Client Request Flow

```
User requests URL
    ↓
CDN serves pre-rendered static HTML
    ↓
Next.js hydrates React components
    ↓
If search is triggered:
  → Load pre-generated search index (JSON)
  → Client-side search executes
  → Display results
    ↓
Final page displayed to user
```

### State Management

```
Theme State (next-themes)
    ↓ (Context Provider)
Root Layout provides theme to all components
    ↓
User toggles theme → Action → Updates theme in localStorage
    ↓
All subscribed components re-render with new theme
```

### Key Data Flows

1. **Build-Time Content Processing:** Content authors write Markdown files → Build process reads and processes all content into structured data → Next.js generates all static pages.

2. **Client-Side Search:** User types search query → Client-side search library queries pre-generated index → Results displayed without server round trip.

3. **Navigation:** User clicks link → Next.js client-side routing → New page rendered from pre-generated static HTML.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 posts | Full build-time processing, client-side search works fine |
| 100-1000 posts | Build time increases, still acceptable. Consider incremental static regeneration (ISR) if needed. |
| 1000+ posts | Client-side search index becomes large (>1MB). Consider moving to third-party search service (Algolia, Typesense). Split content into batches for incremental builds. |

### Scaling Priorities

1. **First bottleneck:** Build time. As number of posts grows, full rebuilds get slower. Fix with incremental builds or ISR.

2. **Second bottleneck:** Search index size. Large index increases client download time. Fix by moving to hosted search service.

## Anti-Patterns

### Anti-Pattern 1: Putting Markdown files in `public/` directory

**What people do:** Place Markdown files in `public/` so they're served directly, then fetch and parse them on the client.

**Why it's wrong:** Parsing happens on every client request, increases client bundle size, bad for SEO. You lose all the benefits of static generation.

**Do this instead:** Process Markdown at build time, put source files in `content/` at project root, serve pre-rendered HTML.

### Anti-Pattern 2: Adding a database for blog content

**What people do:** Use PostgreSQL/Contentful/Headless CMS to store blog posts when Markdown in Git would work fine.

**Why it's wrong:** Adds unnecessary complexity, external dependency, cost, and moving parts. For a personal blog, Git is the perfect content store.

**Do this instead:** Keep posts as Markdown files in `content/` in the same repo. Only move to a CMS if you really need multiple non-technical authors or editing via web UI.

### Anti-Pattern 3: Over-engineering state management

**What people do:** Add Redux or other heavy state manager for a blog that only needs theme state and search input.

**Why it's wrong:** Increases bundle size, adds complexity, unnecessary for the simple state needs of a blog.

**Do this instead:** Use React Context for global state (like theme), useState for component-local state. Only add a state library if you actually need it.

## Build Order (Dependency-Based)

Based on component dependencies, build in this order:

1. **Project setup** - Configure Next.js, TypeScript, basic dependencies
2. **Content layer** - Set up `content/posts` structure, write a sample post
3. **Data processing** - Implement post reading, frontmatter extraction, Markdown parsing
4. **Type definitions** - Define TypeScript types for posts, tags
5. **Shared components** - Header, Footer, PostCard, CodeBlock styling
6. **Pages** - Home page → Archive page → Post page → Tag pages
7. **Additional features** - Search → Theme toggle → Code highlighting
8. **Styling** - Global styles → Responsive adjustments → Dark mode

Dependencies:
- Pages depend on components and data processing
- Data processing depends on content structure
- Search depends on post data
- Theme toggle depends on context provider

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel Deployment | Automatic build/deploy on Git push | Connect repo, Vercel handles the rest |
| Google Analytics | Script in root layout | Add via Script component for performance |
| Umami/Plausible | Script in root layout | Privacy-friendly alternative to GA |
| Algolia Search | Push index at build time, search via API | When client-side search becomes too slow |
| GitHub Comments | Embed GitHub issue widget | Free alternative to Disqus |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| app/ ↔ components/ | Direct imports | Pages import components, no events needed |
| components/ ↔ lib/ | Direct imports | Components use lib functions for data |
| lib/ ↔ content/ | File system access (fs) | Only at build time, cannot access fs in browser |

## Sources

- Next.js official blogging tutorial (conceptual)
- Community patterns from popular Next.js blog templates
- Based on common practices in the Next.js ecosystem

---
*Architecture research for: Next.js Static Technology Blog*
*Researched: 2026-03-16*
