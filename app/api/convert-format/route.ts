import { NextResponse } from "next/server"
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('outputFormat') as string
    const conversionType = formData.get('conversionType') as string
    
    if (!file || !outputFormat || !conversionType) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }
    
    // 获取文件内容
    const buffer = Buffer.from(await file.arrayBuffer())
    
    let outputBuffer: Buffer
    let contentType: string
    
    // 根据转换类型处理文件
    switch (conversionType) {
      case 'image':
        const result = await convertImage(buffer, outputFormat)
        outputBuffer = result.buffer
        contentType = result.contentType
        break
        
      case 'document':
        // 这里需要实现文档转换逻辑
        return NextResponse.json(
          { error: '文档转换功能正在开发中' },
          { status: 501 }
        )
        
      case 'audio':
        // 这里需要实现音频转换逻辑
        return NextResponse.json(
          { error: '音频转换功能正在开发中' },
          { status: 501 }
        )
        
      case 'video':
        // 这里需要实现视频转换逻辑
        return NextResponse.json(
          { error: '视频转换功能正在开发中' },
          { status: 501 }
        )
        
      default:
        return NextResponse.json(
          { error: '不支持的转换类型' },
          { status: 400 }
        )
    }
    
    // 返回转换后的文件
    return new Response(outputBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="converted.${outputFormat}"`,
      },
    })
    
  } catch (error) {
    console.error('转换错误:', error)
    return NextResponse.json(
      { error: '文件转换失败' },
      { status: 500 }
    )
  }
}

// 图片转换函数
async function convertImage(buffer: Buffer, format: string): Promise<{buffer: Buffer, contentType: string}> {
  try {
    let sharpInstance = sharp(buffer)
    let outputBuffer: Buffer
    let contentType: string
    
    if (format === 'ico') {
      try {
        // 获取图像元数据
        const metadata = await sharpInstance.metadata()
        const width = metadata.width || 256
        const height = metadata.height || 256
        
        // 计算正方形的尺寸和裁剪参数
        const size = Math.min(width, height)
        const left = Math.floor((width - size) / 2)
        const top = Math.floor((height - size) / 2)
        
        // 裁剪为正方形并调整大小
        const pngBuffer = await sharpInstance
          .extract({ left, top, width: size, height: size }) // 裁剪为正方形
          .resize(256, 256) // ICO通常使用的尺寸
          .png()
          .toBuffer()
        
        // 然后转换为ICO
        outputBuffer = await pngToIco(pngBuffer)
        contentType = 'image/x-icon'
      } catch (icoError) {
        console.error('ICO转换错误:', icoError)
        throw new Error('ICO格式转换失败: ' + (icoError instanceof Error ? icoError.message : '未知错误'))
      }
    } else {
      // 其他格式使用Sharp处理
      switch (format) {
        case 'jpg':
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({ quality: 90 })
          contentType = 'image/jpeg'
          break
        case 'png':
          sharpInstance = sharpInstance.png({ compressionLevel: 9 })
          contentType = 'image/png'
          break
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality: 90 })
          contentType = 'image/webp'
          break
        case 'gif':
          sharpInstance = sharpInstance.gif()
          contentType = 'image/gif'
          break
        case 'tiff':
          sharpInstance = sharpInstance.tiff()
          contentType = 'image/tiff'
          break
        default:
          throw new Error(`不支持的图片格式: ${format}`)
      }
      
      outputBuffer = await sharpInstance.toBuffer()
    }
    
    return { buffer: outputBuffer, contentType }
  } catch (error) {
    console.error('图片转换错误:', error)
    throw error
  }
}
