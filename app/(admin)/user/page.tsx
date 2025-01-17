'use client';

import { useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { API_BASE_URL, API_ROUTES } from '@root/config/api';

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
  const [form] = Form.useForm();
  const isFirstRender = useRef(true);

  const fetchUsers = async () => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ROUTES.user.list}`);
      const data = await response.json();
      if(data.code === 0){
        setUsers(data.data.list || []);
      }
    } catch (error) {
      message.error('获取用户列表失败');
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

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}${API_ROUTES.user.delete}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      message.success('删除成功');
      fetchUsers();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: Partial<User>) => {
    try {
      if (editingUser) {
        // 对roles进行处理， 
        const roles = values.role ? values.role.split(',') : [];
        const url = editingUser? `${API_BASE_URL}${API_ROUTES.user.update}/${editingUser.id}` : `${API_BASE_URL}${API_ROUTES.user.create}`;
        await fetch(url, {
          method: editingUser ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, id: editingUser.id,roles:roles }),
        });
        message.success('更新成功');
      } else {
        await fetch(`${API_BASE_URL}${API_ROUTES.user.create}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchUsers();
      form.resetFields();
    } catch (error) {
      message.error('操作失败');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Button 
          type="primary" 
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setModalVisible(true);
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