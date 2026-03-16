---
phase: 01-project-foundation
plan: 3
type: execute
wave: 3
depends_on: [1, 2]
files_modified:
  - package.json
  - .husky/pre-commit
  - .vscode/settings.json
  - .vscode/extensions.json
  - .env.example
autonomous: true
requirements: [CONT-01]

must_haves:
  truths:
    - "husky Git hook manager installed and initialized"
    - "lint-staged configured to run ESLint + Prettier on pre-commit"
    - "VS Code configuration created with consistent formatting settings"
    - ".env.example template created for documentation"
  artifacts:
    - path: "package.json"
      provides: "lint-staged configuration"
      contains: "lint-staged"
    - path: ".husky/pre-commit"
      provides: "Pre-commit Git hook"
      contains: "lint-staged"
    - path: ".vscode/settings.json"
      provides: "VS Code project formatting settings"
    - path: ".vscode/extensions.json"
      provides: "Recommended extensions list"
    - path: ".env.example"
      provides: "Environment variable template"
  key_links:
    - from: ".husky/pre-commit"
      to: "lint-staged"
      via: "Pre-commit hook runs npx lint-staged"
    - from: "package.json"
      to: "lint-staged"
      via: "lint-staged config defines which files get processed"
---

<objective>
设置开发工具 - Git hooks 和编辑器配置

Purpose: 确保代码质量一致，格式化自动执行，开发者环境统一
Output: 可工作的 husky + lint-staged 设置，VS Code 配置，环境变量模板
</objective>

<execution_context>
@/Users/xuyang/.claude/get-shit-done/workflows/execute-plan.md
@/Users/xuyang/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-project-foundation/01-CONTEXT.md
@.planning/phases/01-project-foundation/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install and configure husky + lint-staged</name>
  <files>package.json, .husky/pre-commit</files>
  <read_first>package.json</read_first>
  <action>
1. Install husky and lint-staged as dev dependencies:
```bash
pnpm add -D husky lint-staged
```

2. Initialize husky:
```bash
npx husky install
```

3. Add prepare script to package.json to auto-install husky when someone clones the project:
```bash
npm set-script prepare "husky"
```

4. Create pre-commit hook:
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

5. Add lint-staged configuration to package.json:
```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```
</action>
  <verify>
    <automated>test -f .husky/pre-commit && grep -q "lint-staged" package.json && echo "Git hooks configured"</automated>
  </verify>
  <done>
    - husky and lint-staged installed
    - husky initialized
    - prepare script added to package.json
    - pre-commit hook created that runs lint-staged
    - lint-staged configuration in package.json
  </done>
  <acceptance_criteria>
    - package.json contains '"husky"' in devDependencies
    - package.json contains '"lint-staged"' in devDependencies
    - package.json contains '"prepare": "husky"'
    - package.json contains '"lint-staged"' key with configuration
    - .husky/pre-commit exists and contains 'npx lint-staged'
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Create VS Code configuration</name>
  <files>.vscode/settings.json, .vscode/extensions.json</files>
  <read_first>
  </read_first>
  <action>
Create .vscode directory if it doesn't exist, then create two files:

1. .vscode/settings.json with project-specific formatting settings:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

2. .vscode/extensions.json with recommended extensions:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```
</action>
  <verify>
    <automated>test -f .vscode/settings.json && test -f .vscode/extensions.json && echo "VS Code config created"</automated>
  </verify>
  <done>
    - .vscode/settings.json created with correct formatting settings
    - .vscode/extensions.json created with recommended extensions
  </done>
  <acceptance_criteria>
    - .vscode/settings.json exists and contains '"editor.formatOnSave": true'
    - .vscode/settings.json contains '"source.fixAll.eslint": true'
    - .vscode/extensions.json exists and contains "recommendations" array
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Create .env.example template</name>
  <files>.env.example</files>
  <read_first>
  </read_first>
  <action>
Create .env.example file as a template for environment variables. Currently there are no required environment variables for Phase 1, but create an empty template with documentation header:

```
# Environment Variables
# Copy this file to .env and fill in your values
# .env is git-ignored for security

# No environment variables required for Phase 1
# Add your environment variables here as needed in future phases
```
</action>
  <verify>
    <automated>test -f .env.example && echo "Env template created"</automated>
  </verify>
  <done>
    - .env.example created and committed to Git
    - .env remains git-ignored (already in .gitignore from scaffolding)
  </done>
  <acceptance_criteria>
    - .env.example exists
    - .env.example contains '# Environment Variables'
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 4: Verify full build and smoke test</name>
  <files>out/ (generated)</files>
  <read_first>next.config.ts, tailwind.config.ts</read_first>
  <action>
Run pnpm build to verify the entire build completes successfully and generates the out directory.
</action>
  <verify>
    <automated>pnpm build && test -d out && echo "Build complete - out directory created"</automated>
  </verify>
  <done>
    - pnpm build exits with code 0 (success)
    - out directory is created with static content
  </done>
  <acceptance_criteria>
    - `pnpm build` command exits with status 0
    - directory exists: out
    - out directory contains index.html
  </acceptance_criteria>
</task>

</tasks>

<verification>
Final phase verification: pnpm build completes, out directory created, all configurations correct.
</verification>

<success_criteria>
- husky installed and initialized
- lint-staged configured to run ESLint + Prettier on pre-commit
- VS Code settings created with format-on-save enabled
- Recommended extensions configured for VS Code
- .env.example template created
- pnpm build completes successfully
- out directory generated with static content
</success_criteria>

<output>
After completion, create `.planning/phases/01-project-foundation/01-project-foundation-03-SUMMARY.md`
</output>
