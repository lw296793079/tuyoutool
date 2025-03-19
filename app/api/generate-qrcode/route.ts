import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: Request) {
  try {
    const { content, size = 200, color = "#000000", backgroundColor = "#FFFFFF" } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: "缺少二维码内容" },
        { status: 400 }
      );
    }
    
    // 生成二维码
    const qrCodeBuffer = await QRCode.toBuffer(content, {
      width: size,
      margin: 1,
      color: {
        dark: color,
        light: backgroundColor
      }
    });
    
    // 返回二维码图片
    return new Response(qrCodeBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=qrcode.png"
      }
    });
    
  } catch (error) {
    console.error("生成二维码出错:", error);
    return NextResponse.json(
      { error: "生成二维码失败", details: error instanceof Error ? error.message : "未知错误" },
      { status: 500 }
    );
  }
} 