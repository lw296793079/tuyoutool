import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    
    // 查找管理员
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin) {
      return NextResponse.json({ success: false, error: '用户名或密码错误' }, { status: 401 })
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, admin.password)
    
    if (!isValid) {
      return NextResponse.json({ success: false, error: '用户名或密码错误' }, { status: 401 })
    }

    // 生成 JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // 更新最后登录时间
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 })
  }
} 