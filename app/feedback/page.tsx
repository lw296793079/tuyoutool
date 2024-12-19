"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { getBrowserInfo, getDeviceType, getOSInfo } from '@/lib/utils/system-info';

interface FeedbackForm {
  title: string;
  content: string;
  contact: string;
  category: string;
  browser: string;
  device: string;
  os: string;
  url: string;
  screenSize: string;
  language: string;
  userAgent: string;
  timeZone: string;
  referrer: string;
  routePath: string;
  visitTime: string;
}

export default function Feedback() {
  const [formData, setFormData] = useState<FeedbackForm>({
    title: "",
    content: "",
    contact: "",
    category: "OTHER",
    browser: getBrowserInfo(),  // 自动获取
    device: getDeviceType(),    // 自动获取
    os: getOSInfo(),           // 自动获取
    url: window.location.href,  // 自动获取
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    userAgent: navigator.userAgent,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
    routePath: window.location.pathname,
    visitTime: new Date().toISOString()
  });

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitted(true)
        setFormData({
          title: "",
          content: "",
          contact: "",
          category: "OTHER",
          browser: getBrowserInfo(),  // 自动获取
          device: getDeviceType(),    // 自动获取
          os: getOSInfo(),           // 自动获取
          url: window.location.href,  // 自动获取
          screenSize: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          userAgent: navigator.userAgent,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer,
          routePath: window.location.pathname,
          visitTime: new Date().toISOString()
        })
      } else {
        throw new Error(data.error || '提交失败')
      }
    } catch (error) {
      alert('提交失败，请稍后重试')
      console.error('提交错误:', error)
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">建议反馈</h1>
          
          {submitted ? (
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold text-green-600 mb-2">感谢您的反馈！</h2>
              <p className="text-gray-600 mb-4">您的建议对我们很重要，我们会认真考虑每一条反馈。</p>
              <Button 
                onClick={() => setSubmitted(false)}
                className="bg-green-500 hover:bg-green-600"
              >
                继续提交
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  反馈类型 <span className="text-gray-500 text-xs">（请选择最相关的类型）</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BUG">问题反馈</option>
                  <option value="FEATURE">功能建议</option>
                  <option value="IMPROVEMENT">体验优化</option>
                  <option value="QUESTION">使用咨询</option>
                  <option value="OTHER">其他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  反馈内容 <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs ml-2">（请详细描述您遇到的问题或建议）</span>
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="请描述您的具体问题或建议，比如：功能使用时遇到的问题、希望新增的功能等..."
                  required
                  className="min-h-[150px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式
                  <span className="text-gray-500 text-xs ml-2">（选填，方便我们及时反馈处理进度）</span>
                </label>
                <Input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="邮箱或其他联系方式"
                />
              </div>

              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">系统将自动收集以下信息以帮助我们更好地解决问题：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>浏览器类型：{formData.browser}</li>
                  <li>设备类型：{formData.device}</li>
                  <li>操作系统：{formData.os}</li>
                  <li>当前页面：{formData.url}</li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full"
                disabled={!formData.content.trim()}
              >
                提交反馈
              </Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
} 