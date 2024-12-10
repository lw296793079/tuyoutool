import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageIcon, Eraser, WrenchIcon } from 'lucide-react'

export default function AdvancedTools() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">高级工具</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ImageIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">调整图片尺寸</h2>
            <p className="mb-4">精确调整图片大小，保持最佳质量</p>
            <Link href="/advanced-tools/resize-image">
              <Button className="w-full tech-button">开始使用</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Eraser className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">背景去除</h2>
            <p className="mb-4">智能去除图片背景，突出主体</p>
            <Link href="/advanced-tools/background-removal">
              <Button className="w-full tech-button">开始使用</Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <WrenchIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">图像修复</h2>
            <p className="mb-4">修复受损或有瑕疵的图片</p>
            <Link href="/advanced-tools/image-repair">
              <Button className="w-full tech-button">开始使用</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

