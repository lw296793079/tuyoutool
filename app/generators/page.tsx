import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, QrCode, Key, CreditCard, Palette } from 'lucide-react'

export default function Generators() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">强大的在线生成工具</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松创建二维码、密码、名片等</p>
              <Button size="lg" className="animate-fade-in animation-delay-400 bg-white text-purple-600 hover:bg-purple-50">
                开始生成 <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">我们的生成工具</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "二维码生成", desc: "创建自定义二维码", icon: QrCode },
                { title: "密码生成", desc: "生成安全的随机密码", icon: Key },
                { title: "名片设计", desc: "设计专业的电子名片", icon: CreditCard },
                { title: "调色板生成", desc: "创建漂亮的配色方案", icon: Palette },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <item.icon className="w-12 h-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    立即使用
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
                <h2 className="text-3xl font-bold mb-4 text-gray-800">智能二维码生成器</h2>
                <p className="text-gray-600 mb-6">
                  我们的二维码生成器不仅可以创建标准的黑白二维码，还支持添加自定义颜色、logo和样式。
                  无论是用于商业营销还是个人使用，都能轻松创建出独特而专业的二维码。
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  试用二维码生成器
                </Button>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-200 h-40 rounded-lg animate-pulse"></div>
                  <div className="bg-purple-300 h-40 rounded-lg animate-pulse animation-delay-200"></div>
                  <div className="bg-purple-300 h-40 rounded-lg animate-pulse animation-delay-400"></div>
                  <div className="bg-purple-200 h-40 rounded-lg animate-pulse animation-delay-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">释放您的创造力</h2>
            <p className="text-xl mb-8">使用我们的工具，轻松生成各种所需的内容</p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              开始创作
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

