"use client"

import { useState, useRef } from 'react'
import { ImageCropperProps } from './types'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import type { CropArea } from './types'

const ASPECT_RATIO_PRESETS = [
  { label: '自由', value: undefined },
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16/9 },
  { label: '4:3', value: 4/3 },
  { label: '2:3', value: 2/3 }
]

export function ImageCropper({
  imageUrl,
  onCropComplete,
  aspect,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [selectedRatio, setSelectedRatio] = useState<number | undefined>(aspect)
  const [isCircular, setIsCircular] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop)
  }

  const handleCropComplete = (crop: Crop, percentCrop: Crop) => {
    if (imageRef.current && percentCrop.width && percentCrop.height) {
      const imageElement = imageRef.current
      const cropArea: CropArea = {
        x: (percentCrop.x / 100) * imageElement.width,
        y: (percentCrop.y / 100) * imageElement.height,
        width: (percentCrop.width / 100) * imageElement.width,
        height: (percentCrop.height / 100) * imageElement.height
      }
      onCropComplete(cropArea)
    }
  }

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90))
  }

  const handleReset = () => {
    setRotation(0)
    setScale(1)
    setCrop(undefined)
  }

  return (
    <div className="space-y-4">
      {/* 裁剪控制面板 - 固定在上方 */}
      <div className="bg-white p-4 rounded-lg space-y-4 sticky top-0 z-10">
        {/* 裁剪比例选择 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">裁剪比例</label>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIO_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                size="sm"
                variant={selectedRatio === preset.value ? "default" : "outline"}
                onClick={() => setSelectedRatio(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 旋转和缩放控制 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">图片调整</label>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleRotate('left')}>↺ 向左旋转</Button>
            <Button size="sm" onClick={() => handleRotate('right')}>↻ 向右旋转</Button>
            <Button size="sm" variant="outline" onClick={handleReset}>重置</Button>
          </div>
        </div>

        {/* 缩放控制 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">缩放: {scale.toFixed(1)}x</label>
          <Slider
            value={[scale]}
            min={0.5}
            max={3}
            step={0.1}
            onValueChange={([value]) => setScale(value)}
          />
        </div>

        {/* 其他选项 */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCircular}
              onChange={(e) => setIsCircular(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">圆形裁剪</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">锁定比例</span>
          </label>
        </div>
      </div>

      {/* 裁剪区域 - 可滚动 */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[300px]">
        <ReactCrop
          crop={crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
          aspect={selectedRatio}
          className="max-w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={imageUrl}
            alt="要裁剪的图片"
            className="max-w-full h-auto"
            style={{
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: 'transform 0.3s'
            }}
          />
        </ReactCrop>
      </div>
    </div>
  )
}
