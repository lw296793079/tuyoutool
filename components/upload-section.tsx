"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Upload, ImageIcon, Type } from 'lucide-react'

export function UploadSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [newWidth, setNewWidth] = useState("")
  const [newHeight, setNewHeight] = useState("")
  const [watermarkText, setWatermarkText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResize = async () => {
    if (!selectedFile) return
    setIsLoading(true)

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("width", newWidth)
    formData.append("height", newHeight)

    try {
      const response = await fetch("/api/resize", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } else {
        console.error("图片调整大小失败")
      }
    } catch (error) {
      console.error("发生错误:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddWatermark = async () => {
    if (!selectedFile) return
    setIsLoading(true)

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("watermarkText", watermarkText)

    try {
      const response = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } else {
        console.error("添加水印失败")
      }
    } catch (error) {
      console.error("发生错误:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
        快速、简单的在线修改图片工具
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="mb-8">
          <Label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">
            上传图片
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>选择文件</span>
                  <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">或拖拽文件到这里</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
            </div>
          </div>
        </div>
        
        {previewUrl && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-2">预览</h2>
            <div className="relative w-full h-64">
              <Image src={previewUrl} alt="预览" layout="fill" objectFit="contain" className="rounded-lg" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <ImageIcon className="mr-2" /> 调整图片大小
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="width">新宽度</Label>
                <Input
                  id="width"
                  type="number"
                  value={newWidth}
                  onChange={(e) => setNewWidth(e.target.value)}
                  placeholder="输入新宽度"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="height">新高度</Label>
                <Input
                  id="height"
                  type="number"
                  value={newHeight}
                  onChange={(e) => setNewHeight(e.target.value)}
                  placeholder="输入新高度"
                  className="mt-1"
                />
              </div>
              <Button onClick={handleResize} className="w-full" disabled={isLoading}>
                {isLoading ? "处理中..." : "调整大小"}
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Type className="mr-2" /> 添加水印
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="watermark">水印文字</Label>
                <Input
                  id="watermark"
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="输入水印文字"
                  className="mt-1"
                />
              </div>
              <Button onClick={handleAddWatermark} className="w-full" disabled={isLoading}>
                {isLoading ? "处理中..." : "添加水印"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

