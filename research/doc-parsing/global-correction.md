---
layout: page
title: 全局一致性修正思路
permalink: /research/doc-parsing/global-correction/
module_title: 个人研究
module_path: /research/
parent_title: 文档解析
parent_path: /research/doc-parsing/
description: 通过全文一致性信息修正局部误判。
updated_at: 2026-03-16
---

## 核心思路

先做局部判断，再抽取全文一致性信息，最后对低置信对象进行回看与修正。
