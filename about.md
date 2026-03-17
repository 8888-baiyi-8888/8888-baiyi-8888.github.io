---
title: 关于
permalink: /about/
category_label: About
description: 站点定位、内容分类、写作方式与资源存储建议。
---

这个站点用于长期整理个人技术文档，定位是一个轻量、可持续维护的个人知识花园。

## 站点模块

### 个人研究
用于记录自己的研究性内容，例如：

- 长文档解析框架
- Agent 系统架构设计
- 文档结构恢复思路
- 实验方案与阶段性结论

### 技术翻译
用于整理外文资料翻译，例如：

- 论文阅读翻译
- 官方技术文档翻译
- 博客或技术报告译注

### 技术理解
用于沉淀个人理解，例如：

- 结构化输出
- RAG 设计思路
- Agent 工作流拆解
- 工程实践总结

## 图片与附件存放建议

推荐统一放在：

```text
assets/images/
```

进一步可以按模块细分：

```text
assets/images/research/
assets/images/translation/
assets/images/understanding/
assets/images/samples/
```

Markdown 中插图示例：

```md
![示意图](/assets/images/research/your-image.png)
```

## 写作建议

建议正文都使用 Markdown 撰写，这样便于：

- 快速新增文章
- 专注内容本身
- 保持统一样式
- 在 GitHub 中直接编辑维护
