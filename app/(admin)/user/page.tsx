'use client';

import { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_BASE_URL, API_ROUTES } from '@root/config/api';
import { http } from '@/utils/request';
import { Message } from '@/utils/message';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive';
  createdAt: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useState({
    username: '',
    role: undefined as string | undefined,
  });
  const [form] = Form.useForm();
  const isFirstRender = useRef(true);
  


  // 获取用户列表
  const fetchUsers = async () => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchParams.username) params.append('username', searchParams.username);
      if (searchParams.role) params.append('role', searchParams.role);
      
      const { data } = await http.get<{ list: User[] }>(
        `${API_BASE_URL}${API_ROUTES.user.list}?${params.toString()}`
      );
      setUsers(data.list || []);
    } catch (error) {
      // 错误已经在 request 中统一处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => ({
        admin: '管理员',
        user: '普通用户',
        editor: '编辑'
      }[role]),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'active' ? 'text-green-600' : 'text-red-600'}>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="link" 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // 编辑用户
  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  // 删除用户
  const handleDelete = async (id: string) => {
    try {
      await http.post(`${API_BASE_URL}${API_ROUTES.user.delete}`, { id });
      message.success('删除成功');
      fetchUsers();
    } catch (error) {
      // 错误已经在 request 中统一处理
    }
  };

  // 提交表单
  const handleSubmit = async (values: Partial<User>) => {
    try {
      if (editingUser) {
        const roles = values.role ? values.role.split(',') : [];
        await http.put(
          `${API_BASE_URL}${API_ROUTES.user.update}/${editingUser.id}`, 
          { ...values, id: editingUser.id, roles }
        );
        message.success('更新成功');
      } else {
        await http.post(`${API_BASE_URL}${API_ROUTES.user.create}`, values);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchUsers();
      form.resetFields();
    } catch (error) {
      // 错误已经在 request 中统一处理
    }
  };

  // Add search handler
  const handleSearch = async (values: typeof searchParams) => {
    isFirstRender.current = true;
    setSearchParams(values);
    await fetchUsers();
  };

  // Add reset handler
  const handleReset = () => {
    searchForm.resetFields();
    isFirstRender.current = true;
    setSearchParams({ username: '', role: undefined });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <div className="mb-4 bg-white p-4 rounded shadow">
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="username" label="用户名">
            <Input placeholder="请输入用户名" allowClear />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select
              placeholder="请选择角色"
              allowClear
              style={{ width: 200 }}
            >
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="editor">编辑</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-2">
              查询
            </Button>
            <Button onClick={handleReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="mb-4">
        <Button 
          type="primary" 
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setModalVisible(true);
             Message.success('新增用户成功！！！');
           }}
        >
          新增用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
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
          {!editingUser && (
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="user">普通用户</Select.Option>
              <Select.Option value="editor">编辑</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setModalVisible(false)} className="mr-2">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage; 