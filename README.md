# 金融解决方案知识库

个人金融知识网站，涵盖基金、银行、证券三大行业的业务场景拆解。

## 本地运行

```bash
npm install
npm start
```

## 环境变量配置

### 本地开发

复制 `.env.local.example` 为 `.env.local`，填入你的 MiniMax API 凭证：

```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local` 填入实际值。

### Vercel 部署

**重要：不要把 `.env.local` 提交到仓库！**

在 Vercel Dashboard 中设置环境变量：

1. 进入你的 Project → Settings → Environment Variables
2. 添加以下变量：

| Name | Value |
|------|-------|
| `MINIMAX_API_KEY` | `sk-cp-Cv-_nt7UH2hFZPvytXLwRVoC7xleSJ...` (你的API Key) |
| `MINIMAX_GROUP_ID` | `1736987232556789760` (你的Group ID) |

3. 重新 Deploy

## 目录结构

```
docs/           # 三大行业文章
  fund/        # 基金
  bank/        # 银行
  securities/  # 证券
src/
  components/  # React 组件
  pages/       # 页面
  data/        # 数据
api/
  summarize/   # MiniMax API 代理 (服务端)
```

## 安全性说明

- API Key 仅在 Vercel Serverless Function 中使用，不会暴露到客户端
- `.env.local` 已加入 `.gitignore`，不会提交到仓库
- 生产环境请使用 Vercel Dashboard 配置环境变量
