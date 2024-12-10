import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ImageBeautification() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">图片美化</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Button>选择图片</Button>
              <p className="mt-2 text-sm text-gray-500">或将图片拖放到此处</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">美化选项</h2>
            <div className="space-y-4">
              <Button className="w-full">自动增强</Button>
              <Button className="w-full">调整亮度/对比度</Button>
              <Button className="w-full">添加滤镜</Button>
              <Button className="w-full">裁剪/旋转</Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">预览</h2>
          <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
            <p className="text-gray-500">图片预览区域</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

