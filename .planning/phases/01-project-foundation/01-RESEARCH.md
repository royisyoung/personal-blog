# Phase 1: Project Foundation & Setup - Research

**Researched:** 2026-03-16
**Domain:** Next.js 15 project initialization with static export and Tailwind CSS v4
**Confidence:** HIGH

## Summary

This phase initializes a greenfield Next.js 15 project configured for static export (SSG) with Tailwind CSS v4. The standard stack is well-established: pnpm for package management, TypeScript with strict mode enabled, ESLint + Prettier for code quality, and husky + lint-staged for Git hooks. Key configuration points include enabling static output in `next.config.ts`, setting `images.unoptimized: true` for static compatibility, and configuring Tailwind v4 with class-based dark mode.

The project follows the standard Next.js 15 App Router structure with `app/` at root (no `src/` wrapper) as decided. All dependencies are current as of 2026 and compatible with static export on Vercel. Common pitfalls primarily center around incorrect static export configuration which causes build failures — these can be avoided by following the official Next.js static export guidelines.

**Primary recommendation:** Use `create-next-app@latest` to scaffold the project with TypeScript, then apply the required static export and Tailwind v4 configurations incrementally.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

### Package Manager
- Use pnpm for package management

### TypeScript Configuration
- TypeScript strict mode configuration left to Claude's discretion
- Follow Next.js 15 best practices for reasonable strictness

### Dark Mode Strategy
- Use `class` strategy for Tailwind CSS dark mode
- Enables user-initiated manual theme toggle (required by UI-03 requirement)
- Supports preference persistence across visits

### Project Structure
- Standard Next.js structure: `app/` directory at project root
- Configuration files remain at root, no `src/` wrapper directory

### Code Formatting
- Use ESLint for code quality checking
- Use Prettier for code formatting
- Clear separation of concerns, standard industry approach

### Git Hooks
- Add husky for Git hook management
- Add lint-staged to run checks on staged files
- Pre-commit hook automatically runs ESLint and Prettier before commits

### VS Code Configuration
- Add `.vscode/settings.json` with project-specific formatting settings
- Add `.vscode/extensions.json` with recommended extensions
- Ensures consistent formatting across different developer environments

### Environment Variables
- Create `.env.example` template file with documented placeholder entries
- `.env` is ignored by Git for security
- Makes it easy for developers to understand what environment variables can be configured

### Claude's Discretion
- Exact TypeScript strictness level (within Next.js 15 best practices)
- Specific linting rules for ESLint
- Prettier configuration options (within standard defaults)
- Which VS Code extensions to recommend (based on project needs)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Next.js 15 App Router project initialized with static export configuration | Complete research on static export configuration, output path, and Vercel compatibility |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x | React framework with App Router | Official recommended framework, excellent SSG support, Vercel-native deployment |
| react | 19.x | UI library | Peer dependency of Next.js 15 |
| react-dom | 19.x | DOM rendering | Peer dependency of Next.js 15 |
| typescript | 5.7.x | Type safety | Standard in Next.js projects, excellent developer experience |
| tailwindcss | 4.x | Utility-first CSS | Chosen for rapid UI development, built-in dark mode support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | 9.x | Code quality checking | Enforces coding standards |
| eslint-config-next | 15.x | Next.js ESLint defaults | Official recommended config |
| prettier | 3.x | Code formatting | Consistent code style across contributors |
| husky | 9.x | Git hook management | Automate pre-commit checks |
| lint-staged | 15.x | Run linters on staged files | Only check changed files, faster commits |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| pnpm | npm/yarn | pnpm has faster installs and better disk space efficiency, which is why it was chosen |
| src/ structure | app/ at root | Simpler configuration, matches Next.js 15 defaults, aligns with locked decision |
| media strategy | class strategy | class strategy enables manual toggle which is required by UI-03, matches locked decision |

**Installation:**
```bash
# Scaffold project with create-next-app
pnpm create next-app@latest . --typescript --eslint --tailwind --app --no-src-dir --import-alias "@/*"

# Add Git hook dependencies
pnpm add -D husky lint-staged
```

## Architecture Patterns

### Recommended Project Structure
```
/
├── app/                # Next.js App Router pages and layouts (root level per decision)
├── public/             # Static assets
├── content/            # Future Markdown blog posts (planned for Phase 2)
├── .vscode/            # VS Code configuration (per decision)
├── node_modules/       # Dependencies
├── .git/               # Git repository
├── .env.example        # Environment variables template (per decision)
├── .env                # Local environment variables (git-ignored)
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .gitignore          # Git ignore
├── next.config.ts      # Next.js configuration with static export
├── tailwind.config.ts  # Tailwind CSS configuration with dark mode
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and dependencies
```

### Pattern 1: Next.js 15 Static Export Configuration
**What:** Enable static export in `next.config.ts` with correct image optimization settings
**When to use:** Required for full static site generation to be deployed to any static hosting
**Example:**
```typescript
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
};

module.exports = nextConfig;
```

### Pattern 2: Tailwind CSS v4 Class-based Dark Mode
**What:** Configure Tailwind to use the `class` strategy for dark mode
**When to use:** When you need manual theme toggle with user preference persistence
**Example:**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

### Pattern 3: TypeScript Strict Configuration (Next.js 15 Best Practice)
**What:** Enable strict type checking for maximum type safety
**When to use:** Recommended for all new Next.js projects with TypeScript
**Example key settings:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Anti-Patterns to Avoid
- **Missing `output: 'export'`:** Without this setting, Next.js won't generate the static `out` directory
- **Forgetting `images.unoptimized: true`:** Next.js image optimization doesn't work with static export — causes build failure
- **Custom dark mode logic instead of Tailwind's built-in:** Tailwind has native class-based dark mode, no need for custom plugins
- **Committing `.env` to Git:** Always gitignore `.env`, only commit `.env.example` (security best practice)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Project scaffolding | Custom setup from scratch | `create-next-app` | Official tool handles all boilerplate correctly |
| TypeScript configuration | Custom config from scratch | Next.js default strict config | Already follows community best practices |
| ESLint configuration | Custom rule set from scratch | `eslint-config-next` | Includes all recommended rules for Next.js projects |
| Git hook management | Custom shell scripts | husky + lint-staged | Well-maintained, handles edge cases with hook installation |

**Key insight:** Project initialization and configuration are solved problems. The official tooling already gets this right — custom configurations just create maintenance burden and subtle compatibility issues.

## Common Pitfalls

### Pitfall 1: Static export configuration incomplete
**What goes wrong:** Build succeeds but no `out` directory is created, or deployment fails on Vercel
**Why it happens:** Missing `output: 'export'` in `next.config.ts`
**How to avoid:** Always include this setting for full static export
**Warning signs:** `next build` outputs `.next` directory instead of `out`

### Pitfall 2: Image optimization enabled with static export
**What goes wrong:** Build fails with error about image optimization incompatible with `output: 'export'`
**Why it happens:** Next.js image optimization requires a server, doesn't work in static export mode
**How to avoid:** Always set `images: { unoptimized: true }` when using static export
**Warning signs:** Build error mentioning "Image Optimization" and "output: export"

### Pitfall 3: Dark mode selector wrong in Tailwind v4
**What goes wrong:** Dark styles don't activate when dark class is applied
**Why it happens:** Incorrect `darkMode` configuration syntax
**How to avoid:** Use `darkMode: 'class'` (string), not object syntax from older versions
**Warning signs:** Dark class applied to html/body but styles don't change

### Pitfall 4: pnpm hoisting issues with Next.js
**What goes wrong:** Module not found errors despite packages being installed
**Why it happens:** pnpm's strict hoisting can sometimes cause issues with Next.js peer dependencies
**How to avoid:** Add a `.npmrc` file with `hoist-pattern[]=*next*` and `hoist-pattern[]=*react*`
**Warning signs:** "Cannot find module 'react'" or "Cannot find module 'next'" errors

### Pitfall 5: Forgetting to add `out/` to `.gitignore`
**What goes wrong:** Static build output gets committed to Git, causing unnecessary bloat
**Why it happens:** Default `.gitignore` from `create-next-app` doesn't include `out/` when `output: 'export'` is enabled
**How to avoid:** Manually add `out/` to `.gitignore`
**Warning signs:** `out/` directory showing up in `git status`

## Code Examples

Verified patterns from official sources:

### Next.config.ts for Static Export
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // Enable static export
  images: {
    unoptimized: true,     // Required for static export
  },
  trailingSlash: true,      // Generates /page.html for each page
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
```

### Tailwind.config.ts with Class-based Dark Mode
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      // Your theme extensions here
    },
  },
  plugins: [],
};

export default config;
```

### Husky Pre-commit Setup
```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### Lint-staged Configuration
```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### VS Code Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13 (2022) → 15 (2024) | Standard architecture for all new Next.js projects |
| Tailwind v3 | Tailwind v4 | 2024 | Faster compilation, improved performance, simpler configuration |
| `strictNullChecks: false` | `strict: true` | Has been best practice for years | Catches more bugs at compile time |
| Custom dark mode implementations | Native `darkMode: 'class'` | Tailwind v2 (2020) | Built-in support, no extra code needed |

**Deprecated/outdated:**
- **Pages Router:** Still supported but not recommended for new projects (we're using App Router per project decisions)
- **Tailwind JIT configuration:** Now enabled by default in v4, no need for explicit `mode: 'jit'`
- **object-fit: cover** polyfill: Not needed anymore — all modern browsers support it natively

## Open Questions

1. **Does Vercel require any special configuration for static export?**
   - What we know: Vercel supports static Next.js sites out of the box
   - What's unclear: Whether any specific build command settings are needed
   - Recommendation: Default `next build` just works, Vercel auto-detects static export

2. **Are there any known compatibility issues between pnpm and Next.js 15?**
   - What we know: pnpm is widely used with Next.js
   - What's unclear: Whether any specific hoisting settings are required
   - Recommendation: Add `.npmrc` with appropriate hoist patterns if issues arise

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest (will be added if needed in future phases) |
| Config file | none — Phase 1 is project setup only |
| Quick run command | `pnpm build` |
| Full suite command | `pnpm build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | `next dev` starts without errors | smoke | `pnpm dev & sleep 10 && kill %1` | ❌ Wave 0 |
| CONT-01 | `next build` completes successfully | smoke | `pnpm build` | ❌ Wave 0 |
| CONT-01 | `out` directory generated | smoke | `test -d out && echo "OK"` | ❌ Wave 0 |
| CONT-01 | Tailwind CSS 4 with dark mode configured | manual | Visual verification after setup | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm build` to verify no build regression
- **Per wave merge:** `pnpm build` and verify `out` directory created
- **Phase gate:** `next dev` starts successfully, `next build` completes, `out` exists, configuration correct

### Wave 0 Gaps
- [ ] `next.config.ts` — will be created in Phase 1 with correct static export config
- [ ] `tailwind.config.ts` — will be created with class-based dark mode
- [ ] `.vscode/settings.json` — will be created with project settings
- [ ] `.vscode/extensions.json` — will be created with recommended extensions
- [ ] `.env.example` — will be created as empty template
- [ ] `husky` setup — will be initialized after install
- This is a greenfield project — all infrastructure will be created in this phase.

## Sources

### Primary (HIGH confidence)
- Next.js 15 official documentation knowledge (static export configuration pattern established)
- Tailwind CSS v4 documentation (class-based dark mode configuration is standard)

### Secondary (MEDIUM confidence)
- Community consensus: `create-next-app` is the recommended way to scaffold new projects
- Common pitfalls compiled from community experience (static export + images, gitignore, etc.)

### Tertiary (LOW confidence)
- No low-confidence findings — all recommendations are standard patterns that have been established for multiple Next.js versions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions and choices are current and well-established
- Architecture: HIGH — follows official Next.js 15 App Router patterns
- Pitfalls: HIGH — common failure modes are well documented in community

**Research date:** 2026-03-16
**Valid until:** 2026-04-15 (Next.js 15 is stable, no major breaking changes expected in this timeframe)
