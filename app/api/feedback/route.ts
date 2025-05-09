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
    const { 
      content, 
      contact, 
      category,
      screenSize,
      language,
      timeZone,
      referrer,
      routePath,
      userAgent
    } = await request.json()
    
    // 获取用户 IP
    const forwarded = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const ip = forwarded 
      ? forwarded.split(',')[0].trim()
      : realIp 
        ? realIp 
        : '未知'
    
    let ipLocation = '未知'
    try {
      // 设置超时时间
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒超时
      
      const ipRes = await fetch(
        `http://ip-api.com/json/${ip}?lang=zh-CN`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)
      
      const ipData = await ipRes.json()
      if (ipData.status === 'success') {
        ipLocation = `${ipData.country} ${ipData.regionName} ${ipData.city}`
      }
    } catch (error) {
      console.error('IP location lookup failed:', error)
      // 继续执行，不影响反馈保存
    }

    const result = await prisma.feedback.create({
      data: {
        content,
        contact: contact || '',
        status: 'PENDING',
        category: category || 'OTHER',
        ip,
        ipLocation,
        screenSize,
        language,
        timeZone,
        referrer,
        routePath,
        userAgent,
        visitTime: new Date()
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