import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // 获取文件和参数
    const file = formData.get('file') as File
    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: '无效的图片文件' }, { status: 400 })
    }
    
    // 获取压缩参数
    const quality = parseInt(formData.get('quality') as string || '80')
    const outputFormat = formData.get('outputFormat') as string || 'jpeg'
    const isAutoOptimize = formData.get('autoOptimize') === 'true'
    const targetSize = formData.get('targetSize') ? parseInt(formData.get('targetSize') as string) : null
    
    // 转换文件为Buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // 使用Sharp处理图片
    let sharpInstance = sharp(buffer)
    let outputBuffer: Buffer
    let contentType: string
    
    // 根据输出格式设置压缩选项
    switch (outputFormat) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ 
          quality: isAutoOptimize ? 85 : quality,
          mozjpeg: true // 使用mozjpeg优化
        })
        contentType = 'image/jpeg'
        break
      case 'png':
        sharpInstance = sharpInstance.png({ 
          compressionLevel: isAutoOptimize ? 9 : Math.floor(quality / 10),
          palette: true // 使用调色板优化
        })
        contentType = 'image/png'
        break
      case 'webp':
        sharpInstance = sharpInstance.webp({ 
          quality: isAutoOptimize ? 80 : quality,
          lossless: quality > 95 // 高质量时使用无损压缩
        })
        contentType = 'image/webp'
        break
      default:
        return NextResponse.json({ error: '不支持的输出格式' }, { status: 400 })
    }
    
    // 处理目标大小
    if (targetSize) {
      // 这里简化处理，实际应该使用二分法逐步调整质量
      let currentQuality = quality
      outputBuffer = await sharpInstance.toBuffer()
      
      // 如果当前大小超过目标，逐步降低质量
      while (outputBuffer.length > targetSize * 1024 && currentQuality > 10) {
        currentQuality -= 5
        if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
          outputBuffer = await sharp(buffer).jpeg({ quality: currentQuality }).toBuffer()
        } else if (outputFormat === 'webp') {
          outputBuffer = await sharp(buffer).webp({ quality: currentQuality }).toBuffer()
        } else {
          // PNG不好通过质量控制大小，这里简化处理
          break
        }
      }
    } else {
      outputBuffer = await sharpInstance.toBuffer()
    }
    
    // 返回处理后的图片
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="compressed-image.${outputFormat}"`
      }
    })
  } catch (error) {
    console.error('压缩处理错误:', error)
    return NextResponse.json(
      { error: '压缩失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}