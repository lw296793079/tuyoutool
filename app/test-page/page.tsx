"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Music, Video, Image as ImageIcon, Palette, FileDown } from 'lucide-react'
import { UploadZone } from "@/components/upload-zone"
import Image from "next/image"

// 定义功能类型
const features = [
  { id: 'resize', title: "修改图片尺寸", desc: "调整图片大小，保持最佳质量", icon: ImageIcon },
  { id: 'watermark', title: "添加水印", desc: "为图片添加文字或图片水印", icon: FileText },
  { id: 'crop', title: "图片裁剪", desc: "自由裁剪图片区域", icon: Music },
  { id: 'adjust', title: "调整亮度/对比度", desc: "优化图片亮度和对比度", icon: Video },
  { id: 'filter', title: "添加滤镜", desc: "应用专业的图片滤镜效果", icon: Palette },
  { id: 'compress', title: "图片压缩", desc: "在保持质量的同时压缩图片体积", icon: FileDown }
]

export default function TestPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">图片处理测试</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">测试新功能和界面设计</p>
             
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* 左侧功能列表 */}
              <div className="lg:w-1/4">
                <div className="space-y-2.5 relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                  
                  {features.map((feature) => (
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
                    <div className="relative w-full aspect-video bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="预览"
                          fill
                          className="object-contain rounded-lg"
                          unoptimized
                        />
                      ) : (
                        <p className="text-sm text-gray-400">等待上传图片...</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 使用步骤 */}
                <div className="mt-6">
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h3 className="text-base font-semibold mb-4 text-gray-800">使用步骤</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "选择功能", desc: "��择要测试的功能" },
                        { step: 2, title: "上传图片", desc: "上传需要处理的图片" },
                        { step: 3, title: "调整参数", desc: "设置处理参数" },
                        { step: 4, title: "完成测试", desc: "查看处理效果" },
                      ].map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
                            {item.step}
                          </div>
                          <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}