---
title: 首页
description: 个人知识文档库首页
---

<section class="hero">
  <div class="hero-copy">
    <span class="eyebrow">Personal Knowledge Base</span>
    <h1>把论文阅读、技术笔记和长期思考沉淀成自己的知识资产。</h1>
    <p>
      这里更适合持续整理论文摘记、专题学习、个人技术文档、AI 实践记录与常用模板。
      当前已经预置文档目录、论文阅读模板和技术文档模板，后续可以直接在此基础上扩展。
    </p>
    <div class="hero-actions">
      <a class="button primary" href="{{ '/docs/' | relative_url }}">进入文档目录</a>
      <a class="button" href="{{ '/docs/dev-workflow/' | relative_url }}">查看论文模板</a>
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
      <li>论文精读笔记、研究方向梳理、参考资料汇总</li>
      <li>个人技术文档、框架学习记录、知识卡片</li>
      <li>AI 工具链实践、Prompt 模板、自动化流程备忘</li>
      <li>代码片段、配置样板、排障记录与复盘清单</li>
    </ul>
  </article>

  <article class="info-card">
    <h2>推荐维护方式</h2>
    <ul>
      <li>每读完一篇论文，至少记录摘要、方法、启发</li>
      <li>每学完一个主题，整理成一页自己的理解文档</li>
      <li>遇到问题时记录“现象 / 原因 / 修复方式”</li>
      <li>周期性把零散笔记整理成模板或专题页</li>
    </ul>
  </article>

  <article class="info-card">
    <h2>当前预设模块</h2>
    <ul>
      <li><a href="{{ '/docs/' | relative_url }}">文档目录</a></li>
      <li><a href="{{ '/docs/dev-workflow/' | relative_url }}">论文阅读模板</a></li>
      <li><a href="{{ '/docs/feature-examples/' | relative_url }}">技术文档模板</a></li>
    </ul>
  </article>
</section>

<section class="callout">
  <div>
    <h2>预设图片与视觉资源已经放好</h2>
    <p>
      目前使用 SVG 占位图，适合在 GitHub Pages 中直接展示。后续你可以将论文封面、
      思维导图、截图或流程图替换到 <code>assets/images/</code> 中，无需改动整体结构。
    </p>
  </div>
  <img src="{{ '/assets/images/doc-illustration.svg' | relative_url }}" alt="文档插图占位图">
</section>
