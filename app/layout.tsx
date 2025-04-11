import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "图优工具 - 快速、简单的在线图片编辑工具",
  description: "提供基础编辑、高级功能、证件相关和专业服务的在线图片处理平台",
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="h-full">
      <head>
        {/* 这里不能直接添加普通的 script 标签，因为 Next.js 会处理 head 内容 */}
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        {children}
        <Toaster />
        
        {/* 在 body 末尾添加内联脚本 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?178b58c6805627716ee6fa5f3b945f0c";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        }} />
      </body>
    </html>
  );
}

