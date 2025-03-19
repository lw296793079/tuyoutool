import { NextResponse } from "next/server"
import { PDFDocument } from 'pdf-lib'
import mammoth from 'mammoth'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import * as path from 'path'
import { jsPDF } from 'jspdf'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const outputFormat = formData.get('outputFormat') as string
    
    if (!file || !outputFormat) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }
    
    // 获取文件内容
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // 转换文档
    const result = await convertDocument(buffer, file.name, outputFormat)
    
    // 返回转换后的文件
    return new Response(result.buffer, {
      headers: {
        'Content-Type': result.contentType,
        'Content-Disposition': `attachment; filename="converted.${outputFormat}"`,
      },
    })
    
  } catch (error) {
    console.error('文档转换错误:', error)
    return NextResponse.json(
      { error: '文档转换失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 文档转换函数
async function convertDocument(buffer: Buffer, fileName: string, outputFormat: string): Promise<{buffer: Buffer, contentType: string}> {
  try {
    const fileExtension = path.extname(fileName).toLowerCase()
    let outputBuffer: Buffer
    let contentType: string
    
    // 从PDF转换
    if (fileExtension === '.pdf') {
      switch (outputFormat) {
        case 'docx':
          // PDF转DOCX (简单实现，仅提取文本)
          const pdfDoc = await PDFDocument.load(buffer)
          const pages = pdfDoc.getPages()
          let text = ''
          
          // 提取文本 (简化版，实际应用中需要更复杂的处理)
          for (let i = 0; i < pages.length; i++) {
            // 这里只是一个简单的示例，实际上PDF.js更适合提取文本
            text += `Page ${i + 1}\n\n`
          }
          
          // 创建DOCX文档
          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(text)
                  ],
                }),
              ],
            }],
          })
          
          outputBuffer = await Packer.toBuffer(doc)
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          break
          
        case 'txt':
          // PDF转TXT (简单实现，仅提取文本)
          const pdfDocForTxt = await PDFDocument.load(buffer)
          const pagesForTxt = pdfDocForTxt.getPages()
          let txtContent = ''
          
          // 提取文本 (简化版)
          for (let i = 0; i < pagesForTxt.length; i++) {
            txtContent += `Page ${i + 1}\n\n`
          }
          
          outputBuffer = Buffer.from(txtContent, 'utf-8')
          contentType = 'text/plain'
          break
          
        default:
          throw new Error(`不支持从PDF转换为${outputFormat}格式`)
      }
    }
    // 从DOCX转换
    else if (fileExtension === '.docx') {
      switch (outputFormat) {
        case 'pdf':
          // DOCX转PDF
          // 首先将DOCX转换为HTML
          const result = await mammoth.convertToHtml({ buffer })
          const html = result.value
          
          // 使用jsPDF创建PDF
          const doc = new jsPDF()
          // 简单地将HTML文本添加到PDF (这是一个简化版，实际应用中需要更复杂的处理)
          doc.text(html.substring(0, 1000).replace(/<[^>]*>/g, ''), 10, 10) // 只取前1000个字符作为演示，并移除HTML标签
          outputBuffer = Buffer.from(doc.output('arraybuffer'))
          contentType = 'application/pdf'
          break
          
        case 'txt':
          // DOCX转TXT
          const textResult = await mammoth.extractRawText({ buffer })
          const text = textResult.value
          outputBuffer = Buffer.from(text, 'utf-8')
          contentType = 'text/plain'
          break
          
        default:
          throw new Error(`不支持从DOCX转换为${outputFormat}格式`)
      }
    }
    // 从DOC转换 (修改)
    else if (fileExtension === '.doc') {
      // 返回更友好的错误信息
      throw new Error(`暂不支持.doc格式，请使用Word打开文件并另存为.docx格式后再上传`)
    }
    // 从TXT转换
    else if (fileExtension === '.txt') {
      const text = buffer.toString('utf-8')
      
      switch (outputFormat) {
        case 'pdf':
          // TXT转PDF
          const doc = new jsPDF()
          doc.text(text.substring(0, 1000), 10, 10) // 只取前1000个字符作为演示
          outputBuffer = Buffer.from(doc.output('arraybuffer'))
          contentType = 'application/pdf'
          break
          
        case 'docx':
          // TXT转DOCX
          const docx = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(text)
                  ],
                }),
              ],
            }],
          })
          
          outputBuffer = await Packer.toBuffer(docx)
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          break
          
        default:
          throw new Error(`不支持从TXT转换为${outputFormat}格式`)
      }
    }
    else {
      throw new Error(`不支持的文档格式: ${fileExtension}`)
    }
    
    return { buffer: outputBuffer, contentType }
  } catch (error) {
    console.error('文档转换错误:', error)
    throw error
  }
}
