import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const x = parseInt(formData.get('x') as string)
    const y = parseInt(formData.get('y') as string)
    const width = parseInt(formData.get('width') as string)
    const height = parseInt(formData.get('height') as string)

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: '无效的图片文件' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const image = sharp(buffer)

    // 执行裁剪
    const croppedImage = await image
      .extract({ left: x, top: y, width, height })
      .toBuffer()

    return new NextResponse(croppedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline; filename="cropped-image.jpg"'
      }
    })
  } catch (error) {
    console.error('裁剪处理错误:', error)
    return NextResponse.json(
      { error: '裁剪失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}
