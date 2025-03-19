"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QrCode, User, Settings, Wand2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { QRCodeGenerator } from "./qrcode/qrcode-generator"
import { NicknameGenerator } from "./nickname/nickname-generator"

// 定义功能类型
const features = [
  { id: 'qrcode', title: "二维码生成", desc: "创建自定义二维码", icon: QrCode },
  { id: 'nickname', title: "网络昵称生成", desc: "生成独特有趣的网名", icon: User },
]

export default function Generators() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  
  // 初始化功能生成器
  const qrcodeGenerator = QRCodeGenerator()
  const nicknameGenerator = NicknameGenerator()

  // 根据选择的功能渲染不同的输入选项
  const renderInputOptions = () => {
    if (!selectedFeature) {
      return (
        <div className="text-center p-6">
          <p className="text-gray-500">请从左侧选择一个功能</p>
        </div>
      );
    }

    switch (selectedFeature) {
      case 'qrcode':
        return qrcodeGenerator.renderInputOptions();
        
      case 'nickname':
        return nicknameGenerator.renderInputOptions();
        
      default:
        return null;
    }
  };
  
  // 渲染生成结果
  const renderGeneratedContent = () => {
    if (!selectedFeature) {
      return <p className="text-sm text-gray-400">等待生成内容...</p>;
    }
    
    switch (selectedFeature) {
      case 'qrcode':
        return qrcodeGenerator.renderGeneratedContent();
        
      case 'nickname':
        return nicknameGenerator.renderGeneratedContent();
        
      default:
        return <p className="text-sm text-gray-400">等待生成内容...</p>;
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">强大的在线生成工具</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松创建二维码、网络昵称等</p>
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
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
                  
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature.id)}
                      className={`
                        w-full p-3 rounded-xl text-left transition-all duration-300
                        backdrop-blur-sm border border-white/20
                        ${selectedFeature === feature.id 
                          ? 'bg-white shadow-lg ring-1 ring-purple-500/20 scale-[1.02]' 
                          : 'hover:bg-white hover:shadow-md bg-white/80 hover:scale-[1.01]'}
                      `}
                    >
                      <div className="flex items-center">
                        <div className={`
                          p-2 rounded-lg mr-3 transition-colors duration-300
                          ${selectedFeature === feature.id 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                            : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}
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
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/20 text-purple-600 mr-2">
                        <Settings className="h-4 w-4" />
                      </div>
                      生成选项
                    </h2>
                    <div className="space-y-4">
                      {renderInputOptions()}
                    </div>
                  </div>

                  {/* 预览区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/20 text-pink-600 mr-2">
                        <Wand2 className="h-4 w-4" />
                      </div>
                      生成结果
                    </h2>
                    <div className="relative w-full aspect-video bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                      {renderGeneratedContent()}
                    </div>
                  </div>
                </div>

                {/* 使用步骤 */}
                <div className="mt-6">
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h3 className="text-base font-semibold mb-4 text-gray-800">使用步骤</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "选择工具", desc: "选择需要使用的生成工具" },
                        { step: 2, title: "输入内容", desc: "输入需要生成的内容" },
                        { step: 3, title: "调整选项", desc: "根据需要调整生成选项" },
                        { step: 4, title: "获取结果", desc: "生成并下载结果" },
                      ].map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
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

