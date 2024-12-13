"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface CompressControlsProps {
  selectedFile: File | null
  onSettingsChange: (settings: CompressSettings) => void
}

export interface CompressSettings {
  quality: number
  outputFormat: 'jpeg' | 'png' | 'webp'
  targetSize: number | null
  isAutoOptimize: boolean
}

export function CompressControls({ selectedFile, onSettingsChange }: CompressControlsProps) {
  const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg')
  const [quality, setQuality] = useState('80')
  const [targetSize, setTargetSize] = useState<number | null>(null)
  const [isAutoOptimize, setIsAutoOptimize] = useState(false)
  const [compressedSize, setCompressedSize] = useState<number | null>(null)

  // 当设置改变时通知父组件
  useEffect(() => {
    onSettingsChange({
      quality: parseInt(quality),
      outputFormat,
      targetSize,
      isAutoOptimize
    })
  }, [quality, outputFormat, targetSize, isAutoOptimize, onSettingsChange])

  // 预估压缩后的大小
  useEffect(() => {
    if (selectedFile && !isAutoOptimize) {
      const estimatedSize = (selectedFile.size * parseInt(quality)) / 100
      setCompressedSize(estimatedSize)
    }
  }, [quality, selectedFile, isAutoOptimize])

  return (
    <div className="space-y-4">
      {/* 输出格式选择 */}
      <div>
        <label className="text-sm font-medium">输出格式</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
          className="w-full mt-1 rounded-md border-gray-300"
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP（更小体积）</option>
        </select>
      </div>

      {/* 自动优化开关 */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="autoOptimize"
          checked={isAutoOptimize}
          onChange={(e) => setIsAutoOptimize(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="autoOptimize" className="text-sm font-medium">
          自动优化（根据图片内容选择最佳参数）
        </label>
      </div>

      {/* 手动压缩质量控制 */}
      {!isAutoOptimize && (
        <div>
          <label className="text-sm font-medium">压缩质量: {quality}%</label>
          <Slider
            value={[parseInt(quality)]}
            min={1}
            max={100}
            step={1}
            onValueChange={([value]) => setQuality(value.toString())}
          />
        </div>
      )}

      {/* 目标文件大小设置 */}
      <div>
        <label className="text-sm font-medium">目标文件大小（KB，可选）</label>
        <Input
          type="number"
          placeholder="输入目标大小"
          value={targetSize?.toString() || ''}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            setTargetSize(isNaN(value) ? null : value)
          }}
          className="mt-1"
        />
      </div>

      {/* 文件大小信息展示 */}
      {selectedFile && (
        <div className="text-sm space-y-2">
          <div className="text-gray-600">
            原始大小：{(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </div>
          {compressedSize && !isAutoOptimize && (
            <div className="text-green-600">
              预计压缩后：{(compressedSize / 1024 / 1024).toFixed(2)} MB
              <span className="ml-2 text-gray-500">
                (节省 {(100 - (compressedSize / selectedFile.size) * 100).toFixed(1)}%)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 