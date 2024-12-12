"use client"

import { ImageCropper } from '@/components/image-cropper'
import { UploadZone } from '@/components/upload-zone'
import { ImagePreview } from '@/components/image-preview'
import { useState } from 'react'
import { toast } from "sonner"
import type { CropArea } from '@/components/image-cropper/types'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ImageCropPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("请上传图片文件")
      return
    }
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleCropComplete = async (cropArea: CropArea) => {
    if (!selectedFile) return
    
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('x', cropArea.x.toString())
    formData.append('y', cropArea.y.toString())
    formData.append('width', cropArea.width.toString())
    formData.append('height', cropArea.height.toString())

    try {
      const response = await fetch('/api/crop-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('裁剪失败')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
      toast.success('裁剪成功')
    } catch  {
      toast.error('图片裁剪失败')
    }
  }

  const handleExecute = () => {
    setIsLoading(true)
    // 在这里处理执行逻辑
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：上传和裁剪区域 */}
          <div className="space-y-4">
            <div className="bg-white shadow-sm rounded-xl p-4">
              <h2 className="text-base font-semibold mb-3">上传图片</h2>
              <UploadZone onFileSelect={handleFileSelect} />
            </div>
            
            {previewUrl && (
              <div className="bg-white shadow-sm rounded-xl p-4">
                <h2 className="text-base font-semibold mb-3">裁剪区域</h2>
                <ImageCropper
                  imageUrl={previewUrl}
                  onCropComplete={handleCropComplete}
                  aspectRatio={1}
                  handleExecute={handleExecute}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
          
          {/* 右侧：预览区域 */}
          <div className="bg-white shadow-sm rounded-xl p-4">
            <h2 className="text-base font-semibold mb-3">预览效果</h2>
            <ImagePreview url={previewUrl} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
