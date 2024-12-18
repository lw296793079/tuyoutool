import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <Link href="/about" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">关于本站</Link>
          <Link href="/feedback" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">建议反馈</Link>
          <a 
            href="https://github.com/lw296793079/tuyoutool" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            GitHub
          </a>
          <Link href="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">隐私说明</Link>
        </div>
        
        <div className="text-center text-sm text-gray-500 space-y-2">
          <div>© 2024 图优工具 - 个人开发者作品</div>
          <div>
            <Link 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-700 transition-colors"
            >
              蜀ICP备2024115160号
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

