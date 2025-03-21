"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronDown,
  Search,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react'
import { FeedbackTable } from "@/components/feedback-table"

interface Feedback {
  id: number
  content: string
  contact: string
  status: string
  createdAt: string
  ip: string
  ipLocation: string
  timeZone: string
  language: string
  screenSize: string
  visitTime: string
  userAgent: string
  referrer: string
  routePath: string
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800'
}

const statusText = {
  PENDING: '待处理',
  PROCESSING: '处理中',
  COMPLETED: '已完成',
  REJECTED: '已拒绝'
}

export default function Dashboard() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback")
      const data = await response.json()
      if (data.success) {
        setFeedbacks(data.data)
      }
    } catch (error) {
      console.error("获取反馈失败:", error)
      toast.error("获取反馈列表失败")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.ok) {
        toast.success("状态更新成功")
        fetchFeedbacks()
      } else {
        throw new Error("更新失败")
      }
    } catch (error) {
      console.error("更新状态失败:", error)
      toast.error("更新状态失败")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条反馈吗？')) return
    
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      
      if (response.ok) {
        toast.success('删除成功')
        fetchFeedbacks()  // 刷新列表
      } else {
        throw new Error('删除失败')
      }
    } catch (error) {
      toast.error('删除失败')
    }
  }

  const handleBatchDelete = async (ids: number[]) => {
    try {
      const response = await fetch('/api/feedback/batch', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ ids })
      })
      
      if (response.ok) {
        toast.success('批量删除成功')
        fetchFeedbacks()  // 刷新列表
      } else {
        throw new Error('批量删除失败')
      }
    } catch (error) {
      toast.error('批量删除失败')
    }
  }

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "ALL" || feedback.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* 侧边栏 */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">管理后台</h1>
        </div>
        <nav className="mt-4">
          <a className="flex items-center px-6 py-3 text-gray-700 bg-gray-100">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            仪表盘
          </a>
          <a className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <MessageSquare className="w-5 h-5 mr-3" />
            反馈管理
          </a>
          <a className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" />
            系统设置
          </a>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-1">
        {/* 顶部栏 */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索反馈内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">全部状态</option>
                <option value="PENDING">待处理</option>
                <option value="PROCESSING">处理中</option>
                <option value="COMPLETED">已完成</option>
                <option value="REJECTED">已拒绝</option>
              </select>
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 ${viewMode === 'card' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <TableIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-2" />
              退出登录
            </button>
          </div>
        </header>

        {/* 反馈列表 */}
        <div className="p-8">
          {viewMode === 'table' ? (
            <FeedbackTable 
              feedbacks={filteredFeedbacks}
              onStatusChange={handleStatusChange}
              onRefresh={fetchFeedbacks}
              onDelete={handleDelete}
              onBatchDelete={handleBatchDelete}
            />
          ) : (
            <div className="grid gap-6">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm text-gray-500">
                        #{feedback.id} · {new Date(feedback.createdAt).toLocaleString()}
                      </span>
                      <div className="mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[feedback.status as keyof typeof statusColors]}`}>
                          {statusText[feedback.status as keyof typeof statusText]}
                        </span>
                      </div>
                    </div>
                    <select
                      value={feedback.status}
                      onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                      className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">待处理</option>
                      <option value="PROCESSING">处理中</option>
                      <option value="COMPLETED">已完成</option>
                      <option value="REJECTED">已拒绝</option>
                    </select>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{feedback.content}</p>
                  {feedback.contact && (
                    <div className="mt-4 text-sm text-gray-600">
                      联系方式: {feedback.contact}
                    </div>
                  )}
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">用户信息</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>IP: {feedback.ip}</div>
                      <div>位置: {feedback.ipLocation}</div>
                      <div>时区: {feedback.timeZone}</div>
                      <div>语言: {feedback.language}</div>
                      <div>分辨率: {feedback.screenSize}</div>
                      <div>提交时间: {new Date(feedback.visitTime).toLocaleString()}</div>
                      <div>来源: {feedback.referrer || '直接访问'}</div>
                      <div>访问路径: {feedback.routePath}</div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      <div>User Agent: {feedback.userAgent}</div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <div className="text-gray-500">暂无反馈数据</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 