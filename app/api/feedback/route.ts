import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({ success: true, data: feedbacks })
  } catch (error) {
    console.error('获取反馈列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取反馈列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { feedback, contact } = await request.json()
    
    const result = await prisma.feedback.create({
      data: {
        content: feedback,
        contact: contact || '',
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { success: false, error: '提交失败，请稍后重试' },
      { status: 500 }
    )
  }
} 