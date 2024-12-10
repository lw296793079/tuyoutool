import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Image, Download } from 'lucide-react'

export default function BackgroundRemoval() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">智能背景去除</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松去除任何图片背景，突出主体</p>
              <Button size="lg" className="animate-fade-in animation-delay-400 bg-white text-purple-600 hover:bg-purple-50">
                开始使用 <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Feature */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">上传图片去除背景</h2>
                <div className="mb-8">
                  <Input type="file" accept="image/*" className="w-full" />
                </div>
                <div className="flex justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Image className="mr-2 h-5 w-5" /> 去除背景
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们的背景去除工具</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "AI驱动", desc: "使用先进的AI技术，精确识别并去除背景" },
                { title: "快速处理", desc: "几秒钟内完成背景去除，节省您的宝贵时间" },
                { title: "高质量输出", desc: "保证输出图片的边缘平滑，细节清晰" },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好尝试了吗？</h2>
            <p className="text-xl mb-8">立即体验我们的智能背景去除工具</p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              免费试用 <Download className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

