# syntax=docker/dockerfile:1
# spark-router-docs 容器化构建
# 多阶段：deps -> builder -> runner（standalone 输出）
# 项目使用 bun，构建阶段用 bun；运行阶段用 node（Next.js standalone）

ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 阶段 1：安装依赖（bun）
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
# fumadocs-mdx postinstall 需要这些文件来生成 .source 目录
COPY source.config.ts ./
COPY tsconfig.json ./
COPY content ./content
RUN bun install --frozen-lockfile

# 阶段 2：构建应用
FROM oven/bun:1-alpine AS builder
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.source ./.source
COPY . .
RUN bun run build

# 阶段 3：运行（仅 standalone + static + public，使用 node）
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
CMD ["node", "server.js"]
