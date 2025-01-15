/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 17:34:06
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 18:29:23
 * @FilePath: \next-cursor-admin\app\dashboard\layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AdminLayout from '@root/components/layouts/AdminLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
} 