"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from 'lucide-react'

const menuItems = [
  {
    title: "图片处理",
    items: [
      "修改图片尺寸",
      "添加水印",
      "图片裁剪",
      "调整亮度/对比度",
      "添加滤镜",
      "图片压缩",
    ]
  },
  {
    title: "格式转换",
    items: [
      "图片格式转换",
      "PDF转Word",
      "音频格式转换",
      "视频格式转换",
    ]
  },
  {
    title: "生成工具",
    items: [
      "二维码生成",
      "随机密码生成",
      "名片设计",
    ]
  },
  {
    title: "实用工具",
    items: [
      "BMI计算器",
      "贷款计算器",
      "文字识别(OCR)",
      "图片拼接",
    ]
  },
  {
    title: "高级功能",
    items: [
      "AI图像生成",
      "背景去除",
      "图像修复",
      "智能裁剪",
      "颜色提取",
      "图像风格迁移",
    ]
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md border-b border-blue-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/placeholder.svg" 
            alt="图优工具" 
            width={32} 
            height={32} 
            className="rounded hover-glow"
          />
          <Link href="/" className="text-xl font-bold text-blue-600">图优工具</Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-200"
            >
              全部功能
              <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-5 gap-4 z-50">
                {menuItems.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-bold mb-2 text-indigo-600">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                            className="hover:text-blue-500 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link href="/image-processing" className="hover:text-blue-500 transition-colors duration-200">图片处理</Link>
          <Link href="/format-conversion" className="hover:text-blue-500 transition-colors duration-200">格式转换</Link>
          <Link href="/generators" className="hover:text-blue-500 transition-colors duration-200">生成工具</Link>
          <Link href="/utilities" className="hover:text-blue-500 transition-colors duration-200">实用工具</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="tech-button">登录</button>
          <button className="tech-button bg-indigo-500 hover:bg-indigo-600">注册</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="text-blue-600" /> : <Menu className="text-blue-600" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 animate-in slide-in-from-top duration-200">
          <nav className="space-y-4">
            <Link href="/image-processing" className="block hover:text-blue-500 transition-colors duration-200">图片处理</Link>
            <Link href="/format-conversion" className="block hover:text-blue-500 transition-colors duration-200">格式转换</Link>
            <Link href="/generators" className="block hover:text-blue-500 transition-colors duration-200">生成工具</Link>
            <Link href="/utilities" className="block hover:text-blue-500 transition-colors duration-200">实用工具</Link>
          </nav>
          <div className="mt-4 space-y-2">
            <button className="w-full px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">登录</button>
            <button className="w-full px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200">注册</button>
          </div>
        </div>
      )}
    </header>
  )
}

