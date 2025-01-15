/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 16:25:30
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 17:20:19
 * @FilePath: \next-cursor-admin\middleware.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routes, publicRoutes } from "./app/routes"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')

  

  // 如果是公开路由，直接放行
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // 未登录用户重定向到登录页
  if (!token) {
    const loginUrl = new URL(routes.auth.login, request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 验证token
  try {
    // 这里可以添加token验证逻辑
    // 如果token无效，抛出错误
    return NextResponse.next()
  } catch (error) {
    // token无效，清除cookie并重定向到登录页
    const response = NextResponse.redirect(new URL(routes.auth.login, request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

export const config = {
  matcher: [
    /*
     * 匹配所有路由除了:
     * - api 路由
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}