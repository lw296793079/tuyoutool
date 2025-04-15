"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FileText, Music, Video, Image as ImageIcon, Download } from 'lucide-react'
import { toast } from "sonner"
import { FormatUploadZone } from "@/components/format-upload-zone"

// 定义转换类型
const conversionTypes = [
  { id: 'image', title: "图片转换", desc: "JPG, PNG, GIF, WebP等", icon: ImageIcon },
  { id: 'document', title: "文档转换", desc: "PDF, Word, Excel, PowerPoint", icon: FileText },
  { id: 'audio', title: "音频转换", desc: "MP3, WAV, FLAC, AAC等", icon: Music },
  { id: 'video', title: "视频转换", desc: "MP4, AVI, MKV, MOV等", icon: Video },
]

export default function FormatConversion() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  
  // 当转换类型改变时，清空之前上传的文件和预览
  useEffect(() => {
    setSelectedFile(null);
    setOutputFormat('');
    setPreviewUrl(null); // 清空预览
    
    // 重置上传区域
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, [selectedType]);
  
  // 文件选择处理函数
  const handleFileSelect = (file: File) => {
    // 检查是否是.doc文件
    if (file.name.toLowerCase().endsWith('.doc')) {
      toast.error("暂不支持.doc格式，请使用Word打开文件并另存为.docx格式后再上传", {
        duration: 6000,  // 显示更长时间
        action: {
          label: '了解更多',
          onClick: () => {
            // 打开一个模态框，解释如何将.doc转换为.docx
            alert('如何将.doc转换为.docx:\n\n1. 使用Microsoft Word打开文件\n2. 点击"文件" > "另存为"\n3. 选择"Word文档(.docx)"\n4. 点击保存');
          }
        }
      });
      return;
    }
    
    // 根据选择的转换类型验证文件
    if (selectedType === 'image' && !file.type.startsWith('image/')) {
      toast.error("请上传图片文件");
      return;
    } else if (selectedType === 'document' && 
               !(/\.(pdf|docx|txt)$/i.test(file.name) || 
                 file.type === 'application/pdf' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                 file.type === 'text/plain')) {
      toast.error("请上传PDF、Word(docx)或TXT文档");
      return;
    } else if (selectedType === 'audio' && !file.type.startsWith('audio/')) {
      toast.error("请上传音频文件");
      return;
    } else if (selectedType === 'video' && !file.type.startsWith('video/')) {
      toast.error("请上传视频文件");
      return;
    }
    
    // 文件大小检查
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast.error("文件大小不能超过10MB");
      return;
    }
    
    setSelectedFile(file);
    
    // 如果是图片，创建预览
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }
  
  // 获取接受的文件类型
  const getAcceptTypes = (type: string): string => {
    switch (type) {
      case 'image': 
        return 'image/*';
      case 'document': 
        return '.pdf,.docx,.txt';
      case 'audio': 
        return 'audio/*';
      case 'video': 
        return 'video/*';
      default: 
        return '*/*';
    }
  }
  
  // 获取可用的输出格式
  const getOutputFormats = (type: string | null): {value: string, label: string}[] => {
    if (!type) return [];
    
    switch (type) {
      case 'image':
        return [
          {value: 'jpg', label: 'JPG'},
          {value: 'png', label: 'PNG'},
          {value: 'webp', label: 'WebP'},
          {value: 'gif', label: 'GIF'},
          {value: 'tiff', label: 'TIFF'},
          {value: 'ico', label: 'ICO (图标)'}
        ];
      case 'document':
        return [
          {value: 'pdf', label: 'PDF'},
          {value: 'docx', label: 'Word (DOCX)'},
          {value: 'txt', label: 'Text (TXT)'}
        ];
      case 'audio':
        return [
          {value: 'mp3', label: 'MP3'},
          {value: 'wav', label: 'WAV'},
          {value: 'ogg', label: 'OGG'},
          {value: 'flac', label: 'FLAC'}
        ];
      case 'video':
        return [
          {value: 'mp4', label: 'MP4'},
          {value: 'webm', label: 'WebM'},
          {value: 'mov', label: 'MOV'},
          {value: 'avi', label: 'AVI'}
        ];
      default:
        return [];
    }
  }
  
  // 获取文件类型描述
  const getFileTypeLabel = (type: string): string => {
    switch (type) {
      case 'image': return '图片';
      case 'document': return '文档';
      case 'audio': return '音频';
      case 'video': return '视频';
      default: return '文件';
    }
  }
  
  // 转换处理函数
  const handleConvert = async () => {
    if (!selectedFile || !outputFormat) {
      toast.error("请选择文件并设置输出格式");
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('outputFormat', outputFormat);
      formData.append('conversionType', selectedType!);
      
      // 根据转换类型选择不同的 API 端点
      const apiEndpoint = (() => {
        switch(selectedType) {
          case 'image':
            return '/api/convert-format';
          case 'document':
            return '/api/convert-document';
          case 'audio':
            return '/api/convert-audio';
          case 'video':
            return '/api/convert-video';
          default:
            throw new Error('未知的转换类型');
        }
      })();
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || '转换失败');
      }
      
      // 获取转换后的文件
      const blob = await response.blob();
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      
      // 触发下载
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('转换成功');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      
      // 特殊处理.doc格式错误
      if (errorMessage.includes('.doc格式')) {
        toast.error(errorMessage, { 
          duration: 6000,  // 显示更长时间
          action: {
            label: '了解更多',
            onClick: () => {
              // 可以打开一个模态框，解释如何将.doc转换为.docx
              alert('如何将.doc转换为.docx:\n\n1. 使用Microsoft Word打开文件\n2. 点击"文件" > "另存为"\n3. 选择"Word文档(.docx)"\n4. 点击保存');
            }
          }
        });
      } else {
        toast.error(`转换失败: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {/* Hero Section with original gradient */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">多功能格式转换工具</h1>
              <p className="text-xl mb-8 animate-fade-in animation-delay-200">轻松转换各种文件格式，提高工作效率</p>
              
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* 左侧功能列表 */}
              <div className="lg:w-1/4">
                <div className="sticky top-4">
                  <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-teal-500/20 text-green-600 mr-2">
                      <FileText className="h-4 w-4" />
                    </div>
                    选择功能
                  </h2>
                  <div className="space-y-2">
                    {conversionTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`
                          w-full p-3 rounded-xl text-left transition-all duration-300
                          backdrop-blur-sm border border-white/20
                          ${selectedType === type.id 
                            ? 'bg-white shadow-lg ring-1 ring-green-500/20 scale-[1.02]' 
                            : 'hover:bg-white hover:shadow-md bg-white/80 hover:scale-[1.01]'}
                        `}
                      >
                        <div className="flex items-center">
                          <div className={`
                            p-2 rounded-lg mr-3 transition-colors duration-300
                            ${selectedType === type.id 
                              ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white' 
                              : 'bg-green-50 text-green-600 group-hover:bg-green-100'}
                          `}>
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{type.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧操作区域 */}
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 上传区域 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-teal-500/20 text-green-600 mr-2">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      选择文件
                    </h2>
                    {selectedType ? (
                      <FormatUploadZone 
                        onFileSelect={handleFileSelect} 
                        accept={getAcceptTypes(selectedType)}
                        resetKey={selectedType}
                        fileType={getFileTypeLabel(selectedType)}
                      />
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                        <Button 
                          className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
                          onClick={() => toast.info("请先选择左侧的转换类型")}
                        >
                          上传文件
                        </Button>
                        <p className="mt-2 text-sm text-gray-500">请先选择左侧的转换类型</p>
                      </div>
                    )}
                  </div>

                  {/* 转换选项 */}
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-500/10 to-green-500/20 text-teal-600 mr-2">
                        <FileText className="h-4 w-4" />
                      </div>
                      转换选项
                    </h2>
                    <div className="space-y-4">
                      <select 
                        className="w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        disabled={!selectedType || !selectedFile}
                      >
                        <option value="">选择目标格式</option>
                        {getOutputFormats(selectedType).map(format => (
                          <option key={format.value} value={format.value}>
                            {format.label}
                          </option>
                        ))}
                      </select>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-sm"
                        onClick={handleConvert}
                        disabled={!selectedFile || !outputFormat || isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            转换中...
                          </span>
                        ) : (
                          <span>开始转换</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 使用步骤 */}
                <div className="mt-6">
                  <div className="bg-white shadow-sm rounded-xl p-4">
                    <h3 className="text-base font-semibold mb-4 text-gray-800">使用步骤</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "上传文件", desc: "选择您要转换的文件" },
                        { step: 2, title: "选择格式", desc: "选择目标文件格式" },
                        { step: 3, title: "开始转换", desc: "点击转换按钮" },
                        { step: 4, title: "下载文件", desc: "下载转换后的文件" },
                      ].map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
                            {item.step}
                          </div>
                          <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}