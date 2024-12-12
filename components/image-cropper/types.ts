export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export interface ImageCropperProps {
  imageUrl: string
  onCropComplete: (cropArea: CropArea) => void
  aspectRatio?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  circularCrop?: boolean
  lockAspectRatio?: boolean
  keepSelection?: boolean
  aspect?: number
  handleExecute?: () => void
  isLoading?: boolean
}

export type AspectRatioPreset = {
  label: string
  value: number | undefined
}
