---
layout: page
title: 认知碎片
permalink: /cognitive-fragments/
module_title: 认知碎片
module_path: /cognitive-fragments/
description: 记录阶段性的判断、方法片段与认知切片。这些内容并非最终定论，而是持续更新中的思考落点。
updated_at: 2026-04-02
---

{% assign fragments = site.data.thought_fragments | sort: "created_at" | reverse %}
{% assign all_tags = "" | split: "" %}
{% for fragment in fragments %}
  {% for tag in fragment.tags %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign sorted_tags = all_tags | sort %}

<div class="cognitive-page">
  <div class="cognitive-page-head">
    <p class="feature-note">认知本身存在局限性与时效性，所以这里的内容并非最终定论，或许会因新的信息和实践而被重新推翻。</p>
    <div class="thoughts-toolbar thoughts-page-toolbar">
      <label class="thoughts-filter-label" for="cognitive-tag-filter">标签筛选</label>
      <select id="cognitive-tag-filter" class="thoughts-filter-select">
        <option value="">全部标签</option>
        {% for tag in sorted_tags %}
          <option value="{{ tag }}">{{ tag }}</option>
        {% endfor %}
      </select>
    </div>
  </div>

  <div class="thoughts-list thoughts-list-page" id="cognitive-thoughts-list">
    {% for fragment in fragments %}
      <article class="thought-card thought-card-page" data-tags="{{ fragment.tags | join: '|' }}" data-created-at="{{ fragment.created_at }}" data-status="{{ fragment.status }}">
        <h3>{{ fragment.title }}</h3>
        <p>{{ fragment.summary }}</p>
      </article>
    {% endfor %}
  </div>
</div>

<script>
  (function () {
    var filter = document.getElementById('cognitive-tag-filter');
    var list = document.getElementById('cognitive-thoughts-list');
    if (!filter || !list) return;

    function applyFilter(value) {
      var cards = list.querySelectorAll('.thought-card');

      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split('|');
        var visible = !value || tags.indexOf(value) !== -1;
        card.hidden = !visible;
      });
    }

    filter.addEventListener('change', function () {
      applyFilter(filter.value);
    });

    applyFilter(filter.value || '');
  })();
</script>
