"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadZone } from '@/components/upload-zone'
import { toast } from "sonner"
import Image from "next/image"



export default function ImageProcessing() {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [watermarkText, setWatermarkText] = useState('')
  const [watermarkType, setWatermarkType] = useState('text')
  const [watermarkPosition, setWatermarkPosition] = useState('rightBottom')
  
  const [fontColor, setFontColor] = useState('#000000')
  const [opacity, setOpacity] = useState('50')
  const [fontStyle, setFontStyle] = useState('normal')
  const [rotation, setRotation] = useState('0')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
// 首先添加一个显示值的state
const [displayFontSize, setDisplayFontSize] = useState('8')
const [watermarkSize, setWatermarkSize] = useState('25') // 默认25%
const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = (file: File) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast.error("请上传图片文件")
      return
    }
    // 检查文件大小 (例如最大 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("图片大小不能超过10MB")
      return
    }
    setSelectedFile(file)
    const img = new (window.Image || HTMLImageElement)()
    img.onload = () => {
      setImageWidth(img.width)
      setImageHeight(img.height)
    }
    img.src = URL.createObjectURL(file)
  }



  const handleExecute = async () => {
    if (!selectedFile) {
      toast.error("请先上传图片")
      return
    }
  
    const hasWatermarkSettings = (
      (watermarkType === 'text' || watermarkType === 'pattern' || watermarkType === 'diagonal') && watermarkText ||
      (watermarkType === 'image' && watermarkImage)
    )

    if (!width && !height && !hasWatermarkSettings) {
      toast.error("请至少设置一项处理选项")
      return
    }
    setIsLoading(true)
    try {
      // 每次处理前重置预览
      setPreviewUrl(null)
      
      const formData = new FormData()
      // 始终添加原始文件
      formData.append('file', selectedFile)

      // 添加调整大小参数
      if (width) formData.append('width', width)
      if (height) formData.append('height', height)
      
      // 添加水印参数
      if (hasWatermarkSettings) {
        formData.append('watermarkType', watermarkType)
        if (watermarkType === 'text' || watermarkType === 'pattern' || watermarkType === 'diagonal') {
          formData.append('watermarkText', watermarkText)
          formData.append('fontSize', (parseInt(displayFontSize) * 30).toString())  // 使用 displayFontSize 计算实际像素
          formData.append('fontColor', fontColor)
          formData.append('opacity', opacity)
          formData.append('position', watermarkPosition)
          formData.append('fontStyle', fontStyle)
          formData.append('rotation', rotation)
        } else if (watermarkType === 'image' && watermarkImage) {
          formData.append('watermarkImage', watermarkImage)
          formData.append('opacity', opacity)
          formData.append('position', watermarkPosition)
          formData.append('watermarkSize', watermarkSize) // 添加水印大小参数
        }
      }

      console.log('发送的参数：', Object.fromEntries(formData.entries())) // 添加日志

      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('处理失败')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
      toast.success('处理完成')

    } catch (error) {
      console.error('处理错误:', error)
      toast.error('图片处理失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFontSizeChange = (value: string) => {
    const size = parseFloat(value)
    const maxSize = Math.floor(Math.min(imageWidth, imageHeight) / 30)  // 除以30是因为实际像素会是这个值的30倍
    if (!isNaN(size) && size > 0 && size <= maxSize) {
      setDisplayFontSize(value)
    }
  }

  const handleWatermarkTextChange = (text: string) => {
    if (text.length <= 20) {  // 限制最大长度
      setWatermarkText(text)
    } else {
      toast.error("水印文字不能超过20个字")
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">图片处理</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <UploadZone onFileSelect={handleFileSelect} />
          </div>
          
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">预览</h2>
            <div className="relative w-full aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={previewUrl}
                    alt="处理后预览"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <p className="text-gray-500">图片预览区域</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "调整大小",
              content: (
                <div className="space-y-2">
                  <Input 
                    type="number" 
                    placeholder="宽度" 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Input 
                    type="number" 
                    placeholder="高度"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              )
            },
            {
              title: (
                <div className="flex items-center gap-2">
                  <span>添加水印</span>
                  <div className="relative group">
                    <svg 
                      className="w-4 h-4 text-gray-400 cursor-help" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path strokeWidth="2" d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <div className="absolute left-0 w-64 p-2 mt-2 text-sm bg-black text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <ul className="space-y-1">
                        <li>• 简约商务：单个文字水印，可调整位置</li>
                        <li>• 防伪密集：平铺水印，覆盖整个图片</li>
                        <li>• 对角醒目：固定45度角线水印</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
              content: (
                <div className="space-y-4">
                   
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">水印类型</label>
                    <select 
                      value={watermarkType}
                      onChange={(e) => setWatermarkType(e.target.value)}
                      className="w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200"
                    >
                      <option value="text">单个文字水印（可调整位置）</option>
                      <option value="pattern">平铺水印（覆盖整个图片）</option>
                      <option value="diagonal">对角线水印（固定45度）</option>
                      <option value="image">图片水印</option>
                    </select>
                  </div>

                  {watermarkType === 'text' || watermarkType === 'pattern' || watermarkType === 'diagonal' ? (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">水印文字</label>
                        <Input 
                          type="text" 
                          placeholder="输入要显示的水印文字" 
                          value={watermarkText}
                          onChange={(e) => handleWatermarkTextChange(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">字体大小</label>
                          <span className="text-xs text-gray-500">数值越大文字越大</span>
                        </div>
                        <Input 
                          type="number"
                          placeholder="推荐值：8-16"
                          value={displayFontSize}
                          onChange={(e) => handleFontSizeChange(e.target.value)}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">字体颜色</label>
                          <span className="text-xs text-gray-500">点击选择颜色</span>
                        </div>
                        <Input 
                          type="color"
                          value={fontColor}
                          onChange={(e) => setFontColor(e.target.value)}
                          className="h-10"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium">字体样式</label>
                        <select
                          value={fontStyle}
                          onChange={(e) => setFontStyle(e.target.value)}
                          className="w-full rounded-md border-gray-300"
                        >
                          <option value="normal">普通</option>
                          <option value="bold">粗体</option>
                          <option value="italic">斜体</option>
                        </select>
                      </div>

                      {watermarkType === 'text' || watermarkType === 'pattern' ? (
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">旋转角度</label>
                            <span className="text-xs text-gray-500">0-360度，顺时针旋转</span>
                          </div>
                          <Input 
                            type="number"
                            placeholder="例如：45表示顺时针旋转45度"
                            value={rotation}
                            onChange={(e) => {
                              const value = parseInt(e.target.value)
                              if (!isNaN(value) && value >= 0 && value <= 360) {
                                setRotation(value.toString())
                              }
                            }}
                            min="0"
                            max="360"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) setWatermarkImage(file)
                        }}
                      />
                      
                      <div className="space-y-1 mt-4">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">水印大小</label>
                          <span className="text-xs text-gray-500">调整水印图片大小</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={watermarkSize}
                          onChange={(e) => setWatermarkSize(e.target.value)}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-center">{watermarkSize}%</div>
                      </div>
                    </div>
                  )}

                  {(watermarkType === 'text' || watermarkType === 'image') && (
                    <div className="space-y-1">
                      <label className="block text-sm font-medium">水印位置</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          {id: 'leftTop', text: '左上'},
                          {id: 'centerTop', text: '中上'},
                          {id: 'rightTop', text: '右上'},
                          {id: 'leftMiddle', text: '左中'},
                          {id: 'center', text: '中心'},
                          {id: 'rightMiddle', text: '右中'},
                          {id: 'leftBottom', text: '左下'},
                          {id: 'centerBottom', text: '中下'},
                          {id: 'rightBottom', text: '右下'},
                        ].map(pos => (
                          <button
                            key={pos.id}
                            type="button"
                            onClick={() => setWatermarkPosition(pos.id)}
                            className={`p-1 text-sm border rounded ${
                              watermarkPosition === pos.id 
                                ? 'bg-blue-500 text-white' 
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {pos.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">透明度</label>
                      <span className="text-xs text-gray-500">0%完全透明，100%完全不透明</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(e.target.value)}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500 text-center">{opacity}%</div>
                  </div>
                </div>
              )
            },
            {
              title: "裁剪图片",
              content: <p className="mb-4">选择裁剪区域</p>
            },
          ].map((item, index) => (
            <div key={index} className="tech-border p-6">
              <h3 className="text-lg font-semibold mb-4">
                {typeof item.title === 'string' ? item.title : item.title}
              </h3>
              {item.content}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button
            className="w-full tech-button"
            onClick={handleExecute}
            disabled={isLoading}
          >
            {isLoading ? '处理中...' : '执行操作'}
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}