# BaiYi Notes

这是一个基于 GitHub Pages + Jekyll 的个人知识文档站点模板，适合持续记录：

- 论文阅读笔记
- 个人技术文档
- AI/自动化实验记录
- 常用代码片段与长期知识整理

## 已初始化内容

- 首页：用于展示站点定位、常用入口和当前维护重点
- 文档目录：作为后续持续扩展的总入口
- 论文阅读模板页：包含论文摘要、方法拆解、阅读结论等栏目
- 技术文档模板页：包含技术主题结构、代码片段样例、元信息模板
- 预设插图：已放入 `assets/images/`，后续可直接替换
- 自定义样式：已覆盖默认主题，适合作为个人知识库长期维护

## 目录结构

```text
.
├── _config.yml
├── _layouts/
├── assets/
│   ├── css/
│   └── images/
├── docs/
│   ├── index.md
│   ├── dev-workflow.md
│   └── feature-examples.md
└── index.md
```

## 本地预览

如果本机已经安装 Ruby 和 Bundler，可以在项目根目录执行：

```bash
bundle install
bundle exec jekyll serve
```

然后访问 `http://127.0.0.1:4000`。

## 后续建议

- 按论文、专题或技术栈继续拆分 `docs/` 下的页面
- 将占位 SVG 替换成你自己的论文封面、截图、流程图或思维导图
- 补充 `papers`、`notes`、`reading-map` 等栏目
- 如果后续内容增多，可以再升级为带搜索和分类的文档结构
