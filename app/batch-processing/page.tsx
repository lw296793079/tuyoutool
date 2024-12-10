import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BatchProcessing() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">批量处理</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Button>选择多张图片</Button>
              <p className="mt-2 text-sm text-gray-500">或将多张图片拖放到此处</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">处理选项</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resize">调整大小</Label>
                <Input id="resize" placeholder="例如: 800x600" />
              </div>
              <div>
                <Label htmlFor="format">转换格式</Label>
                <select id="format" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option>JPG</option>
                  <option>PNG</option>
                  <option>WebP</option>
                </select>
              </div>
              <Button className="w-full">应用水印</Button>
              <Button className="w-full">批量重命名</Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button className="w-full">开始批量处理</Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}

