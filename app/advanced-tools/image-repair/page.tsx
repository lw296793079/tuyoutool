import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ImageRepair() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 neon-text">图像修复</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">上传损坏的图片</h2>
            <Input type="file" accept="image/*" className="mb-4" />
            <Button className="w-full tech-button">
              上传图片
            </Button>
          </div>
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">预览</h2>
            <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-gray-400">修复前/后对比预览</p>
            </div>
          </div>
        </div>
        <Button className="mt-8 tech-button">
          开始修复图像
        </Button>
      </div>
      <Footer />
    </main>
  )
}

