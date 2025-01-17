/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 17:34:06
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 18:29:23
 * @FilePath: \next-cursor-admin\app\(admin)\layout.tsx
 * @Description: 管理后台布局
 */
'use client'
import { initMessage } from '@/utils/message';
import AdminLayout from '@root/components/layouts/AdminLayout';
import { message } from 'antd';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <AdminLayout>{children}</AdminLayout>;
} 