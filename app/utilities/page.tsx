"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calculator, FileText, ImagePlus, Ruler, Settings, Wand2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

// 定义功能类型
const features = [
  { id: 'calculator', title: "计算器", desc: "各种专业计算器", icon: Calculator },
  { id: 'ocr', title: "OCR文字识别", desc: "从图像中提取文字", icon: FileText },
  { id: 'image-merge', title: "图片拼接", desc: "创建拼图和拼接图", icon: ImagePlus },
  { id: 'unit-convert', title: "单位换算", desc: "各种单位间的转换", icon: Ruler }
]

export default function Utilities() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [result] = useState<string | null>(null)

  // 渲染输入选项
  const renderInputOptions = () => {
    switch (selectedFeature) {
      case 'calculator':
        return (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入计算表达式..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        )
      case 'ocr':
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]
              if (file) {
                // 处理文件上传
              }
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        )
      case 'image-merge':
        return (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]
              if (file) {
                // 处理多文件上传
              }
            }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        )
      case 'unit-convert':
        return (
          <div className="space-y-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入数值..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20">
              <option value="">选择单位类型</option>
              <option value="length">长度</option>
              <option value="weight">重量</option>
              <option value="temperature">温度</option>
            </select>
          </div>
        )
      default:
        return (
          <p className="text-sm text-gray-400">请先选择左侧功能...</p>
        )
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">实用工具集合</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">提高效率的多功能工具箱</p>
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
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />
                  
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature.id)}
                      className={`
                        w-full p-3 rounded-xl text-left transition-all duration-300
                        backdrop-blur-sm border border-white/20
                        ${selectedFeature === feature.id 
                          ? 'bg-white shadow-lg ring-1 ring-orange-500/20 scale-[1.02]' 
                          : 'hover:bg-white hover:shadow-md bg-white/80 hover:scale-[1.01]'}
                      `}
                    >
                      <div className="flex items-center">
                        <div className={`
                          p-2 rounded-lg mr-3 transition-colors duration-300
                          ${selectedFeature === feature.id 
                            ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' 
                            : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'}
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
                  {/* 输入区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-yellow-500/20 text-orange-600 mr-2">
                        <Settings className="h-4 w-4" />
                      </div>
                      工具选项
                    </h2>
                    <div className="space-y-4">
                      {renderInputOptions()}
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                        开始处理
                      </Button>
                    </div>
                  </div>

                  {/* 结果区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/20 text-yellow-600 mr-2">
                        <Wand2 className="h-4 w-4" />
                      </div>
                      处理结果
                    </h2>
                    <div className="relative w-full aspect-video bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                      {result ? (
                        <div className="p-4">{result}</div>
                      ) : (
                        <p className="text-sm text-gray-400">等待处理结果...</p>
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
                        { step: 1, title: "选择工具", desc: "选择需要使用的工具" },
                        { step: 2, title: "输入数据", desc: "输入需要处理的数据" },
                        { step: 3, title: "调整选项", desc: "根据需要调整选项" },
                        { step: 4, title: "获取结果", desc: "查看处理结果" },
                      ].map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
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