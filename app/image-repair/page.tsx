import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ImageRepair() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">图像修复</h1>
        <p className="text-center">图像修复功能正在开发中...</p>
      </div>
      <Footer />
    </main>
  )
}

