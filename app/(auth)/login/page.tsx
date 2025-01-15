"use client"
import { Form, Input, Button, message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserAuth } from "@/lib/types/auth"
import { setToken } from "@/lib/utils/auth"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async (values: UserAuth) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || '登录失败')
      }

      setToken(data.token)
      message.success('登录成功')
      router.push('/dashboard')
    } catch (error: any) {
      message.error(error.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-4 relative">
            <Image
              src="/logo.png"
              alt="系统标志"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-medium text-gray-900">欢迎回来</h1>
          <p className="mt-2 text-gray-600">请登录您的账户</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
          <Form 
            onFinish={handleLogin} 
            layout="vertical" 
            size="large"
            className="space-y-4"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input 
                placeholder="请输入用户名"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password 
                placeholder="请输入密码"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 
                          transition-colors duration-300"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition-colors duration-300">
            忘记密码？
          </a>
        </div>
      </div>
    </div>
  )
} 