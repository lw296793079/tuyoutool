import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadZone } from '@/components/upload-zone'
export default function ImageProcessing() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">图片处理</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            <UploadZone />
            {/* <Input type="file" accept="image/*" className="mb-4" />
            <Button className="w-full tech-button">上传图片</Button> */}
          </div>
          
          <div className="tech-border p-6">
            <h2 className="text-xl font-semibold mb-4">预览</h2>
            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">图片预览区域</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "调整大小",
              content: (
                <>
                  <Input type="number" placeholder="宽度" className="mb-2" />
                  <Input type="number" placeholder="高度" className="mb-4" />
                </>
              )
            },
            {
              title: "添加水印",
              content: <Input type="text" placeholder="水印文字" className="mb-4" />
            },
            {
              title: "裁剪图片",
              content: <p className="mb-4">选择裁剪区域</p>
            },
          ].map((item, index) => (
            <div key={index} className="tech-border p-6">
              <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
              {item.content}
              <Button className="w-full tech-button">执行操作</Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}

