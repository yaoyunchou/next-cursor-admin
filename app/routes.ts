/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 16:29:16
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 17:07:02
 * @FilePath: \next-cursor-admin\app\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const routes = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
  profile: '/profile',
  auth: {
    login: '/login',
    register: '/register'
  }
}

export const publicRoutes = [
  '/login',
  '/register',
  '/_next',
  '/favicon.ico'
] 