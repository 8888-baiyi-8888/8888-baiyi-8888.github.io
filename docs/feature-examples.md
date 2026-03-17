---
title: 功能样例
description: 常见开发功能样例与模板
permalink: /docs/feature-examples/
---

# 功能样例

这里预设了一些你后续可以直接复制改造的内容。

## 1. API 请求封装样例

```ts
type RequestOptions = RequestInit & {
  token?: string;
};

export async function request<T>(
  input: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(input, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
```

## 2. 组件区块样例

```tsx
type EmptyStateProps = {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionText = "立即处理",
  onAction,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      {onAction ? <button onClick={onAction}>{actionText}</button> : null}
    </section>
  );
}
```

## 3. 环境变量模板

```env
APP_ENV=development
API_BASE_URL=https://api.example.com
ENABLE_MOCK=true
SENTRY_DSN=
```

## 4. 功能页记录建议

每个功能文档都可以按这个格式继续写：

| 模块 | 示例内容 |
| --- | --- |
| 功能目标 | 用户可以快速查看关键状态和下一步动作 |
| 输入输出 | 输入接口数据，输出可交互页面 |
| 核心逻辑 | 请求数据、归一化处理、组件渲染 |
| 风险点 | 空数据、慢请求、权限不足 |
| 后续优化 | 缓存、埋点、降级处理 |

## 5. 待扩展示例

- 登录/鉴权流程说明
- 文件上传组件样例
- 富文本或 Markdown 渲染示例
- Webhook / 定时任务处理说明
- AI 调用封装与 Prompt 模板
