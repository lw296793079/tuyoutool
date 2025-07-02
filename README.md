
非常好的建议！我重新整理，明确标识每一步的执行环境。

# Docker部署完整流程

## 阶段一：【开发环境】- 创建Docker配置文件

**执行环境：你的本地Windows开发机器**
**位置：你的项目根目录（和ecosystem.config.js同级）**

### 第1步：【开发环境】创建 `Dockerfile`

在你的本地项目根目录新建文件 `Dockerfile`（没有扩展名）：

```dockerfile
# 使用官方Node.js 18镜像
FROM node:18-alpine AS base

# 安装系统依赖（用于sharp等native模块）
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制prisma配置
COPY prisma ./prisma/

# 生成Prisma客户端
RUN npx prisma generate

# 复制源代码
COPY . .

# 构建Next.js应用
RUN npm run build

# 创建上传目录（如果需要）
RUN mkdir -p uploads

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
```

### 第2步：【开发环境】创建 `.dockerignore`

在你的本地项目根目录新建文件 `.dockerignore`：

```
node_modules
.next
.git
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
README.md
.vscode
.idea
*.log
coverage
.nyc_output
Dockerfile
docker-compose.yml
.dockerignore
ecosystem.config.js
```

### 第3步：【开发环境】创建 `docker-compose.yml`

在你的本地项目根目录新建文件 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  # 数据库服务
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: tuyoutool
      POSTGRES_USER: tuyouuser
      POSTGRES_PASSWORD: your_secure_password_123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - tuyou-network

  # 主应用服务
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://tuyouuser:your_secure_password_123@postgres:5432/tuyoutool
      - NEXTAUTH_SECRET=your-nextauth-secret-key-here
      - NEXTAUTH_URL=https://tuyoutool.com
    depends_on:
      - postgres
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads
    networks:
      - tuyou-network

volumes:
  postgres_data:

networks:
  tuyou-network:
    driver: bridge
```

## 阶段二：【开发环境】- 本地测试Docker配置

**执行环境：你的本地Windows开发机器**
**前提：确保Docker Desktop已安装并运行**

### 第4步：【开发环境】本地测试

在你的本地项目根目录打开命令行（cmd或PowerShell），执行：

```bash
# 构建镜像
docker-compose build

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看应用日志
docker-compose logs -f app
```

**测试访问：**
在浏览器打开 `http://localhost:3000`，确认应用正常运行。

**测试完成后清理：**
```bash
# 停止并删除容器和数据卷
docker-compose down -v
```

## 阶段三：【生产环境】- 服务器安装Docker

**执行环境：阿里云服务器（SSH连接）**

### 第5步：【生产环境】安装Docker

SSH连接到你的阿里云服务器：
```bash
ssh root@your-server-ip
```

然后在服务器上执行：
```bash
# 更新系统
apt update && apt upgrade -y

# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 启动Docker服务
systemctl start docker
systemctl enable docker

# 安装Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 验证安装
docker --version
docker-compose --version
```

## 阶段四：【开发环境】- 上传代码到服务器

**执行环境：你的本地Windows开发机器**

### 第6步：【开发环境】推送代码

有两种方式，选择其一：

**方式1：使用Git（推荐）**
```bash
# 在本地项目目录
git add .
git commit -m "添加Docker配置"
git push origin main
```

**方式2：使用SCP上传**
```bash
# 在本地项目目录
scp -r . root@your-server-ip:/root/tuyoutool-docker/
```

## 阶段五：【生产环境】- 部署应用

**执行环境：阿里云服务器（SSH连接）**

### 第7步：【生产环境】获取代码并部署

在服务器上执行：

**如果使用Git：**
```bash
# 克隆代码
git clone your-repository-url /root/tuyoutool-docker
cd /root/tuyoutool-docker
```

**如果使用SCP：**
```bash
cd /root/tuyoutool-docker
```

**部署应用：**
```bash
# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app
```

现在每一步都明确标识了执行环境！你现在可以从**第1步【开发环境】**开始，确认你是在本地Windows机器上操作。

创建完配置文件后告诉我，我们继续下一步。
