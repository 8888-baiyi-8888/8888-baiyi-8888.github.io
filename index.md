---
title: 首页
description: 个人开发文档站首页
---

<section class="hero">
  <div class="hero-copy">
    <span class="eyebrow">Personal Engineering Notebook</span>
    <h1>把项目经验、技术方案和 AI 实践沉淀成自己的文档资产。</h1>
    <p>
      这里可以持续记录开发过程中的决策、踩坑、模板、脚手架与可复用代码。
      当前已经预置首页、文档目录、开发工作流模板和功能样例页，后续可以直接在此基础上扩展。
    </p>
    <div class="hero-actions">
      <a class="button primary" href="{{ '/docs/' | relative_url }}">进入文档目录</a>
      <a class="button" href="{{ '/docs/feature-examples/' | relative_url }}">查看功能样例</a>
    </div>
  </div>
  <div class="hero-art">
    <img src="{{ '/assets/images/hero-grid.svg' | relative_url }}" alt="文档站首页占位插图">
  </div>
</section>

<section class="section-grid">
  <article class="info-card">
    <h2>你可以在这里写什么</h2>
    <ul>
      <li>项目架构说明、目录规范、部署流程</li>
      <li>AI 工具链实践、Prompt 模板、自动化脚本</li>
      <li>接口约定、组件样例、数据结构说明</li>
      <li>问题排查记录、经验复盘、待办清单</li>
    </ul>
  </article>

  <article class="info-card">
    <h2>推荐维护方式</h2>
    <ul>
      <li>每开一个新项目，先建一页方案文档</li>
      <li>每完成一个功能，补一段实现摘要和关键代码</li>
      <li>遇到问题时记录“现象 / 原因 / 修复方式”</li>
      <li>周期性整理为模板，减少重复劳动</li>
    </ul>
  </article>

  <article class="info-card">
    <h2>当前预设模块</h2>
    <ul>
      <li><a href="{{ '/docs/' | relative_url }}">文档目录</a></li>
      <li><a href="{{ '/docs/dev-workflow/' | relative_url }}">开发工作流示例</a></li>
      <li><a href="{{ '/docs/feature-examples/' | relative_url }}">功能样例模板</a></li>
    </ul>
  </article>
</section>

<section class="callout">
  <div>
    <h2>预设图片与视觉资源已经放好</h2>
    <p>
      目前使用 SVG 占位图，适合在 GitHub Pages 中直接展示。后续你可以将项目截图、
      架构图或封面图替换到 <code>assets/images/</code> 中，无需改动整体结构。
    </p>
  </div>
  <img src="{{ '/assets/images/doc-illustration.svg' | relative_url }}" alt="文档插图占位图">
</section>
