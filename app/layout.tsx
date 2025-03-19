import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Script from 'next/script'
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
        {/* 移除这一行 */}
        {/* <link rel="icon" href="/api/favicon" /> */}
      </head>

      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        {children}
        <Toaster />
        <Script 
          strategy="afterInteractive"
          id="baidu-analytics"
          src="https://hm.baidu.com/hm.js?8b9813efd52e0e3e2ee0e973503ee144"
        />
      </body>
    </html>
  )
}

