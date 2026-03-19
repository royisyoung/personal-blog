# Project Retrospective

_A living document updated after each milestone. Lessons feed forward into future planning._

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-19 **Phases:** 5 | **Plans:** 19 | **Total Tasks:** ~60

### What Was Built

- Fully functional static technical blog with Next.js 15 and Contentlayer
- Markdown/MDX content pipeline with frontmatter validation and Shiki syntax highlighting
- Complete responsive UI: home, post, category, tag, about pages with pagination
- Full-text search via Pagefind with accessible modal UI
- Enhanced UX: reading progress, copy button, TOC, related posts, RSS, reading time
- 33 unit tests covering all utility functions and components

### What Worked

- GSD phase-based planning worked well - each plan focused on one clear deliverable
- Parallel planning/execution kept momentum consistent
- Contentlayer + Next.js integration worked smoothly for static content
- Shiki provides excellent syntax highlighting with dual theme support
- Chinese slug generation fixed early in testing - good test coverage caught the bug
- The incremental approach (one plan at a time) prevented context overload

### What Was Inefficient

- Some dependency version compatibility issues (remark-gfm v4 incompatibility) required debugging and downgrades - this took extra time
- Nyquist validation was not fully completed for all phases - optional but good practice for larger projects
- Manual extraction of one-liners for milestone completion - tooling could automate more

### Patterns Established

- **One feature per plan** - keeps commits clean and reviewable
- **Summary after every plan** - documents what was actually built vs planned
- **Acceptance criteria verification** - each plan completes only when all criteria checked off
- **Unit tests for utilities** - catches regression bugs early

### Key Lessons

1. **Version pinning matters** - bleeding edge versions can have breaking API changes that block the build
2. **Test Unicode/non-English content early** - default regex patterns often assume ASCII-only
3. **Contentlayer is production ready** for static blogs - better alternative to older tools like next-mdx-remote
4. **Pagefind is excellent** for client-side search on static sites - zero backend needed

### Cost Observations

- Model mix: ~20% opus (planning), 80% sonnet (execution) - good balance for this project size
- Sessions: ~8 sessions over 2 days
- Notable: Parallel execution of research/planning where possible saved time

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change                                  |
| --------- | -------- | ------ | ------------------------------------------- |
| v1.0      | 8        | 5      | Initial project - GSD workflow from scratch |

### Cumulative Quality

| Milestone | Tests | Coverage                      | Zero-Dep Additions |
| --------- | ----- | ----------------------------- | ------------------ |
| v1.0      | 33    | ~80% (utilities + components) | 0                  |

### Top Lessons (Verified Across Milestones)

_(None yet - this is the first milestone)_
