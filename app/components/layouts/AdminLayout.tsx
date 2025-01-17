'use client';

import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Cookies from 'js-cookie';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '控制台',
    },
    {
        key: '/profile',
        icon: <DashboardOutlined />,
        label: '个人设置',
      },
      {
        key: '/user',
        icon: <DashboardOutlined />,
        label: '用户中心',
      },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人设置',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
        {contextHolder}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white"
      >
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-lg font-bold text-gray-800">
            {collapsed ? 'CMS' : 'CMS系统'}
          </h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex justify-between items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <Avatar icon={<UserOutlined />} />
              <span className="ml-2">管理员</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="m-6 p-6 bg-white rounded-lg min-h-[280px]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 