import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, FileType, Image, Music, Video, FileText } from 'lucide-react'

export default function FormatConversion() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">多功能格式转换工具</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松转换各种文件格式，提高工作效率</p>
              <Button size="lg" className="animate-fade-in animation-delay-400 bg-white text-green-600 hover:bg-green-50">
                开始转换 <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">支持的转换类型</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "图片转换", desc: "JPG, PNG, GIF, WebP等", icon: Image },
                { title: "文档转换", desc: "PDF, Word, Excel, PowerPoint", icon: FileText },
                { title: "音频转换", desc: "MP3, WAV, FLAC, AAC等", icon: Music },
                { title: "视频转换", desc: "MP4, AVI, MKV, MOV等", icon: Video },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                  <item.icon className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    选择文件
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">如何使用</h2>
            <div className="flex flex-wrap justify-center items-center">
              {[
                { step: 1, title: "上传文件", desc: "选择您要转换的文件" },
                { step: 2, title: "选择格式", desc: "选择目标文件格式" },
                { step: 3, title: "开始转换", desc: "点击转换按钮" },
                { step: 4, title: "下载文件", desc: "下载转换后的文件" },
              ].map((item, index) => (
                <div key={index} className="w-full md:w-1/4 px-4 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好开始转换了吗？</h2>
            <p className="text-xl mb-8">快速、简单、高效的文件格式转换工具</p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              立即开始
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

