"use client"

import Image from "next/image"

interface ImagePreviewProps {
  url: string | null
  className?: string
}

export function ImagePreview({ url, className = "h-[400px]" }: ImagePreviewProps) {
  return (
    <div className={`relative w-full ${className} bg-gray-200 rounded-md flex items-center justify-center`}>
      {url ? (
        <div className="relative w-full h-full">
          <Image
            src={url}
            alt="预览图片"
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      ) : (
        <p className="text-gray-500">图片预览区域</p>
      )}
    </div>
  )
}
