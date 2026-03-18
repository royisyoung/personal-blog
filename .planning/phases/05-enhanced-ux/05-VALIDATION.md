---
phase: 05
slug: enhanced-ux
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 05 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                            |
| ---------------------- | ------------------------------------------------ |
| **Framework**          | Vitest                                           |
| **Config file**        | vitest.config.ts (needs to be created in Wave 0) |
| **Quick run command**  | `npx vitest run`                                 |
| **Full suite command** | `npx vitest run`                                 |
| **Estimated runtime**  | ~15 seconds                                      |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint && npx vitest run --passWithNoTests`
- **After every plan wave:** Run `npm run lint && npx vitest run --passWithNoTests`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 05-01-01 | 01 | 1 | UX-01 Reading progress bar | unit + manual | `npx vitest run components/ReadingProgressBar.test.tsx` | ❌ W0 | ⬜ pending |
| 05-01-02 | 02 | 1 | UX-02 Back to top button | unit + manual | `npx vitest run components/BackToTopButton.test.tsx` | ❌ W0 | ⬜ pending |
| 05-01-03 | 03 | 1 | UX-03 Copy button for code blocks | unit + manual | `npx vitest run components/CopyButton.test.tsx` | ❌ W0 | ⬜ pending |
| 05-02-01 | 04 | 2 | UX-04 Auto-generated table of contents | unit + manual | `npx vitest run lib/toc.test.ts` | ❌ W0 | ⬜ pending |
| 05-02-02 | 05 | 2 | UX-05 Related posts by shared tags | unit | `npx vitest run lib/content.test.ts` | ❌ W0 | ⬜ pending |
| 05-03-01 | 06 | 3 | UX-06 Static RSS feed generation | build test | `npx vitest run lib/generate-rss.test.ts` | ❌ W0 | ⬜ pending |
| 05-03-02 | 07 | 3 | UX-07 Estimated reading time calculation | unit | `npx vitest run lib/reading-time.test.ts` | ❌ W0 | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- [ ] Install `vitest @testing-library/react @testing-library/jest-dom jsdom` dev dependencies
- [ ] `vitest.config.ts` — Vitest configuration for Next.js
- [ ] `tests/setup.ts` — Testing setup with jest-dom matchers
- [ ] `components/ReadingProgressBar.test.tsx` — test stubs for UX-01
- [ ] `components/BackToTopButton.test.tsx` — test stubs for UX-02
- [ ] `components/CopyButton.test.tsx` — test stubs for UX-03
- [ ] `lib/toc.test.ts` — test stubs for UX-04
- [ ] `lib/content.test.ts` — test stubs for UX-05
- [ ] `lib/reading-time.test.ts` — test stubs for UX-07

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
| --- | --- | --- | --- |
| Progress bar visually updates during scrolling | UX-01 | Visual interaction cannot be fully automated | Scroll page slowly from top to bottom, verify bar width increases smoothly |
| Back to top button smooth scrolls to top | UX-02 | Visual animation cannot be fully automated | Scroll past fold, click button, verify smooth scroll to top |
| Copy button copies code and shows visual feedback | UX-03 | Clipboard access requires user interaction in test | Click button, verify icon changes to checkmark, paste elsewhere to verify copy |
| TOC highlights current heading during scroll | UX-04 | IntersectionObserver behavior best verified visually | Scroll article, verify active heading highlight updates correctly |
| All features work in both dark and light modes | All UX | Visual theme switching requires manual check | Toggle theme, verify no contrast issues, all components visible |
| All features responsive on mobile screens | All UX | Responsive layout best verified visually | View on mobile viewport, verify no overflow, correct sizing |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
