import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BackgroundRemoval() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">背景去除</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <Input type="file" accept="image/*" className="w-full" />
          </div>
          <Button className="w-full tech-button mb-6">去除背景</Button>
          <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">处理后的图片预览</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

