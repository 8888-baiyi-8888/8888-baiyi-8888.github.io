# 春和景明 · 个人文档

这是一个基于 **Jekyll + Markdown + GitHub Pages** 的个人文档站模板。

## 特点

- 正文主要使用 Markdown 编写
- 适合长期维护个人研究、技术翻译、技术理解三类内容
- 浅绿蓝、春和景明风格
- 可直接部署到 GitHub Pages

## 目录说明

```text
.
├── _config.yml
├── _layouts/
├── assets/
├── index.md
├── about.md
├── research/
├── translation/
└── understanding/
```

## 如何新增文章

以“个人研究”模块为例，在 `research/` 下新增一个 `.md` 文件：

```md
---
title: 你的文章标题
permalink: /research/your-article/
category_label: 个人研究
description: 这里写简介
---

# 正文开始

这里写你的内容。
```

## 图片怎么放

推荐放到：

```text
assets/images/
```

例如：

```text
assets/images/research/
assets/images/translation/
assets/images/understanding/
assets/images/samples/
```

Markdown 引用示例：

```md
![示意图](/assets/images/research/example.png)
```

## 部署到 GitHub Pages

### 方式一：用户主页仓库

如果您的仓库名是：

```text
<用户名>.github.io
```

则直接把本项目文件放到仓库根目录即可。

### 方式二：普通仓库 Pages

如果您用的是普通仓库，也可以启用 GitHub Pages。

在仓库设置中：

- 打开 `Settings`
- 进入 `Pages`
- Source 选择 `Deploy from a branch`
- Branch 选择 `main`
- Folder 选择 `/root`

保存后等待发布。

## 本地预览

如果本地装了 Ruby 和 Jekyll，可以运行：

```bash
bundle exec jekyll serve
```

如果只是看静态页面结构，也可以直接查看生成后的页面，但推荐通过 GitHub Pages 或 Jekyll 本地服务预览。
