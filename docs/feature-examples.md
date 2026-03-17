---
title: 技术文档模板
description: 用于整理个人技术文档的内容模板
permalink: /docs/feature-examples/
---

# 技术文档模板

这里预设了一些更适合个人技术积累的内容模板，你后续可以直接复制改造。

## 1. 技术主题记录模板

```md
# 主题背景

# 核心概念

# 关键问题

# 解决方案 / 原理

# 代码片段

# 我的理解

# 参考资料
```

## 2. 代码片段样例

```ts
export function groupByTag<T extends { tags?: string[] }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const tags = item.tags?.length ? item.tags : ["untagged"];

    for (const tag of tags) {
      if (!acc[tag]) {
        acc[tag] = [];
      }

      acc[tag].push(item);
    }

    return acc;
  }, {});
}
```

## 3. 文档元信息模板

```yaml
title: React 状态管理笔记
category: frontend
tags:
  - react
  - state-management
  - notes
status: ongoing
updated_at: 2026-03-17
```

## 4. 技术文档建议结构

每个技术主题页都可以按这个格式继续写：

| 模块 | 示例内容 |
| --- | --- |
| 背景 | 这个主题解决什么问题 |
| 原理 | 核心机制是什么 |
| 实践 | 我在实际中怎么使用 |
| 风险点 | 容易踩的坑和误区 |
| 延伸 | 下一步要补哪些资料 |

## 5. 待扩展示例

- 框架源码阅读笔记
- 数据结构与算法卡片
- AI 工作流与 Prompt 模板
- 工具链配置备忘
- 常见问题排查手册
