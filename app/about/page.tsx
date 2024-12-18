import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">关于本站</h1>
        <div className="max-w-3xl mx-auto prose prose-blue">
          <h2>项目初衷</h2>
          <p>
            作为一名开发者，我希望打造一个简单易用的在线工具平台，
            帮助用户更便捷地处理日常工作中的各种数字资源。
          </p>
          
          <h2>技术栈</h2>
          <p>本项目使用以下技术构建：</p>
          <ul>
            <li>Next.js 14 - React框架</li>
            <li>TypeScript - 类型安全</li>
            <li>Tailwind CSS - 样式处理</li>
            <li>Vercel - 部署平台</li>
          </ul>
          
          <h2>开发进度</h2>
          <ul>
            <li>✅ 基础框架搭建</li>
            <li>✅ 图片处理功能</li>
            <li>🚧 格式转换工具</li>
            <li>🚧 生成工具集</li>
            <li>🚧 实用工具集</li>
            <li>🚧 高级工具（AI功能）</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  )
} 