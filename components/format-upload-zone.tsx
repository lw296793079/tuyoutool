"use client"

import { useState, useCallback, useEffect } from 'react'
import { Upload, File, FileText, Music, Video } from 'lucide-react'
import Image from 'next/image'

interface FormatUploadZoneProps {
  onFileSelect?: (file: File) => void
  accept?: string
  maxSize?: number // 单位:MB
  resetKey?: any // 当这个属性改变时，组件会重置内部状态
  fileType?: string // 文件类型描述，如"图片"、"文档"等
}

export const FormatUploadZone = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  resetKey,
  fileType = "文件"
}: FormatUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // 当resetKey改变时，重置组件状态
  useEffect(() => {
    setPreviewUrl(null)
    setError(null)
    setProgress(0)
    setSelectedFile(null)
  }, [resetKey])

  // 获取文件图标
  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="w-12 h-12" />;
    
    if (selectedFile.type.startsWith('image/')) {
      return <Upload className="w-12 h-12" />;
    } else if (selectedFile.type.startsWith('audio/') || /\.(mp3|wav|flac|aac)$/i.test(selectedFile.name)) {
      return <Music className="w-12 h-12 text-blue-500" />;
    } else if (selectedFile.type.startsWith('video/') || /\.(mp4|avi|mkv|mov)$/i.test(selectedFile.name)) {
      return <Video className="w-12 h-12 text-purple-500" />;
    } else if (/\.(pdf|docx?|txt|xlsx?|pptx?)$/i.test(selectedFile.name)) {
      return <FileText className="w-12 h-12 text-green-500" />;
    } else {
      return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  // 获取文件大小的可读格式
  const getReadableFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = useCallback((file: File) => {
    // 文件验证由外部处理，这里只检查大小
    if (file.size > maxSize * 1024 * 1024) {
      setError(`文件大小不能超过 ${maxSize}MB`)
      return
    }

    setError(null)
    setSelectedFile(file)
    
    // 只为图片文件创建预览
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
        onFileSelect?.(file)
      }
      reader.readAsDataURL(file)
    } else {
      // 非图片文件直接调用回调
      onFileSelect?.(file)
    }

    // 模拟上传进度
    setProgress(0)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }, [maxSize, onFileSelect])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400'
          }
          ${error ? 'border-red-500' : ''}
          ${selectedFile ? 'bg-gray-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="mb-4">
              {getFileIcon()}
            </div>
          )}
          
          {selectedFile ? (
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getReadableFileSize(selectedFile.size)}
              </p>
              <p className="text-xs text-green-500 mt-1 font-medium">
                文件已上传，可以进行转换
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 text-center">
                拖拽文件到此处或点击上传
              </p>
              <p className="text-xs text-gray-500 mt-1">
                请上传{fileType}文件
              </p>
            </>
          )}
          
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </div>

        {progress > 0 && progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
} 