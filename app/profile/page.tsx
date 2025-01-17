'use client';

import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Tabs, Upload } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { TabsProps } from 'antd';
import { API_BASE_URL, API_ROUTES } from '@root/config/api';
import Cookies from 'js-cookie';

interface UserProfile {
  username: string;
  email: string;
  avatar: string;
  phone?: string;
  bio?: string;
}

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ROUTES.profile.get}`);
      const data = await response.json();
      setProfile(data);
      form.setFieldsValue(data);
    } catch (error) {
      message.error('获取个人信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: Partial<UserProfile>) => {
    try {
      await fetch(`${API_BASE_URL}${API_ROUTES.profile.update}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('更新成功');
      fetchProfile();
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleChangePassword = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await fetch(`${API_BASE_URL}${API_ROUTES.profile.changePassword}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('密码修改成功');
      passwordForm.resetFields();
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: `${API_BASE_URL}${API_ROUTES.profile.uploadAvatar}`,
    headers: {
      authorization: Cookies.get('auth-token') || '',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success('头像上传成功');
        fetchProfile();
      } else if (info.file.status === 'error') {
        message.error('头像上传失败');
      }
    },
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          className="max-w-lg"
        >
          <Form.Item label="头像">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="个人简介"
            name="bio"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: '修改密码',
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
          className="max-w-lg"
        >
          <Form.Item
            label="当前密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card loading={loading} title="个人资料">
        <Tabs items={items} />
      </Card>
    </div>
  );
};

export default ProfilePage; 