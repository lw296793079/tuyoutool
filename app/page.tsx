import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { themeConfig } from '@/lib/theme-config'
import { Circle } from 'lucide-react' // 使用一个现有的图标作为占位符
import Link from "next/link"
import { ArrowRight, Image, FileType, Wand2, Calculator } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        
        <section className={`
          bg-gradient-to-r 
          ${themeConfig.colors.primary.gradient}
          ${themeConfig.spacing.section}
        `}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">快速、简单的在线工具平台</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">一站式解决您的图片处理、格式转换和创意需求</p>
             
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">我们的核心功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { title: "图片处理", desc: "调整大小、添加水印、裁剪等", href: "/image-processing", icon: Image },
                { title: "格式转换", desc: "图片、文档、音频、视频格式转换", href: "/format-conversion", icon: FileType },
                { title: "生成工具", desc: "二维码、密码、名片设计等", href: "/generators", icon: Wand2 },
                { title: "实用工具", desc: "计算器、OCR、图片拼接等", href: "/utilities", icon: Calculator },
              ].map((item, index) => (
                <Link href={item.href} key={index} className="block h-full">
                  <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                    <item.icon className="w-12 h-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{item.desc}</p>
                    <span className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center">
                      了解更多 <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">智能图像处理</h2>
                <p className="text-gray-600 mb-6">
                  利用最新的AI技术，我们的平台能够快速、精准地处理您的图片。
                  无论是去除背景、修复受损图片，还是生成全新的图像，我们都能满足您的需求。如果对当前功能不满意，可以联系我们，我们会尽快更新。
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  探索AI功能
                </Button>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
                  <div className="bg-gray-300 h-40 rounded-lg animate-pulse animation-delay-200"></div>
                  <div className="bg-gray-300 h-40 rounded-lg animate-pulse animation-delay-400"></div>
                  <div className="bg-gray-200 h-40 rounded-lg animate-pulse animation-delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
            <p className="text-xl mb-8">加入我们，体验快速、简单、高效的在线工具</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              免费注册
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

