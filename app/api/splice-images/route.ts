import { NextResponse } from 'next/server'
import sharp from 'sharp'

type SyncSize = 'none' | 'min' | 'max'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // 1. 获取所有图片文件和参数
    const images: Buffer[] = []
    let index = 0
    while (formData.has(`image${index}`)) {
      const file = formData.get(`image${index}`) as File
      if (!file || !file.type.startsWith('image/')) {
        return NextResponse.json({ error: `图片${index + 1}无效` }, { status: 400 })
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      images.push(buffer)
      index++
    }

    if (images.length < 2) {
      return NextResponse.json({ error: '至少需要2张图片' }, { status: 400 })
    }

    // 2. 获取拼接参数
    const layout = formData.get('layout') as 'horizontal' | 'vertical' | 'grid' || 'horizontal'
    const gap = parseInt(formData.get('gap') as string || '0')
    const backgroundColor = formData.get('backgroundColor') as string || '#ffffff'
    const gridColumns = layout === 'grid' ? parseInt(formData.get('gridColumns') as string || '2') : 2
    const syncSize = formData.get('syncSize') as SyncSize || 'none'

    // 3. 获取所有图片的尺寸信息
    const imageInfos = await Promise.all(
      images.map(async (buffer) => {
        const metadata = await sharp(buffer).metadata()
        return {
          width: metadata.width || 0,
          height: metadata.height || 0,
          buffer,
          aspectRatio: (metadata.width || 0) / (metadata.height || 0)
        }
      })
    )

    // 4. 根据同步选项处理图片尺寸
    let processedImageInfos = [...imageInfos]
    if (syncSize !== 'none') {
      const targetWidth = syncSize === 'min' 
        ? Math.min(...imageInfos.map(img => img.width))
        : Math.max(...imageInfos.map(img => img.width))
      
      const targetHeight = syncSize === 'min'
        ? Math.min(...imageInfos.map(img => img.height))
        : Math.max(...imageInfos.map(img => img.height))

      processedImageInfos = await Promise.all(
        imageInfos.map(async (img) => {
          if (img.width === targetWidth && img.height === targetHeight) {
            return img
          }
          
          const resizedBuffer = await sharp(img.buffer)
            .resize(targetWidth, targetHeight, {
              fit: 'contain',
              background: backgroundColor
            })
            .toBuffer()

          return {
            width: targetWidth,
            height: targetHeight,
            buffer: resizedBuffer,
            aspectRatio: targetWidth / targetHeight
          }
        })
      )
    }

    // 5. 计算拼接后的尺寸
    let finalWidth = 0
    let finalHeight = 0

    if (layout === 'horizontal') {
      finalWidth = processedImageInfos.reduce((sum, img) => sum + img.width, 0) + gap * (images.length - 1)
      finalHeight = Math.max(...processedImageInfos.map(img => img.height))
    } else if (layout === 'vertical') {
      finalWidth = Math.max(...processedImageInfos.map(img => img.width))
      finalHeight = processedImageInfos.reduce((sum, img) => sum + img.height, 0) + gap * (images.length - 1)
    } else {
      // 网格布局
      const rows = Math.ceil(images.length / gridColumns)
      const maxWidthPerColumn = Array(gridColumns).fill(0)
      const maxHeightPerRow = Array(rows).fill(0)

      processedImageInfos.forEach((img, index) => {
        const col = index % gridColumns
        const row = Math.floor(index / gridColumns)
        maxWidthPerColumn[col] = Math.max(maxWidthPerColumn[col], img.width)
        maxHeightPerRow[row] = Math.max(maxHeightPerRow[row], img.height)
      })

      finalWidth = maxWidthPerColumn.reduce((sum, width) => sum + width, 0) + gap * (gridColumns - 1)
      finalHeight = maxHeightPerRow.reduce((sum, height) => sum + height, 0) + gap * (rows - 1)
    }

    // 6. 创建背景
    const composite = sharp({
      create: {
        width: finalWidth,
        height: finalHeight,
        channels: 4,
        background: backgroundColor
      }
    })

    // 7. 计算每张图片的位置并合成
    const overlays = []
    let currentX = 0
    let currentY = 0

    if (layout === 'horizontal') {
      for (const img of processedImageInfos) {
        overlays.push({
          input: img.buffer,
          left: currentX,
          top: Math.floor((finalHeight - img.height) / 2)
        })
        currentX += img.width + gap
      }
    } else if (layout === 'vertical') {
      for (const img of processedImageInfos) {
        overlays.push({
          input: img.buffer,
          left: Math.floor((finalWidth - img.width) / 2),
          top: currentY
        })
        currentY += img.height + gap
      }
    } else {
      // 网格布局
      for (let i = 0; i < processedImageInfos.length; i++) {
        const col = i % gridColumns
        const row = Math.floor(i / gridColumns)
        const img = processedImageInfos[i]

        // 计算当前列的x坐标
        currentX = 0
        for (let j = 0; j < col; j++) {
          currentX += Math.max(...processedImageInfos
            .filter((_, index) => index % gridColumns === j)
            .map(img => img.width)) + gap
        }

        // 计算当前行的y坐标
        currentY = 0
        for (let j = 0; j < row; j++) {
          currentY += Math.max(...processedImageInfos
            .filter((_, index) => Math.floor(index / gridColumns) === j)
            .map(img => img.height)) + gap
        }

        overlays.push({
          input: img.buffer,
          left: currentX,
          top: currentY
        })
      }
    }

    // 8. 执行合成
    const result = await composite
      .composite(overlays)
      .jpeg({ quality: 90 })
      .toBuffer()

    // 9. 返回处理后的图片
    return new Response(result, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    })

  } catch (error) {
    console.error('拼接错误:', error)
    return NextResponse.json({ error: '图片拼接失败' }, { status: 500 })
  }
} 