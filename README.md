# BaiYi Dev Docs

这是一个基于 GitHub Pages + Jekyll 的个人开发文档站点模板，适合持续记录：

- 开发规范与工作流
- 项目设计方案
- AI/自动化实验记录
- 常用代码片段与功能样例

## 已初始化内容

- 首页：用于展示站点定位、常用入口和当前维护重点
- 文档目录：作为后续持续扩展的总入口
- 开发工作流示例页：包含需求、目录、提交流程、发布检查项
- 功能样例页：包含 API 请求封装、前端组件示例、配置模板
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

- 按项目或主题继续拆分 `docs/` 下的页面
- 将占位 SVG 替换成你自己的封面图、流程图或截图
- 补充 `posts`、`notes` 或 `playground` 等栏目
- 如果后续内容增多，可以再升级为带搜索和分类的文档结构
