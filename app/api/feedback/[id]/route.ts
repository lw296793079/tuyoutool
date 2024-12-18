import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface RouteParams {
  params: {
    id: string
  }
}

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const { status } = await request.json()
    const id = parseInt(context.params.id)

    const feedback = await prisma.feedback.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ success: true, data: feedback })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "更新失败" },
      { status: 500 }
    )
  }
} 