"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Music, Video, Image as ImageIcon, Palette, FileDown } from 'lucide-react'
import { UploadZone } from "@/components/upload-zone"
import Image from "next/image"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 定义功能类型
const features = [
  { id: 'resize', title: "修改图片尺寸", desc: "调整图片大小，保持最佳质量", icon: ImageIcon },
  { id: 'watermark', title: "添加水印", desc: "为图片添加文字或图片水印", icon: FileText },
  { id: 'crop', title: "图片裁剪", desc: "自由裁剪图片区域", icon: Music },
  { id: 'adjust', title: "调整亮度/对比度", desc: "优化图片亮度和对比度", icon: Video },
  { id: 'filter', title: "添加滤镜", desc: "应用专业的图片滤镜效果", icon: Palette },
  { id: 'compress', title: "图片压缩", desc: "在保持质量的同时压缩图片体积", icon: FileDown }
]

export default function ImageProcessing() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [watermarkType, setWatermarkType] = useState('text')
  const [watermarkText, setWatermarkText] = useState('')
  const [displayFontSize, setDisplayFontSize] = useState('8')
  const [fontColor, setFontColor] = useState('#000000')
  const [fontStyle, setFontStyle] = useState('normal')
  const [rotation, setRotation] = useState('0')
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
  const [watermarkSize, setWatermarkSize] = useState('25')
  const [watermarkPosition, setWatermarkPosition] = useState('rightBottom')
  const [opacity, setOpacity] = useState('50')

  // 保持原有的文件处理函数
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("请上传图片文件")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("图片大小不能超过10MB")
      return
    }
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    
    const img = new (window.Image || HTMLImageElement)(0, 0)
    img.onload = () => {
      setImageWidth(img.width)
      setImageHeight(img.height)
    }
    img.src = url
  }

  // 修改执行函数，先只处理尺寸调整
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
      const formData = new FormData()
      formData.append('file', selectedFile)

      if (width) formData.append('width', width)
      if (height) formData.append('height', height)
      
      if (hasWatermarkSettings) {
        formData.append('watermarkType', watermarkType)
        if (watermarkType === 'text' || watermarkType === 'pattern' || watermarkType === 'diagonal') {
          formData.append('watermarkText', watermarkText)
          formData.append('fontSize', (parseInt(displayFontSize) * 30).toString())
          formData.append('fontColor', fontColor)
          formData.append('opacity', opacity)
          formData.append('position', watermarkPosition)
          formData.append('fontStyle', fontStyle)
          formData.append('rotation', rotation)
        } else if (watermarkType === 'image' && watermarkImage) {
          formData.append('watermarkImage', watermarkImage)
          formData.append('opacity', opacity)
          formData.append('position', watermarkPosition)
          formData.append('watermarkSize', watermarkSize)
        }
      }

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

      // 创建下载链接
      const link = document.createElement('a')
      link.href = url
      link.download = 'processed-image.jpg'
      link.click()
    } catch (error) {
      console.error('处理错误:', error)
      toast.error('图片处理失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 右侧操作区域显示尺寸调整的控件
  const renderResizeControls = () => {
    if (selectedFeature !== 'resize') return null;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">宽度</label>
          <Input 
            type="number" 
            placeholder="输入宽度" 
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">高度</label>
          <Input 
            type="number" 
            placeholder="输入高度"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        {imageWidth > 0 && (
          <p className="text-sm text-gray-500">
            原始尺寸：{imageWidth} x {imageHeight} 像素
          </p>
        )}
      </div>
    );
  };

  // 在 renderResizeControls 后添加水印控件渲染函数
  const renderWatermarkControls = () => {
    if (selectedFeature !== 'watermark') return null;

    return (
      <div className="space-y-4">
        {/* 水印类型选择 */}
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
          <div className="grid grid-cols-2 gap-4">
            {/* 左列 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">水印文字</label>
                <Input 
                  type="text" 
                  placeholder="输入水印文字" 
                  value={watermarkText}
                  onChange={(e) => handleWatermarkTextChange(e.target.value)}
                />
              </div>
              <div>
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
              <div>
                <label className="block text-sm font-medium mb-1">字体样式</label>
                <select
                  value={fontStyle}
                  onChange={(e) => handleFontStyleChange(e.target.value)}
                  className="w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  <option value="normal">普通</option>
                  <option value="bold">粗体</option>
                  <option value="italic">斜体</option>
                  <option value="bold-italic">粗斜体</option>
                </select>
              </div>
            </div>

            {/* 右列 */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium">字体颜色</label>
                  <span className="text-xs text-gray-500">点击选择颜色</span>
                </div>
                <Input 
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              {(watermarkType === 'text' || watermarkType === 'pattern') && (
                <div>
                  <label className="block text-sm font-medium mb-1">旋转角度</label>
                  <Input 
                    type="number"
                    placeholder="0-360"
                    value={rotation}
                    onChange={(e) => setRotation(e.target.value)}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">透明度</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 text-center">{opacity}%</div>
              </div>
            </div>
          </div>
        ) : (
          /* 图片水印设置 */
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">上传水印图片</label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setWatermarkImage(file)
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">水印大小</label>
              <input
                type="range"
                min="1"
                max="100"
                value={watermarkSize}
                onChange={(e) => setWatermarkSize(e.target.value)}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">{watermarkSize}%</div>
            </div>
          </div>
        )}

        {/* 水印位置选择 */}
        {(watermarkType === 'text' || watermarkType === 'image') && (
          <div>
            <label className="block text-sm font-medium mb-1">水印位置</label>
            <select
              value={watermarkPosition}
              onChange={(e) => setWatermarkPosition(e.target.value)}
              className="w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="leftTop">左上角</option>
              <option value="centerTop">顶部居中</option>
              <option value="rightTop">右上角</option>
              <option value="leftMiddle">左侧居中</option>
              <option value="center">正中心</option>
              <option value="rightMiddle">右侧居中</option>
              <option value="leftBottom">左下角</option>
              <option value="centerBottom">底部居中</option>
              <option value="rightBottom">右下角</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  const handleWatermarkTextChange = (text: string) => {
    if (text.length <= 20) {  // 限制最大长度
      setWatermarkText(text)
    } else {
      toast.error("水印文字不能超过20个字")
    }
  }

  const handleFontSizeChange = (value: string) => {
    const size = parseFloat(value)
    const maxSize = imageWidth && imageHeight 
      ? Math.floor(Math.min(imageWidth, imageHeight) / 30)
      : 100  // 如果还没上传图片，先用100作为临时最大值
    
    if (!isNaN(size) && size > 0 && size <= maxSize) {
      setDisplayFontSize(value)
    } else if (!imageWidth || !imageHeight) {
      // 如果图片还没上传，允许输入但提示用户
      setDisplayFontSize(value)
      toast.info("上传图片后可能会自动调整字体大小")
    }
  }

  const handleFontStyleChange = (value: string) => {
    setFontStyle(value)
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">图片处理</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">专业的图片处理工具</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* 左侧功能列表 */}
              <div className="lg:w-1/4">
                <div className="sticky top-4">
                  <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/20 text-blue-600 mr-2">
                      <Palette className="h-4 w-4" />
                    </div>
                    选择功能
                  </h2>
                  <div className="space-y-2">
                    {features.map(feature => (
                      <button
                        key={feature.id}
                        onClick={() => setSelectedFeature(feature.id)}
                        className={`
                          w-full p-3 rounded-xl text-left transition-all duration-300
                          backdrop-blur-sm border border-white/20
                          ${selectedFeature === feature.id 
                            ? 'bg-white shadow-lg ring-1 ring-blue-500/20 scale-[1.02]' 
                            : 'hover:bg-white hover:shadow-md bg-white/80 hover:scale-[1.01]'}
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`
                            p-2 rounded-lg mr-3 transition-colors duration-300
                            ${selectedFeature === feature.id 
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                              : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}
                          `}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{feature.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧操作区域 */}
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 上传区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/20 text-blue-600 mr-2">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      上传图片
                    </h2>
                    <UploadZone onFileSelect={handleFileSelect} />
                  </div>

                  {/* 预览区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500/10 to-blue-500/20 text-indigo-600 mr-2">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      预览效果
                    </h2>
                    <div className="tech-border p-6">
                      <h2 className="text-xl font-semibold mb-4">预览</h2>
                      <div className="relative w-full h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
                        {previewUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={previewUrl}
                              alt="处理后预览"
                              fill
                              className="object-contain"
                              unoptimized
                              priority
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">图片预览区域</p>
                        )}
                      </div>
                      {/* 下载按钮始终显示，但根据是否有图片来决定是否可用 */}
                      <div className="mt-4">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
                          onClick={() => {
                            if (previewUrl) {
                              const link = document.createElement('a')
                              link.href = previewUrl
                              link.download = 'image.jpg'
                              link.click()
                            }
                          }}
                          disabled={!previewUrl}
                        >
                          {previewUrl ? '下载图片' : '请先上传图片'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 功能控制区域 */}
                {selectedFeature && (
                  <div className="mt-6">
                    <div className="bg-white shadow-sm rounded-xl p-4">
                      {renderResizeControls()}
                      {renderWatermarkControls()}
                    </div>
                  </div>
                )}

                {/* 执行按钮 */}
                {selectedFeature && selectedFile && (
                  <div className="mt-6">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleExecute}
                      disabled={isLoading}
                    >
                      {isLoading ? '处理中...' : '执行操作'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}