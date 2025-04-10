import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Script from 'next/script'
import { Toaster } from "sonner"
import BaiduAnalytics from './components/BaiduAnalytics'

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
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        <BaiduAnalytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

