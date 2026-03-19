---
layout: page
title: 关于
permalink: /about/
description: 站点说明、维护方式与写作约定。
---

## 作者信息

- 名称：{{ site.author.name }}
- 简介：{{ site.author.bio }}
- GitHub：{% if site.author.github %}[{{ site.author.github }}](https://github.com/{{ site.author.github }}){% endif %}
- 所在地：{{ site.author.location }}

## 站点定位

这是一个用于长期维护的个人技术文档站，内容分为三大模块：

- 个人研究
- 技术翻译
- 技术理解

## 目录组织方式

站点支持三级组织结构：

- 模块：`research/`、`translation/`、`understanding/`
- 父目录：模块下的专题文件夹，例如 `research/doc-parsing/`
- 文章：父目录中的普通 `.md` 文件

## 新增一个父目录的方法

1. 在某个模块下新建一个文件夹  
2. 在该文件夹下创建 `index.md`  
3. 在同目录继续新增文章 `.md`

例如：

```text
research/
└── doc-parsing/
    ├── index.md
    ├── layout-analysis.md
    └── cross-page-memory.md
```

## 图片存储建议

建议按模块和专题继续分文件夹：

```text
assets/images/research/doc-parsing/
assets/images/translation/llm/
assets/images/understanding/structured-output/
```
