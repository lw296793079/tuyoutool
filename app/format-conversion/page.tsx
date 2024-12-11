"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FileText, Music, Video, Image as ImageIcon } from 'lucide-react'

// 定义转换类型
const conversionTypes = [
  { id: 'image', title: "图片转换", desc: "JPG, PNG, GIF, WebP等", icon: ImageIcon },
  { id: 'document', title: "文档转换", desc: "PDF, Word, Excel, PowerPoint", icon: FileText },
  { id: 'audio', title: "音频转换", desc: "MP3, WAV, FLAC, AAC等", icon: Music },
  { id: 'video', title: "视频转换", desc: "MP4, AVI, MKV, MOV等", icon: Video },
]

export default function FormatConversion() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section with original gradient */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">多功能格式转换工具</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松转换各种文件格式，提高工作效率</p>
              
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
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-teal-500/20 text-green-600 mr-2">
                      <FileText className="h-4 w-4" />
                    </div>
                    选择功能
                  </h2>
                  <div className="space-y-2">
                    {conversionTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`
                          w-full p-3 rounded-xl text-left transition-all duration-300
                          backdrop-blur-sm border border-white/20
                          ${selectedType === type.id 
                            ? 'bg-white shadow-lg ring-1 ring-green-500/20 scale-[1.02]' 
                            : 'hover:bg-white hover:shadow-md bg-white/80 hover:scale-[1.01]'}
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`
                            p-2 rounded-lg mr-3 transition-colors duration-300
                            ${selectedType === type.id 
                              ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white' 
                              : 'bg-green-50 text-green-600 group-hover:bg-green-100'}
                          `}>
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{type.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
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
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-teal-500/20 text-green-600 mr-2">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      选择文件
                    </h2>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <Button className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                        上传文件
                      </Button>
                      <p className="mt-2 text-sm text-gray-500">或将文件拖放到此处</p>
                    </div>
                  </div>

                  {/* 转换选项 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-500/10 to-green-500/20 text-teal-600 mr-2">
                        <FileText className="h-4 w-4" />
                      </div>
                      转换选项
                    </h2>
                    <div className="space-y-4">
                      <select className="w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500/20">
                        <option value="">选择目标格式</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                      </select>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-sm"
                      >
                        开始转换
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 使用步骤 */}
                <div className="mt-6">
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h3 className="text-base font-semibold mb-4 text-gray-800">使用步骤</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "上传文件", desc: "选择您要转换的文件" },
                        { step: 2, title: "选择格式", desc: "选择目标文件格式" },
                        { step: 3, title: "开始转换", desc: "点击转换按钮" },
                        { step: 4, title: "下载文件", desc: "下载转换后的文件" },
                      ].map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
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