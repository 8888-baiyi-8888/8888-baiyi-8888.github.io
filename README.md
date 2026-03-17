# personal-docs-github-pages

一个可直接部署到 GitHub Pages 的个人文档站点。

## 站点模块

- 个人研究
- 技术翻译
- 技术理解

## 风格说明

整体采用浅绿、浅蓝、米白配色，视觉上偏“春和景明”。

## 项目结构

```text
personal-docs-github-pages/
├── index.html
├── pages/
│   ├── about.html
│   ├── research.html
│   ├── translation.html
│   └── understanding.html
├── research/
│   ├── long-document-parsing.html
│   └── agent-writing-pipeline.html
├── translation/
│   ├── context-engineering.html
│   └── pageindex-intro.html
├── understanding/
│   ├── structured-output.html
│   └── agent-evaluation.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── site.js
    └── images/
        └── samples/
            ├── hero-landscape.svg
            └── doc-structure-sample.svg
```

## 本地预览

直接双击 `index.html` 就能看。

## 部署到 GitHub Pages

### 方式一：仓库名为 `你的用户名.github.io`

直接把全部文件推到仓库根目录即可。

### 方式二：普通仓库

1. 新建仓库，例如 `personal-docs`
2. 将本项目文件推到仓库根目录
3. 打开 GitHub 仓库设置
4. 进入 `Pages`
5. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. 保存后等待 GitHub Pages 发布

## 如何新增文章

以“个人研究”为例：

1. 新建文件：`research/your-article.html`
2. 参考已有文章页面复制一份结构
3. 在 `pages/research.html` 中新增入口卡片

## 图片存储建议

- 公共图片放：`assets/images/`
- 首页和示例图放：`assets/images/samples/`
- 后续也可以扩展为：

```text
assets/images/
├── research/
├── translation/
├── understanding/
└── samples/
```

## 自定义建议

您后续可以优先改这几个位置：

- `index.html`：首页标题、简介、入口文案
- `pages/*.html`：模块页说明
- `research/*.html`、`translation/*.html`、`understanding/*.html`：正文内容
- `assets/css/style.css`：整体配色、圆角、阴影、字体大小
