import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // 这里替换为你的API服务器地址和端口
      },
    ];
  },
 
};

export default nextConfig;
