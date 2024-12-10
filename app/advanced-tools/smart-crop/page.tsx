import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export default function SmartCrop() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 neon-text">智能裁剪</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <Input type="file" accept="image/*" className="mb-4" />
            <Select>
              <option>1:1 方形</option>
              <option>4:3 横向</option>
              <option>16:9 宽屏</option>
              <option>9:16 竖屏</option>
            </Select>
            <Button className="w-full tech-button mt-4">
              上传图片
            </Button>
          </div>
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">预览</h2>
            <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-gray-400">智能裁剪预览</p>
            </div>
          </div>
        </div>
        <Button className="mt-8 tech-button">
          开始智能裁剪
        </Button>
      </div>
      <Footer />
    </main>
  )
}

