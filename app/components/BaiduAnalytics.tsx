'use client';

import { useEffect } from 'react';

export default function BaiduAnalytics() {
  useEffect(() => {
    // 仅在客户端执行
    const script = document.createElement('script');
    script.innerHTML = `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?178b58c8c680562771ee6fa5f3b945f0c";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `;
    document.head.appendChild(script);
  }, []);

  return null;
} 