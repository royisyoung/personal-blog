# Requirements: Personal Blog

**Defined:** 2026-03-16 **Core Value:** Provide a fast, clean reading experience that lets readers focus on technical content.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Content Infrastructure

- [x] **CONT-01**: Next.js 15 App Router project initialized with static export configuration
- [x] **CONT-02**: Support Markdown/MDX files as content source (documents as data)
- [x] **CONT-03**: Parse frontmatter from markdown files (title, date, description, category, tags)
- [x] **CONT-04**: Extract all posts metadata at build time for listing and filtering
- [x] **CONT-05**: Shiki code syntax highlighting for code blocks

### Core Pages & Navigation

- [x] **PAGE-01**: Home page with blog description and list of all posts
- [x] **PAGE-02**: Individual post page with full markdown content rendering
- [x] **PAGE-03**: Category page showing posts filtered by category
- [x] **PAGE-04**: Tag page showing posts filtered by tag
- [x] **PAGE-05**: About page for author information

### UI/UX Features

- [x] **UI-01**: Minimalist clean design focused on content readability
- [x] **UI-02**: Responsive layout supporting mobile, tablet, and desktop
- [x] **UI-03**: Light/dark theme toggle with preference persistence
- [x] **UI-04**: Site header with navigation links
- [x] **UI-05**: Pagination for post list when there are many posts

### SEO & Deployment

- [ ] **SEO-01**: Proper meta tags for each page (title, description, Open Graph)
- [ ] **SEO-02**: Generate sitemap.xml at build time
- [ ] **SEO-03**: Generate robots.txt
- [ ] **DEP-01**: Configured for one-click deployment to Vercel

### Search Functionality

- [ ] **SRCH-01**: Full-text search across all blog posts using Pagefind
- [ ] **SRCH-02**: Search UI component accessible from any page

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced UX

- **UX-01**: Reading progress bar at top of page
- **UX-02**: Back-to-top button for long articles
- **UX-03**: One-click copy button for code blocks
- **UX-04**: Auto-generated table of contents for long posts
- **UX-05**: Related posts recommendation based on shared tags
- **UX-06**: RSS feed subscription
- **UX-07**: Third-party comment system integration (Giscus)
- **UX-08**: Estimated reading time display

### Advanced Features

- **ADV-01**: Math formula support via KaTeX
- **ADV-02**: Keyboard shortcuts for navigation
- **ADV-03**: Adjustable font size for reader preference

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
| --- | --- |
| User registration/login system | Blog is read-only, adds security maintenance overhead, doesn't fit SSG architecture |
| Online writing admin backend | Requires database, increases operational complexity, contradicts "documents as data" philosophy |
| Multi-user collaboration | Single-author blog by design, Git collaboration sufficient |
| Server-side dynamic features | Breaks full static advantage, requires server maintenance; use third-party services instead |
| Rich text WYSIWYG editor | Pure Markdown preferred for simplicity and Git diff friendliness |
| Splitting long articles into multiple pages | Hurts reading flow and SEO; keep articles single-page |
| Advertising | Detracts from clean reading experience, contradicts minimalist philosophy |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| CONT-01     | Phase 1 | Complete |
| CONT-02     | Phase 2 | Complete |
| CONT-03     | Phase 2 | Complete |
| CONT-04     | Phase 2 | Complete |
| CONT-05     | Phase 2 | Complete |
| PAGE-01     | Phase 3 | Complete |
| PAGE-02     | Phase 3 | Complete |
| PAGE-03     | Phase 3 | Complete |
| PAGE-04     | Phase 3 | Complete |
| PAGE-05     | Phase 3 | Complete |
| UI-01       | Phase 3 | Complete |
| UI-02       | Phase 3 | Complete |
| UI-03       | Phase 3 | Complete |
| UI-04       | Phase 3 | Complete |
| UI-05       | Phase 3 | Complete |
| SEO-01      | Phase 4 | Pending  |
| SEO-02      | Phase 4 | Pending  |
| SEO-03      | Phase 4 | Pending  |
| DEP-01      | Phase 4 | Pending  |
| SRCH-01     | Phase 4 | Pending  |
| SRCH-02     | Phase 4 | Pending  |

**Coverage:**

- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---

_Requirements defined: 2026-03-16_ _Last updated: 2026-03-16 after roadmap creation_
