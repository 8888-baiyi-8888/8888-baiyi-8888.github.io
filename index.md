---
title: 首页
description: 个人知识文档库首页
---

<section class="kb-hero">
  <div class="kb-hero-copy">
    <span class="kb-eyebrow">Personal Knowledge Base</span>
    <h1>把论文阅读、技术笔记与长期思考，沉淀成可复用的个人知识资产。</h1>
    <p class="kb-hero-desc">
      这里适合持续整理论文摘记、专题学习、个人技术文档、AI 实践记录与常用模板。
      你可以把零散输入逐步沉淀为结构化知识，让内容不仅能记录，还能长期复用。
    </p>

    <div class="kb-hero-actions">
      <a class="kb-button primary" href="{{ '/docs/' | relative_url }}">进入文档目录</a>
      <a class="kb-button secondary" href="{{ '/docs/dev-workflow/' | relative_url }}">查看论文模板</a>
    </div>

    <div class="kb-hero-tags">
      <span>论文精读</span>
      <span>技术笔记</span>
      <span>AI 实践</span>
      <span>知识模板</span>
    </div>
  </div>

  <div class="kb-hero-art">
    <div class="kb-hero-art-card">
      <img src="{{ '/assets/images/hero-grid.svg' | relative_url }}" alt="文档站首页插图">
    </div>
  </div>
</section>

<section class="kb-section">
  <div class="kb-section-header">
    <span class="kb-section-kicker">CONTENT</span>
    <h2>你可以在这里写什么</h2>
    <p>围绕“学习、沉淀、复用”三个目标，逐步形成自己的知识体系。</p>
  </div>

  <div class="kb-card-grid three">
    <article class="kb-card">
      <div class="kb-card-icon">📘</div>
      <h3>论文与研究笔记</h3>
      <p>记录摘要、方法、实验结果、局限性，以及你自己的启发与思考。</p>
    </article>

    <article class="kb-card">
      <div class="kb-card-icon">🛠️</div>
      <h3>技术文档与排障记录</h3>
      <p>沉淀框架学习、配置说明、开发经验、问题排查与修复过程。</p>
    </article>

    <article class="kb-card">
      <div class="kb-card-icon">🤖</div>
      <h3>AI 实践与模板资产</h3>
      <p>整理 Prompt 模板、自动化流程、工具链实践与可复用工作流。</p>
    </article>
  </div>
</section>

<section class="kb-section">
  <div class="kb-section-header">
    <span class="kb-section-kicker">WORKFLOW</span>
    <h2>推荐维护方式</h2>
    <p>把“随手记”变成“可回看、可检索、可复用”的知识文档。</p>
  </div>

  <div class="kb-card-grid two">
    <article class="kb-card">
      <h3>日常记录建议</h3>
      <ul class="kb-list">
        <li>每读完一篇论文，至少记录摘要、方法、启发</li>
        <li>每学完一个主题，整理成一页自己的理解文档</li>
        <li>遇到问题时记录“现象 / 原因 / 修复方式”</li>
      </ul>
    </article>

    <article class="kb-card">
      <h3>长期整理建议</h3>
      <ul class="kb-list">
        <li>周期性把零散笔记合并成专题页</li>
        <li>把高频内容抽象成模板或清单</li>
        <li>持续补充引用、示例和关联链接</li>
      </ul>
    </article>
  </div>
</section>

<section class="kb-section">
  <div class="kb-section-header">
    <span class="kb-section-kicker">MODULES</span>
    <h2>当前预设模块</h2>
    <p>你可以直接基于现有目录继续扩展，而不需要重新搭建结构。</p>
  </div>

  <div class="kb-link-grid">
    <a class="kb-link-card" href="{{ '/docs/' | relative_url }}">
      <strong>文档目录</strong>
      <span>查看当前知识库的全部文档入口</span>
    </a>

    <a class="kb-link-card" href="{{ '/docs/dev-workflow/' | relative_url }}">
      <strong>论文阅读模板</strong>
      <span>用于沉淀论文摘要、方法与启发</span>
    </a>

    <a class="kb-link-card" href="{{ '/docs/feature-examples/' | relative_url }}">
      <strong>技术文档模板</strong>
      <span>用于记录开发说明、配置与排障经验</span>
    </a>
  </div>
</section>

<section class="kb-callout">
  <div class="kb-callout-copy">
    <span class="kb-section-kicker">ASSETS</span>
    <h2>图片与视觉资源已经预留好</h2>
    <p>
      当前使用 SVG 占位图，适合直接在 GitHub Pages 中展示。
      后续你可以把论文封面、思维导图、截图或流程图替换到
      <code>assets/images/</code> 目录中，而不需要调整整体页面结构。
    </p>
  </div>

  <div class="kb-callout-art">
    <img src="{{ '/assets/images/doc-illustration.svg' | relative_url }}" alt="文档插图占位图">
  </div>
</section>