---
phase: 4
slug: seo-search-deployment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-17
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                   |
| ---------------------- | ------------------------------------------------------- |
| **Framework**          | none — manual validation only                           |
| **Config file**        | none — Wave 0 installs                                  |
| **Quick run command**  | `next build` — check build completes                    |
| **Full suite command** | `next build` — full build verifies all generated output |
| **Estimated runtime**  | ~60 seconds                                             |

---

## Sampling Rate

- **After every task commit:** Run `next build` to catch build errors early
- **After every plan wave:** Full build and verify output files exist
- **Before `/gsd:verify-work`:** Full build must complete successfully
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 04-01-01 | 01 | 1 | SEO-01 — Meta tags on all pages | manual — inspect generated HTML | `next build` | ✅ / ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | SEO-02 — sitemap.xml generated at build | manual — check public/sitemap.xml | `next build` | ✅ / ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | SEO-03 — robots.txt exists in public | manual — check file content | N/A | ✅ / ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | SRCH-01 — Pagefind installs and indexes | manual — check out/pagefind after build | `next build` | ✅ / ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | SRCH-02 — Search modal component in header | manual — UI test browser | N/A | ✅ / ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 1 | DEP-01 — Vercel configuration correct | manual — Vercel deploy test | N/A | ✅ / ❌ W0 | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- [ ] No test framework configured for this project
- [ ] All validation will be manual as project is a small static blog
- [ ] Build verification (`next build`) is automated to catch errors
- [ ] Existing build infrastructure covers all phase requirements

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
| --- | --- | --- | --- |
| Meta tags output | SEO-01 | Requires HTML inspection after build | Build, then view page source, check for `<title>`, `<meta name="description">`, `<meta property="og:image">` |
| sitemap.xml content | SEO-02 | File output verification | After build, open `public/sitemap.xml`, verify it contains all post URLs |
| robots.txt format | SEO-03 | Static file content check | Open `public/robots.txt`, verify it has `Sitemap: https://yoursite.com/sitemap.xml` |
| Pagefind index output | SRCH-01 | Output directory check | After build, check `out/pagefind/` exists with `.pf-index` files |
| Search modal opens | SRCH-02 | UI interaction test | Run `next dev`, click search icon in header, verify modal opens |
| Vercel build completes | DEP-01 | Deployment platform test | Deploy to Vercel from Git, verify build succeeds |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
