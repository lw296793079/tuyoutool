import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH(request: Request) {
  try {
    const { ids, status } = await request.json()

    // 批量更新
    await prisma.feedback.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        status
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Batch update error:', error)
    return NextResponse.json(
      { success: false, error: "批量更新失败" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json()
    
    await prisma.feedback.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Batch delete error:', error)
    return NextResponse.json(
      { success: false, error: "批量删除失败" },
      { status: 500 }
    )
  }
} 