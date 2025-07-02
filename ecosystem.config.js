module.exports = {
  apps: [{
    name: 'tuyoutool-com',
    cwd: '/var/www/tuyoutool.com',  // 指定工作目录
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
} 