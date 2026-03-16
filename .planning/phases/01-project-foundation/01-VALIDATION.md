---
phase: 1
slug: project-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none (Phase 1 is project setup only) |
| **Config file** | none — Phase 1 is configuration only |
| **Quick run command** | `pnpm build` |
| **Full suite command** | `pnpm build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm build` to verify no build regression
- **After every plan wave:** Run `pnpm build` and verify `out` directory created
- **Before `/gsd:verify-work`:** Full build must complete successfully
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01 | 01 | 1 | CONT-01 | smoke | `pnpm install` | ❌ W0 | ⬜ pending |
| 01-02 | 01 | 1 | CONT-01 | smoke | `test -f next.config.ts && grep -q "output:.*export" next.config.ts` | ❌ W0 | ⬜ pending |
| 01-03 | 01 | 1 | CONT-01 | smoke | `test -f tailwind.config.ts && grep -q "darkMode:.*class" tailwind.config.ts` | ❌ W0 | ⬜ pending |
| 01-04 | 01 | 1 | CONT-01 | smoke | `test -f .vscode/settings.json && test -f .vscode/extensions.json` | ❌ W0 | ⬜ pending |
| 01-05 | 01 | 1 | CONT-01 | smoke | `test -f .env.example && grep -q ".env" .gitignore` | ❌ W0 | ⬜ pending |
| 01-06 | 02 | 1 | CONT-01 | smoke | `pnpm dev & sleep 10 && kill %1` | ❌ W0 | ⬜ pending |
| 01-07 | 02 | 1 | CONT-01 | smoke | `pnpm build` | ❌ W0 | ⬜ pending |
| 01-08 | 02 | 1 | CONT-01 | smoke | `test -d out` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

This is a greenfield project — all infrastructure will be created in this phase. Wave 0 is the initial project scaffolding.

- [ ] Project scaffolding from `create-next-app`
- [ ] `output: 'export'` configured in `next.config.ts`
- [ ] `images.unoptimized: true` configured for static export
- [ ] `darkMode: 'class'` configured in `tailwind.config.ts`
- [ ] `.vscode/` directory with settings and recommendations
- [ ] `.env.example` template file created
- [ ] `husky` and `lint-staged` configured with pre-commit hook

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `next dev` starts on localhost:3000 without errors | CONT-01 | Requires manual verification of server startup | Run `pnpm dev`, visit http://localhost:3000 in browser — confirm page loads without errors |
| Tailwind CSS dark mode classes work correctly | CONT-01 | Visual verification required | Inspect HTML element, manually add `dark` class to `<html>` — confirm dark styles activate |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
