---
layout: default
title: 首页
---

<section class="hero-card">
  <div class="hero-copy">
    <span class="hero-badge">Personal Knowledge Garden</span>
    <h1>一个偏浅绿蓝色的个人技术文档站</h1>
    <p>
      这里主要分为三部分：个人研究、技术翻译、技术理解。
      整体风格偏春和景明，颜色以浅绿、浅蓝、米白为主，适合作为长期维护的 GitHub Pages 文档主页。
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="{{ '/research/' | relative_url }}">进入个人研究</a>
      <a class="btn btn-secondary" href="{{ '/about/' | relative_url }}">查看站点说明</a>
    </div>
  </div>
  <div class="hero-visual">
    <img src="{{ '/assets/images/samples/hero-landscape.svg' | relative_url }}" alt="浅绿蓝风格首页插图">
  </div>
</section>

<section class="grid-section">
  <a class="feature-card" href="{{ '/research/' | relative_url }}">
    <h2>个人研究</h2>
    <p>适合记录论文思路、系统设计、实验方案、长期专题研究等内容。</p>
    <span>查看模块 →</span>
  </a>
  <a class="feature-card" href="{{ '/translation/' | relative_url }}">
    <h2>技术翻译</h2>
    <p>适合整理外文论文、官方文档、博客文章的翻译与对照笔记。</p>
    <span>查看模块 →</span>
  </a>
  <a class="feature-card" href="{{ '/understanding/' | relative_url }}">
    <h2>技术理解</h2>
    <p>适合写原理拆解、概念总结、实践心得，以及对复杂技术的个人理解。</p>
    <span>查看模块 →</span>
  </a>
</section>

<section class="notes-section">
  <div class="section-title-wrap">
    <p class="eyebrow">Recent Notes</p>
    <h2>示例内容</h2>
  </div>

  <div class="note-list">
    <a class="note-item" href="{{ '/research/long-document-parsing/' | relative_url }}">
      <small>研究</small>
      <h3>长文档解析的结构恢复思路</h3>
      <p>从页内判断、跨页上下文、全局一致性三个维度组织文档结构恢复流程。</p>
    </a>

    <a class="note-item" href="{{ '/translation/context-engineering/' | relative_url }}">
      <small>翻译</small>
      <h3>Context Engineering 阅读翻译示例</h3>
      <p>保留原术语，并给出更贴近中文阅读习惯的表达方式。</p>
    </a>

    <a class="note-item" href="{{ '/understanding/structured-output/' | relative_url }}">
      <small>理解</small>
      <h3>结构化输出为什么重要</h3>
      <p>从自动化流程、下游校验、模型差异三个角度说明结构化输出的价值。</p>
    </a>
  </div>
</section>
