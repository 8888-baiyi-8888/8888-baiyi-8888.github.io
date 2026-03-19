---
layout: page
title: 跨页记忆机制
permalink: /research/doc-parsing/cross-page-memory/
module_title: 个人研究
module_path: /research/
parent_title: 文档解析
parent_path: /research/doc-parsing/
description: 长文档解析中的跨页上下文建模思路。
updated_at: 2026-03-17
---

## 核心想法

在判别第 i 页元素时，不只看单页信息，而是结合邻近页和全文规律。

## 适用场景

- 跨页表格
- 标题续页
- 重复页眉页脚
- 图表说明延续
