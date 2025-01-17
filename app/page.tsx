'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes, defaultRedirects } from '@root/routes';
import Cookies from 'js-cookie';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 检查是否已登录
    const token = Cookies.get('auth-token');
    
    // 根据登录状态重定向到相应页面
    if (token) {
      router.replace(defaultRedirects.authenticatedHome);
    } else {
      router.replace(defaultRedirects.unauthenticatedHome);
    }
  }, [router]);

  // 返回空内容，因为页面会立即重定向
  return null;
} 