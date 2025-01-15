"use client"
import { Form, Input, Button, message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserAuth } from "@/lib/types/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const handleRegister = async (values: UserAuth & { confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || '注册失败')
      }

      message.success('注册成功')
      router.push('/login')
    } catch (error: any) {
      message.error(error.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">注册</h1>
      <Form onFinish={handleRegister} layout="vertical">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: "请确认密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full"
            loading={loading}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
} 