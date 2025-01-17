'use client';

import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Switch, Space } from 'antd';
import { API_BASE_URL, API_ROUTES } from '@root/config/api';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenance: boolean;
  emailNotification: boolean;
}

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ROUTES.settings.get}`);
      const data = await response.json();
      form.setFieldsValue(data);
    } catch (error) {
      message.error('获取设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: SystemSettings) => {
    try {
      await fetch(`${API_BASE_URL}${API_ROUTES.settings.update}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card title="系统设置" loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="网站名称"
            name="siteName"
            rules={[{ required: true, message: '请输入网站名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="网站描述"
            name="siteDescription"
            rules={[{ required: true, message: '请输入网站描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="维护模式"
            name="maintenance"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="邮件通知"
            name="emailNotification"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPage; 