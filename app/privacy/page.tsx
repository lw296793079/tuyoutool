import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Privacy() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">隐私政策</h1>
        <div className="max-w-3xl mx-auto prose prose-blue">
          <p className="lead">
            隐私权是您的重要权利。向图优工具网站提供您的个人信息是基于对我们的信任，
            我们将确保您的个人信息只用于帮助我们为您提供更好的服务。
          </p>

          <h2>信息收集与使用</h2>
          <p>在您使用本网站时，我们可能会收集以下信息：</p>
          <ul>
            <li>访客信息（如 IP 地址和浏览器类型）</li>
            <li>网站使用活动和偏好</li>
            <li>用户上传的临时文件</li>
          </ul>
          <p>
            虽然我们可能收集或记录此信息，但我们通常不会辨认您的身份或将此信息与您的其他信息对应起来。
            这些信息主要用于：
          </p>
          <ul>
            <li>网站技术问题诊断</li>
            <li>改善用户体验</li>
            <li>提供基本服务功能</li>
          </ul>

          <h2>数据处理原则</h2>
          <ul>
            <li>所有文件处理均在浏览器本地完成</li>
            <li>定期删除服务器上的临时文件</li>
            <li>屏蔽搜索引擎对用户信息的抓取</li>
            <li>不会将信息提供给任何无关第三方</li>
          </ul>

          <h2>Cookie 使用说明</h2>
          <p>
            本站使用 Cookie 技术来记录用户上传文件的临时信息。这些信息仅存储在您的本地浏览器中，
            并且只用于查询和管理您最近上传的文件。请注意：不同设备或浏览器之间的 Cookie 信息是独立的。
          </p>

          <h2>文件删除政策</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3>自动删除机制</h3>
            <p>我们会定期删除服务器上的临时文件，因此所有生成的下载链接都有时效性。</p>
            
            <h3>手动删除方式</h3>
            <p>如需立即删除您上传的文件，您可以：</p>
            <ul>
              <li>使用网站提供的【文件自助查询删除工具】（支持查询近24小时内的上传记录）</li>
              <li>通过网站反馈功能提交删除请求</li>
            </ul>
          </div>

          <h2>法律合规</h2>
          <p>
            除非根据法律或政府的强制性规定，在未得到您的许可之前，
            我们不会把您的任何个人信息提供给无关的第三方（包括公司或个人）。
          </p>

          <h2>更新时间</h2>
          <p>最后更新时间：2024年12月</p>
        </div>
      </div>
      <Footer />
    </main>
  )
} 