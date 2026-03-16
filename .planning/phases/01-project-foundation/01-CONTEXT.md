# Phase 1: Project Foundation & Setup - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize a working Next.js 15 project with correct static export configuration, all dependencies installed, and Tailwind CSS v4 configured with dark mode support. This phase delivers the foundational project structure that all subsequent phases build upon.

Success criteria:
1. `next dev` starts development server on localhost:3000 without errors
2. `next build` completes successfully and generates static `out` directory
3. Static export configuration correct for Vercel deployment
4. Tailwind CSS v4 with dark mode properly configured

</domain>

<decisions>
## Implementation Decisions

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

</decisions>

<specifics>
## Specific Ideas

No specific requirements outside the decisions captured above — open to standard approaches.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements
- `.planning/PROJECT.md` — Overall project vision, core value, and constraints
- `.planning/REQUIREMENTS.md` — Full requirements list including CONT-01 (this phase)
- `.planning/ROADMAP.md` — Phase boundaries and success criteria for Phase 1

</canonical_refs>

<code_context>
## Existing Code Insights

This is a new greenfield project — no existing code. All code created in this phase will be from scratch following the decisions above.

### Reusable Assets
- None (new project)

### Established Patterns
- None (new project)

### Integration Points
- None (new project — this phase creates the initial integration point)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-project-foundation*
*Context gathered: 2026-03-16*
