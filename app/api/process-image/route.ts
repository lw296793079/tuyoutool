import { NextResponse } from 'next/server'
import sharp from 'sharp'

// 辅助函数：将十六进制颜色转换为 RGBA
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// 辅助函数：获取水印位置
function getGravity(position: string) {
  const gravityMap: { [key: string]: string } = {
    'leftTop': 'northwest',
    'centerTop': 'north',
    'rightTop': 'northeast',
    'leftMiddle': 'west',
    'center': 'center',
    'rightMiddle': 'east',
    'leftBottom': 'southwest',
    'centerBottom': 'south',
    'rightBottom': 'southeast'
  }
  return gravityMap[position] || 'southeast'
}

// 创建水印 SVG
function createWatermarkSvg({
  text,
  fontSize,
  fontColor,
  fontStyle = 'normal',
  rotation,
}: {
  text: string
  fontSize: string
  fontColor: string
  fontStyle?: string
  rotation: string
}) {
  const fontSizeNum = parseInt(fontSize)
  const spacing = Math.floor(fontSizeNum / 2)  // 间距就是字体大小的一半
  
  // 基础尺寸
  const textWidth = text.length * fontSizeNum
  const textHeight = fontSizeNum

  // 计算旋转后的尺寸
  const rotationRad = Math.abs(parseInt(rotation)) * Math.PI / 180
  const rotatedWidth = Math.ceil(
    Math.abs(textWidth * Math.cos(rotationRad)) + 
    Math.abs(textHeight * Math.sin(rotationRad))
  )
  const rotatedHeight = Math.ceil(
    Math.abs(textWidth * Math.sin(rotationRad)) + 
    Math.abs(textHeight * Math.cos(rotationRad))
  )

  // 最终尺寸 = 旋转后的尺寸 + 间距
  const totalWidth = rotatedWidth + spacing * 2
  const totalHeight = rotatedHeight + spacing * 2
  
  return `
    <svg width="${totalWidth}" height="${totalHeight}">
      <style>
        .text { 
          fill: ${fontColor}; 
          font-size: ${fontSize}px;
          font-family: Arial;
          font-style: ${fontStyle};
        }
      </style>
      <text 
        x="${totalWidth/2}" 
        y="${totalHeight/2}" 
        text-anchor="middle" 
        dominant-baseline="middle"
        class="text" 
        transform="rotate(${rotation}, ${totalWidth/2}, ${totalHeight/2})"
      >
        ${text}
      </text>
    </svg>
  `
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // 1. 验证文件
    const file = formData.get('file') as File
    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: '无效的图片文件' }, { status: 400 })
    }

    // 2. 验证图片尺寸参数
    const width = formData.get('width')
    const height = formData.get('height')
    if (width && (parseInt(width as string) <= 0 || parseInt(width as string) > 10000)) {
      return NextResponse.json({ error: '宽度必须在1-10000之间' }, { status: 400 })
    }
    if (height && (parseInt(height as string) <= 0 || parseInt(height as string) > 10000)) {
      return NextResponse.json({ error: '高度必须在1-10000之间' }, { status: 400 })
    }

    // 3. 优化水印处理
    const watermarkType = formData.get('watermarkType') as string
    const watermarkText = formData.get('watermarkText') as string
    const watermarkImage = formData.get('watermarkImage') as File
    const position = formData.get('position') as string
    const fontSize = formData.get('fontSize') as string || '48'
    const fontColor = formData.get('fontColor') as string || '#000000'
    const fontStyle = formData.get('fontStyle') as string || 'normal'
    const rotation = formData.get('rotation') as string || '0'
    
    let alphaValue = 0.5
    try {
      const opacityString = formData.get('opacity') as string
      if (opacityString) {
        alphaValue = Math.min(Math.max(parseFloat(opacityString) / 100, 0), 1)
      }
    } catch (error) {
      console.error('opacity parsing error:', error)
    }

    // 获取水印大小参数
    const watermarkSize = formData.get('watermarkSize') as string || '25'
    const watermarkSizePercent = Math.min(Math.max(parseInt(watermarkSize), 1), 100) / 100

    if (!file) {
      return NextResponse.json(
        { error: '没有上传文件' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let image = sharp(buffer)

    if (width || height) {
      image = image.resize(
        width ? parseInt(width as string) : undefined,
        height ? parseInt(height as string) : undefined,
        {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
      )
    }
    // 在处理水印之前打印参数
    console.log('水印处理参数:', {
      type: watermarkType,
      text: watermarkText,
      fontSize,
      fontColor,
      opacity: alphaValue
    })

    // 添加水印
    if (watermarkType === 'text') {
      // 单个水印
      const svg = createWatermarkSvg({
        text: watermarkText,
        fontSize,
        fontColor: hexToRgba(fontColor, alphaValue),
        fontStyle,
        rotation,
      
      })

      image = image.composite([{
        input: Buffer.from(svg),
        gravity: getGravity(position),
        blend: 'over'
      }])
    } else if (watermarkType === 'pattern') {
      // 平铺水印
      const svg = createWatermarkSvg({
        text: watermarkText,
        fontSize,
        fontColor: hexToRgba(fontColor, alphaValue),
        fontStyle,
        rotation,
       
      })

      image = image.composite([{
        input: Buffer.from(svg),
        tile: true,
        blend: 'over'
      }])
    } else if (watermarkType === 'image' && watermarkImage) {
      try {
        const watermarkBuffer = Buffer.from(await watermarkImage.arrayBuffer())
        const { width: imageWidth } = await image.metadata()
        const targetWidth = Math.floor((imageWidth || 800) * watermarkSizePercent)

        const opacityString = formData.get('opacity') as string
        const alphaValue = Math.min(Math.max(parseFloat(opacityString) / 100, 0), 1)
        
        // 使用 sharp 处理水印图片
        const processedWatermark = await sharp(watermarkBuffer)
          .resize({ width: targetWidth }) // 调整大小
          .ensureAlpha() // 确保有 alpha 通道
          .composite([{
            input: Buffer.from([
              255, 255, 255, Math.round(alphaValue * 255) // 创建一个半透明的遮罩
            ]),
            raw: {
              width: 1,
              height: 1,
              channels: 4
            },
            tile: true, // 平铺遮罩
            blend: 'dest-in' // 使用遮罩的 alpha 值
          }])
          .toBuffer()

        // 将处理后的水印添加到原图
        image = image.composite([{
          input: processedWatermark,
          gravity: getGravity(position),
          blend: 'over'
        }])
      } catch (error) {
        console.error('水印图片处理错误:', error)
        throw error
      }
    } 

    // 在调用 createWatermarkSvg 前处理旋转角度和水印类型
    let finalRotation = rotation
    let shouldTile = false

    if (watermarkType === 'diagonal') {
      finalRotation = '45'  // 对角线固定45度
      shouldTile = true    // 需要平铺
    }

    if (watermarkType === 'text' || watermarkType === 'pattern' || watermarkType === 'diagonal') {
      const svg = createWatermarkSvg({
        text: watermarkText,
        fontSize,
        fontColor: hexToRgba(fontColor, alphaValue),
        fontStyle,
        rotation: finalRotation,  // 使用处理后的旋转角度
      })

      image = image.composite([{
        input: Buffer.from(svg),
        gravity: shouldTile ? undefined : getGravity(position),
        tile: shouldTile || watermarkType === 'pattern',
        blend: 'over'
      }])
    }

    const processedImage = await image.toBuffer()

    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline; filename="processed-image.jpg"'
      }
    })
  } catch (error) {
    console.error('请求处理错误:', error)
    return NextResponse.json(
      { error: '请求处理失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}