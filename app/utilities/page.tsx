import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, FileText, ImagePlus, Ruler } from 'lucide-react'

export default function Utilities() {
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
              <Button size="lg" className="animate-fade-in animation-delay-400 bg-white text-orange-600 hover:bg-orange-50">
                探索工具 <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">实用工具</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "计算器", desc: "各种专业计算器", icon: Calculator },
                { title: "OCR文字识别", desc: "从图像中提取文字", icon: FileText },
                { title: "图片拼接", desc: "创建拼图和拼接图", icon: ImagePlus },
                { title: "单位换算", desc: "各种单位间的转换", icon: Ruler },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <item.icon className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    使用工具
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">强大的OCR文字识别</h2>
                <p className="text-gray-600 mb-6">
                  我们的OCR工具使用先进的人工智能技术，能够准确识别各种语言的文字。
                  无论是扫描文档、照片还是截图，都能快速提取文本内容，大大提高工作效率。
                </p>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  体验OCR功能
                </Button>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-200 h-40 rounded-lg animate-pulse"></div>
                  <div className="bg-orange-300 h-40 rounded-lg animate-pulse animation-delay-200"></div>
                  <div className="bg-orange-300 h-40 rounded-lg animate-pulse animation-delay-400"></div>
                  <div className="bg-orange-200 h-40 rounded-lg animate-pulse animation-delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-orange-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">提高您的工作效率</h2>
            <p className="text-xl mb-8">使用我们的实用工具，让日常任务变得更简单</p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              立即使用
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

