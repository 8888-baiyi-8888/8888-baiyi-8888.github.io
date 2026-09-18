# Jekyll 个人文档站（支持父目录）

这是一个适合 GitHub Pages 的 Markdown 文档站，风格为浅绿蓝“春和景明”方向，并支持：

- 模块：个人研究 / 技术解读 / 技术理解
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

## 本地预览（Windows / VS Code）

使用 [RubyInstaller 官方 Ruby+Devkit 3.3 x64](https://rubyinstaller.org/downloads/) 安装 Ruby 与 MSYS2，启用 Ruby PATH；安装后重启 VS Code。在仓库根目录终端执行：

```powershell
ruby --version
ridk version
bundle install
bundle exec jekyll build
```

本机 Ruby 安装路径为 `D:\data\Ruby33-x64`。首次使用请重启 VS Code；若当前终端仍找不到 Ruby，可先执行 `$env:Path = "D:\data\Ruby33-x64\bin;" + $env:Path`。

Gemfile 使用 `github-pages` 232 系列配套依赖，保持与 GitHub Pages 默认 Jekyll 构建兼容；Gemfile.lock 应保留以复现本地依赖。需要升级 Pages 依赖时先核对官方版本、调整 Gemfile 的版本约束，再运行 `bundle update github-pages`，并重新构建检查。

### 启动和访问

在 VS Code 中选择「终端 → 运行任务 → 启动网站预览」，或在仓库根目录运行：

```powershell
bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000
```

出现 `Server running` 后访问 <http://127.0.0.1:4000/>。保存 Markdown、布局或 CSS 后，Jekyll 自动重新构建并通过 LiveReload 刷新浏览器。修改 `_config.yml` 或 Gemfile 后需要停止并重启；修改依赖后先运行 `bundle install`。

### 停止

在预览任务终端按 `Ctrl+C`，或执行 VS Code「任务: 终止任务」并选择预览任务。若端口 4000 已被占用，先停止旧预览进程，或将命令的 `--port` 改成 4001 并访问对应地址。

构建产物 `_site/`、Bundler 本地配置及缓存由 `.gitignore` 排除，不要提交这些文件。本地预览不需要推送或发布。


## 站点内容维护

### 目录组织方式

站点支持三级组织结构：

- 模块：`research/`、`interpretation/`、`understanding/`
- 父目录：模块下的专题文件夹，例如 `research/doc-parsing/`
- 文章：父目录中的普通 `.md` 文件

### 新增一个父目录的方法

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

### 图片存储建议

建议按模块和专题继续分文件夹：

```text
assets/images/research/doc-parsing/
assets/images/interpretation/agents/
assets/images/understanding/structured-output/
```
