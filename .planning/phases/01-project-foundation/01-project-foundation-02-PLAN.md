---
phase: 01-project-foundation
plan: 2
type: execute
wave: 2
depends_on: [1]
files_modified:
  - next.config.ts
  - tailwind.config.ts
  - .gitignore
  - .npmrc
autonomous: true
requirements: [CONT-01]

must_haves:
  truths:
    - "Static export configuration is correct in next.config.ts"
    - "Class-based dark mode configured in tailwind.config.ts"
    - "out/ directory is gitignored"
    - "pnpm hoisting configured to prevent Next.js module errors"
  artifacts:
    - path: "next.config.ts"
      provides: "Static export configuration"
      exports: ["nextConfig"]
      contains: "output: \"export\""
      contains: "unoptimized: true"
    - path: "tailwind.config.ts"
      provides: "Tailwind configuration with dark mode"
      exports: ["config"]
      contains: "darkMode: \"class\""
    - path: ".gitignore"
      provides: "Git ignore patterns"
      contains: "out/"
  key_links:
    - from: "next.config.ts"
      to: "static export build"
      via: "output: 'export' enables out directory generation"
    - from: "tailwind.config.ts"
      to: "dark mode toggle"
      via: "darkMode: 'class' enables manual theme switching"
---

<objective>
配置核心构建选项 - 静态导出和深色模式

Purpose: 确保项目满足静态网站生成要求，并正确配置深色模式支持后续的主题切换功能
Output: 正确配置的 next.config.ts 和 tailwind.config.ts
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
  <name>Task 1: Configure Next.js for static export</name>
  <files>next.config.ts</files>
  <read_first>next.config.ts</read_first>
  <action>
Replace the entire contents of next.config.ts with the following static export configuration:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
```

这满足静态导出要求：
- `output: "export"` 启用静态导出，生成 `out` 目录
- `images.unoptimized: true` 禁用 Next.js 图片优化（不兼容静态导出）
- `trailingSlash: true` 为每个页面生成 `/page.html` 格式，兼容静态托管
- `skipTrailingSlashRedirect: true` 跳过重定向，优化静态输出
</action>
  <verify>
    <automated>grep -q "output: \"export\"" next.config.ts && grep -q "unoptimized: true" next.config.ts && echo "Config OK"</automated>
  </verify>
  <done>
  next.config.ts contains all required static export settings
  </done>
  <acceptance_criteria>
    - next.config.ts contains 'output: "export"'
    - next.config.ts contains 'unoptimized: true'
    - next.config.ts contains 'trailingSlash: true'
    - next.config.ts exports a const nextConfig
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Configure Tailwind CSS v4 with class-based dark mode</name>
  <files>tailwind.config.ts</files>
  <read_first>tailwind.config.ts</read_first>
  <action>
Update tailwind.config.ts to enable class-based dark mode. The complete configuration should be:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

根据用户决定：使用 `class` 策略，支持后续用户手动切换主题并持久化偏好设置。
</action>
  <verify>
    <automated>grep -q "darkMode: \"class\"" tailwind.config.ts && echo "Dark mode configured"</automated>
  </verify>
  <done>
  tailwind.config.ts has darkMode set to "class"
  </done>
  <acceptance_criteria>
    - tailwind.config.ts contains 'darkMode: "class"'
    - tailwind.config.ts exports a Config object
  </acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Update .gitignore and configure pnpm</name>
  <files>.gitignore, .npmrc</files>
  <read_first>.gitignore</read_first>
  <action>
1. Add `out/` to .gitignore (static build output should not be committed)
2. Create .npmrc file with hoist patterns for pnpm to avoid Next.js module resolution issues:

Add to .npmrc:
```
hoist-pattern[]=*next*
hoist-pattern[]=*react*
```

这解决了 pnpm 严格提升模式下 Next.js 有时遇到的模块找不到问题。
</action>
  <verify>
    <automated>grep -q "out/" .gitignore && test -f .npmrc && grep -q "hoist-pattern" .npmrc && echo "Gitignore and npmrc OK"</automated>
  </verify>
  <done>
    - out/ added to .gitignore
    - .npmrc created with pnpm hoist configuration
  </done>
  <acceptance_criteria>
    - .gitignore contains 'out/'
    - .npmrc exists
    - .npmrc contains 'hoist-pattern[]=*next*'
    - .npmrc contains 'hoist-pattern[]=*react*'
  </acceptance_criteria>
</task>

</tasks>

<verification>
Verify configuration by running build: pnpm build should complete without errors and create out directory.
</verification>

<success_criteria>
- next.config.ts has correct static export configuration (output: export + images unoptimized)
- tailwind.config.ts has class-based dark mode enabled
- out/ is gitignored
- pnpm hoisting configured to prevent module errors
</success_criteria>

<output>
After completion, create `.planning/phases/01-project-foundation/01-project-foundation-02-SUMMARY.md`
</output>
