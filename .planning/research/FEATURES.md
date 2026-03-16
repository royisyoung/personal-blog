# Feature Landscape

**Domain:** Static technology blog built with Next.js
**Researched:** 2026-03-16
**Confidence:** MEDIUM

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Markdown 内容支持 | 技术博客标准写作方式，作者用 Markdown 创作 | LOW | Next.js 可以在构建时处理 MD/MDX 文件 |
| 代码高亮 | 技术文章包含大量代码，用户期望语法高亮 | LOW | 使用 Shiki 或 Prism 等成熟库，Next.js 生态支持完善 |
| 文章列表页 | 展示所有文章的索引页面，方便浏览 | LOW | SSG 静态生成，基于文件系统路由 |
| 文章详情页 | 单篇文章阅读页面 | LOW | Next.js 动态路由自动生成 |
| 分类/标签组织 | 用户可以按主题筛选文章，内容导航必需 | LOW | 通过 frontmatter 提取分类信息 |
| 浅色/深色主题切换 | 现代博客标配，不同阅读环境需求 | LOW | CSS 变量 + 状态持久化，成熟方案 |
| 响应式设计 | 用户使用不同设备阅读，移动端必需 | LOW | Tailwind CSS 响应式开箱即用 |
| SEO 优化 | 技术博客需要搜索引擎流量 | MEDIUM | Next.js Metadata API 或 next/head 配置 |
| 社交分享按钮 | 用户方便分享文章到社交平台 | LOW | 简单的链接按钮，无需 SDK |
| 可访问性支持 | 符合现代 Web 标准，覆盖更多读者 | LOW | 语义化 HTML，适当对比度 |
| 一键部署到 Vercel | Next.js 项目最佳实践，开发者期望 | LOW | Vercel 原生支持 Next.js |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| 客户端全文搜索 | 无需后端，快速搜索定位内容，提升发现效率 | LOW | 用 lunr.js 或 FlexSearch 静态生成索引 |
| 阅读进度条 | 提升阅读体验，让用户知道还有多少内容 | LOW | 简单的 CSS + JS 实现 |
| 回到顶部按钮 | 长文章阅读后快速返回导航 | LOW | UX 细节改进 |
| 代码块复制 | 用户方便复制示例代码 | LOW | 点击复制到剪贴板，微小但实用 |
| 文章目录导航 | 长文章可以快速跳转章节 | MEDIUM | 从标题自动生成，固定侧边栏 |
| 相关文章推荐 | 增加内容发现，延长阅读时间 | MEDIUM | 基于标签匹配，静态生成 |
| RSS 订阅 | 满足技术用户订阅习惯 | LOW | 静态生成 XML，Next.js 自定义路由 |
| 网站访问统计 | 了解读者偏好，不需要后端 | LOW | 集成 Google Analytics 或 Plausible |
| 评论系统 | 允许读者反馈讨论 | MEDIUM | 集成第三方服务（Disqus/Giscus），无需自建 |
| 图片懒加载 | 提升页面加载速度，节省带宽 | LOW | Next.js Image 组件原生支持 |
| 阅读时长估算 | 让读者提前了解文章长度 | LOW | 根据字数估算，静态计算 |
| 数学公式支持 | 如果写算法/机器学习文章需要 | MEDIUM | KaTeX 集成，按需加载 |
| 暗黑模式自动切换 | 根据系统设置自动切换主题 | LOW | 在手动切换基础上增加检测 |
| 键盘快捷键 | 支持键盘导航和操作 | LOW | 满足键盘用户习惯 |
| 字体大小调整 | 允许用户自定义阅读字体大小 | LOW | 简单的设置持久化 |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| 用户注册/登录系统 | 看起来想做社区 | 博客是只读内容，增加安全性维护成本，SSG 架构不适合 | 不需要，保持只读 |
| 在线写作后台 | 方便随时随地写文章 | 需要数据库，增加运营复杂度，破坏「文档即数据」理念 | 本地写 Markdown，Git 提交 |
| 多人协作权限管理 | 支持多个作者 | 项目定位单一作者博客，增加架构复杂度 | Git 仓库协同，单一部署 |
| 服务端动态功能 | 实时更新评论/访问统计 | 破坏 SSG 全静态优势，需要服务器维护 | 使用第三方服务（Giscus/Plausible） |
| 复杂搜索后端 | 更好的搜索排序 | 对于个人博客文章数量来说，客户端搜索足够 | 静态客户端搜索 |
| 自定义域名 HTTPS 复杂性 | 想自己托管 | Vercel 免费提供 HTTPS 和自定义域名 | 使用 Vercel 托管 |
| 富文本编辑器 | 比 Markdown 更直观 | 引入复杂度，格式容易乱，Git 不好 diff | 纯 Markdown |
| 内容分页 | 长文章拆成多页 | 破坏阅读连贯性，影响 SEO | 保持单篇文章完整 |
| 广告植入 | 想变现 | 破坏阅读体验，与「简洁专注」理念冲突 | 不做广告 |
| 复杂动画效果 | 看起来更现代 | 影响性能，分散注意力 | 必要的交互动画即可 |

## Feature Dependencies

```
文章分类/标签
    └──requires──> 文章列表页

全文搜索
    └──requires──> 所有文章内容索引

文章目录导航
    └──requires──> Markdown 内容解析

相关文章推荐
    └──requires──> 分类/标签系统

评论系统
    └──requires──> 文章详情页

代码块复制
    └──requires──> 代码高亮

RSS 订阅
    └──requires──> 文章元数据（frontmatter）
```

### Dependency Notes

- **全文搜索 requires 所有文章内容索引:** 需要在构建时提取所有文章标题和内容生成搜索索引
- **相关文章推荐 requires 分类/标签系统:** 基于共享标签计算相关性
- **文章目录导航 requires Markdown 内容解析:** 需要提取标题层次结构生成目录
- **评论系统 conflicts with 静态架构:** 需要使用第三方 JavaScript 集成避免服务端

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [x] Markdown 内容支持 — 核心写作需求
- [x] 代码高亮 — 技术文章基础必需
- [x] 文章列表页 + 详情页 — 基础浏览功能
- [x] 分类/标签组织 — 内容导航必需
- [x] 浅色/深色主题切换 — 现代博客标配
- [x] 响应式设计 — 移动端阅读必需
- [x] SEO 基础配置 — 需要搜索引擎流量
- [x] 一键部署到 Vercel — 项目要求

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] 全文搜索 — 用户反馈找不到内容时添加
- [ ] 文章目录导航 — 文章变长了之后用户需要
- [ ] 代码块复制 — 小改进但用户喜欢
- [ ] RSS 订阅 — 技术用户需要
- [ ] 阅读进度条 — UX 改进
- [ ] 相关文章推荐 — 内容多了之后增加发现
- [ ] 第三方评论系统 — 需要用户互动时

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] 数学公式支持 — 只有特定主题需要
- [ ] 键盘快捷键 — 小众需求
- [ ] 字体大小调整 — 可访问性增强，不是必需
- [ ] 多作者支持 — 只有决定扩展时需要

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Markdown 支持 | HIGH | LOW | P1 |
| 代码高亮 | HIGH | LOW | P1 |
| 文章列表/详情 | HIGH | LOW | P1 |
| 分类/标签 | HIGH | LOW | P1 |
| 深色模式切换 | HIGH | LOW | P1 |
| 响应式设计 | HIGH | LOW | P1 |
| SEO 优化 | HIGH | MEDIUM | P1 |
| 全文搜索 | HIGH | LOW | P2 |
| 代码块复制 | MEDIUM | LOW | P2 |
| 文章目录 | MEDIUM | MEDIUM | P2 |
| RSS 订阅 | MEDIUM | LOW | P2 |
| 相关文章推荐 | MEDIUM | MEDIUM | P2 |
| 评论系统 | MEDIUM | MEDIUM | P2 |
| 阅读进度条 | MEDIUM | LOW | P2 |
| 数学公式 | LOW | MEDIUM | P3 |
| 键盘快捷键 | LOW | LOW | P3 |
| 用户系统 | LOW | HIGH | P0 (Never) |
| 在线后台 | LOW | HIGH | P0 (Never) |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration
- P0 (Never): Anti-feature, do not build

## Competitor Feature Analysis

| Feature | Next.js Starter | Hexo/Gatsby | Our Approach |
|---------|-----------------|-------------|--------------|
| Markdown 支持 | Yes | Yes | 原生文件系统处理，不需要额外 CMS |
| 代码高亮 | Yes | Yes | Shiki 集成，更好的 TypeScript 支持 |
| 分类标签 | Yes | Yes | 基于 frontmatter，静态生成 |
| 深色模式 | Optional | Yes | 原生支持，作为 P1 |
| 全文搜索 | Optional | Optional | 客户端搜索，P2 |
| SSG 静态生成 | Yes | Yes | Next.js App Router + SSG |
| Vercel 一键部署 | Yes | No | 原生最佳集成 |
| 在线后台 | No | No | deliberately not building |
| 用户系统 | No | No | deliberately not building |

## Sources

- Project context: /Users/xuyang/code/my-claudes/.planning/PROJECT.md
- Next.js official documentation knowledge
- Industry patterns for static blogs
- Community best practices for personal technology blogs

---
*Feature research for: Next.js static technology blog*
*Researched: 2026-03-16*
