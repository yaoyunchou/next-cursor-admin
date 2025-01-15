/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 16:25:35
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 16:26:18
 * @FilePath: \next-cursor-admin\app\api\auth\login\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextResponse } from 'next/server'
import type { UserAuth } from '@/lib/types/auth'

export async function POST(request: Request) {
  try {
    const body: UserAuth = await request.json()
    
    // 这里添加实际的用户验证逻辑
    // 示例仅作演示
    if (body.username === 'admin' && body.password === 'admin') {
      const token = 'mock-jwt-token' // 实际应用中应该生成真实的JWT
      
   
      return NextResponse.json({
        success: true,
        token,
        user: {
          id: '1',
          username: body.username,
          role: 'admin'
        }
      })
    }

    return NextResponse.json(
      { message: '用户名或密码错误' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    )
  }
} 