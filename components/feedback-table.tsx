import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Trash2 } from 'lucide-react'

interface Feedback {
  id: number
  content: string
  contact: string
  status: string
  createdAt: string
  ip: string
  ipLocation: string
}

interface FeedbackTableProps {
  feedbacks: Feedback[]
  onStatusChange: (id: number, status: string) => void
  onRefresh: () => void
  onDelete: (id: number) => void
  onBatchDelete: (ids: number[]) => void
}

export function FeedbackTable({ feedbacks, onStatusChange, onRefresh, onDelete, onBatchDelete }: FeedbackTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(feedbacks.map(f => f.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter(i => i !== id))
    }
  }

  const handleBatchAction = async (status: string) => {
    try {
      const response = await fetch('/api/feedback/batch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          ids: selectedIds,
          status
        })
      })

      if (response.ok) {
        toast.success('批量更新成功')
        setSelectedIds([])
        onRefresh()
      } else {
        throw new Error('更新失败')
      }
    } catch (error) {
      toast.error('批量更新失败')
    }
  }

  return (
    <div className="space-y-4">
      {/* 批量操作按钮 */}
      {selectedIds.length > 0 && (
        <div className="flex gap-2 p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-500">已选择 {selectedIds.length} 项</span>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              if (confirm(`确定要删除选中的 ${selectedIds.length} 条反馈吗？`)) {
                onBatchDelete(selectedIds)
              }
            }}
          >
            批量删除
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleBatchAction('COMPLETED')}
          >
            标记为已完成
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleBatchAction('REJECTED')}
          >
            标记为已拒绝
          </Button>
        </div>
      )}

      {/* 表格 */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === feedbacks.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>内容</TableHead>
              <TableHead>联系方式</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>位置</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(feedback.id)}
                    onCheckedChange={(checked) => handleSelect(feedback.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>{feedback.id}</TableCell>
                <TableCell className="max-w-xs truncate">{feedback.content}</TableCell>
                <TableCell>{feedback.contact}</TableCell>
                <TableCell>{feedback.ip}</TableCell>
                <TableCell>{feedback.ipLocation}</TableCell>
                <TableCell>{feedback.status}</TableCell>
                <TableCell>{new Date(feedback.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <select
                    value={feedback.status}
                    onChange={(e) => onStatusChange(feedback.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="PENDING">待处理</option>
                    <option value="PROCESSING">处理中</option>
                    <option value="COMPLETED">已完成</option>
                    <option value="REJECTED">已拒绝</option>
                  </select>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => onDelete(feedback.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 