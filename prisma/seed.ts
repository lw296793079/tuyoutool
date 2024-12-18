const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // 检查是否已存在管理员
  const adminExists = await prisma.admin.findFirst({
    where: { username: 'admin' }
  })

  if (!adminExists) {
    // 创建管理员账号
    await prisma.admin.create({
      data: {
        username: 'admin',
        password: await bcrypt.hash('zhouxiuju25', 10) // 记得把这里改成你想要的密码
      }
    })
    console.log('✅ 管理员账号创建成功')
  }
}

main()
  .catch(e => {
    console.error('❌ 错误:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 