"use client"

import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { QrCode, Download, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function QRCodeGenerator() {
  const [qrContent, setQrContent] = useState<string>('')
  const [qrSize, setQrSize] = useState<string>('200')
  const [qrColor, setQrColor] = useState<string>('#000000')
  const [qrBgColor, setQrBgColor] = useState<string>('#FFFFFF')
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 生成二维码
  const handleGenerateQRCode = async () => {
    if (!qrContent.trim()) {
      toast.error("请输入二维码内容");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: qrContent,
          size: parseInt(qrSize),
          color: qrColor,
          backgroundColor: qrBgColor
        }),
      });
      
      if (!response.ok) {
        throw new Error('生成二维码失败');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrImageUrl(url);
      
    } catch (error) {
      toast.error("生成二维码失败: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  // 下载二维码
  const handleDownloadQRCode = () => {
    if (!qrImageUrl) return;
    
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("二维码已下载");
  };

  // 渲染输入选项
  const renderInputOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">二维码内容</label>
          <input
            type="text"
            value={qrContent}
            onChange={(e) => setQrContent(e.target.value)}
            placeholder="输入网址、文本或联系方式..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">二维码大小</label>
          <select 
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="200">200 x 200</option>
            <option value="300">300 x 300</option>
            <option value="400">400 x 400</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">二维码颜色</label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">前景色</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">背景色</label>
              <input
                type="color"
                value={qrBgColor}
                onChange={(e) => setQrBgColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
        <Button 
          onClick={handleGenerateQRCode}
          disabled={isLoading || !qrContent.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          {isLoading ? "生成中..." : "生成二维码"}
        </Button>
      </div>
    );
  };

  // 渲染生成结果
  const renderGeneratedContent = () => {
    if (qrImageUrl) {
      return (
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex-grow flex items-center justify-center w-full">
            <Image 
              src={qrImageUrl} 
              alt="生成的二维码" 
              width={parseInt(qrSize)} 
              height={parseInt(qrSize)}
              className="max-w-full max-h-full"
            />
          </div>
          <div className="flex space-x-2 w-full mt-4">
            <Button 
              onClick={handleDownloadQRCode}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              下载
            </Button>
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(qrContent);
                toast.success("内容已复制到剪贴板");
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              复制内容
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center p-4 text-gray-500">
        <QrCode className="w-16 h-16 mx-auto mb-2 opacity-20" />
        <p>二维码预览区域</p>
      </div>
    );
  };

  return {
    renderInputOptions,
    renderGeneratedContent
  };
} 