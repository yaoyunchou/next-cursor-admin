import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:8080/api/v1/:path*', // 这里替换为你的API服务器地址和端口
      },
    ];
  },
 
};

export default nextConfig;
