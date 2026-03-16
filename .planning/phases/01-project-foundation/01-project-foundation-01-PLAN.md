---
phase: 01-project-foundation
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - .gitignore
  - app/
  - public/
  - tsconfig.json
  - next.config.ts
  - tailwind.config.ts
  - .eslintrc.json
autonomous: true
requirements: [CONT-01]

must_haves:
  truths:
    - "Project scaffolding initialized with create-next-app"
    - "All core dependencies (Next.js 15, React 19, TypeScript, Tailwind 4 installed via pnpm"
    - "Initial app structure created at project root"
  artifacts:
    - path: "package.json"
      provides: "Project metadata and core dependencies"
      contains: '"next": "15.x"'
    - path: "app/"
      provides: "Next.js 15 App Router root directory"
      min_entries: 2
    - path: "next.config.ts"
      provides: "Next.js configuration base"
  key_links:
    - from: "create-next-app"
      to: "app/"
      via: "Scaffolding creates default root app structure"
---

<objective>
使用官方 create-next-app 脚手架初始化 Next.js 15 项目

Purpose: 这是项目基础，所有后续阶段都建立在这个基础之上
Output: 初始化的 Next.js 15 App Router 项目结构，核心依赖已安装
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
  <name>Task 1: Initialize Next.js 15 project with create-next-app</name>
  <files>package.json, .gitignore, tsconfig.json, next.config.ts, tailwind.config.ts, .eslintrc.json, app/, public/</files>
  <read_first>
  </read_first>
  <action>
使用 pnpm create-next-app 命令在当前目录初始化项目，参数如下：
- 使用 TypeScript
- 启用 ESLint
- 启用 Tailwind CSS
- 使用 App Router
- 禁用 src-dir 目录包装（app 在根目录）
- import-alias 设置为 "@/*"
- 接受所有其他默认选项

命令：
```bash
pnpm create next-app . --typescript --eslint --tailwind --app --no-src-dir --import-alias "@/*"
```

根据用户决定：
- 使用 pnpm 作为包管理器
- 项目结构保持 app/ 在根目录，不使用 src/ 包装
</action>
  <verify>
    <automated>ls app/page.tsx && grep -q '"next":' package.json && echo "Scaffolding complete"</automated>
  </verify>
  <done>
    - package.json contains "next": "^15.x
    - app/ directory exists at project root
    - app/page.tsx exists
    - next.config.ts exists
    - tailwind.config.ts exists
    - tsconfig.json exists with import alias "@/*"
  </done>
  <acceptance_criteria>
    - file exists: app/page.tsx
    - file exists: next.config.ts
    - file exists: tailwind.config.ts
    - file exists: tsconfig.json
    - package.json contains '"next": "15"'
    - tsconfig.json contains '"@/*": ["./*"]'
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Install all dependencies with pnpm</name>
  <files>pnpm-lock.yaml</files>
  <read_first>package.json</read_first>
  <action>
运行 `pnpm install` 安装所有依赖。确认安装后没有错误。
</action>
  <verify>
    <automated>pnpm install && test -d node_modules && pnpm list next | grep -q 15 && echo "Dependencies installed"</automated>
  </verify>
  <done>
    - node_modules created with all dependencies installed
    - Next.js version is 15.x
  </done>
  <acceptance_criteria>
    - directory exists: node_modules
    - pnpm list next output contains "15."
  </acceptance_criteria>
</task>

</tasks>

<verification>
Initial scaffolding is complete. Run `pnpm dev --port 3000 should start without errors.
</verification>

<success_criteria>
- Project scaffolding initialized by create-next-app
- All core dependencies installed successfully
- Project structure matches decisions (app at root, no src/ wrapper)
- Next.js 15, React 19, TypeScript, Tailwind 4 all present at correct versions
</success_criteria>

<output>
After completion, create `.planning/phases/01-project-foundation/01-project-foundation-01-SUMMARY.md`
</output>
