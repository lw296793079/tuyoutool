# 使用Ubuntu基础镜像
FROM node:18-slim

# 安装系统依赖（Sharp必需的完整依赖）
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libvips-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 强制重新安装Sharp并指定平台
RUN npm uninstall sharp
RUN npm install --platform=linux --arch=x64 sharp

# 验证Sharp安装
RUN node -e "console.log(require('sharp').format)"

# 复制prisma配置
COPY prisma ./prisma/

# 生成Prisma客户端
RUN npx prisma generate

# 复制源代码
COPY . .

# 构建Next.js应用
RUN npm run build

# ⚠️ 注释掉这行，不删除依赖，确保运行时Sharp可用
# RUN npm prune --production

# 创建上传目录
RUN mkdir -p uploads

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]