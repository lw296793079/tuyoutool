import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function ResizeImage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">修改图片尺寸</h1>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <Label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              上传图片
            </Label>
            <Input id="file-upload" type="file" accept="image/*" className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                新宽度 (像素)
              </Label>
              <Input id="width" type="number" placeholder="输入宽度" />
            </div>
            <div>
              <Label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                新高度 (像素)
              </Label>
              <Input id="height" type="number" placeholder="输入高度" />
            </div>
          </div>
          <Button className="w-full tech-button">调整图片大小</Button>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">预览</h2>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-gray-500">调整后的图片预览</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

