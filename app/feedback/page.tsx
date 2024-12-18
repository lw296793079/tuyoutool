"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function Feedback() {
  const [feedback, setFeedback] = useState("")
  const [contact, setContact] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, contact }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitted(true)
        setFeedback("")
        setContact("")
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
                  您的建议或想法
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="请详细描述您的建议，比如新功能需求、使用体验改进等..."
                  required
                  className="min-h-[150px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式（选填）
                </label>
                <Input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="邮箱或其他联系方式，方便我们反馈进度"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-600">
                <p>💡 提示：</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>建议尽可能详细地描述您的想法</li>
                  <li>如果是功能建议，可以说明使用场景</li>
                  <li>如果是问题反馈，请描述复现步骤</li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full"
                disabled={!feedback.trim()}
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