FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# 複製依賴檔案
COPY package.json bun.lock ./
RUN bun install

# 複製所有原始碼
COPY . .

# Build 前端
RUN bun run build:client

# Cloud Run 透過 PORT 環境變數指定埠號
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# 啟動伺服器
CMD ["bun", "src/api/server.ts"]
