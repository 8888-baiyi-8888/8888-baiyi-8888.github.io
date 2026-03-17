# Jekyll 个人文档站（支持父目录）

这是一个适合 GitHub Pages 的 Markdown 文档站，风格为浅绿蓝“春和景明”方向，并支持：

- 模块：个人研究 / 技术翻译 / 技术理解
- 父目录：通过文件夹 + `index.md` 组织专题
- 文章：在父目录中继续写普通 Markdown 文件

## 目录规则

例如：

```text
research/
└── doc-parsing/
    ├── index.md
    ├── layout-analysis.md
    └── cross-page-memory.md
```

其中：

- `doc-parsing/` 是父目录
- `doc-parsing/index.md` 是父目录页
- 其他 `.md` 是该父目录下的文章

## 新增一个父目录

1. 在某个模块下新建文件夹
2. 在里面新建 `index.md`
3. 配置 front matter
4. 再新增其他文章

父目录页示例：

```md
---
layout: section
title: 文档解析
permalink: /research/doc-parsing/
module_title: 个人研究
module_path: /research/
parent_title: 文档解析
parent_path: /research/doc-parsing/
description: 长文档解析专题。
---

## 本专题文章

- [文章 A](/research/doc-parsing/a/)
- [文章 B](/research/doc-parsing/b/)
```

普通文章示例：

```md
---
layout: page
title: 版面分析基础
permalink: /research/doc-parsing/layout-analysis/
module_title: 个人研究
module_path: /research/
parent_title: 文档解析
parent_path: /research/doc-parsing/
description: 对版面分析任务的基础理解。
---

# 正文开始
```

## 部署到 GitHub Pages

### 方式一：直接上传到 `username.github.io` 仓库

1. 新建或进入您的 `username.github.io` 仓库
2. 将本项目文件复制到仓库根目录
3. 提交并推送
4. GitHub 会自动构建 Pages

### 方式二：普通仓库

如果使用普通仓库，也可以开启 GitHub Pages，但需要注意 `baseurl` 设置。

## 本地预览

如果本地安装了 Ruby / Jekyll：

```bash
bundle exec jekyll serve
```

如果没有，也可以先直接推到 GitHub Pages 看效果。
