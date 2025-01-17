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

// 公开路由，无需认证即可访问
export const publicRoutes = [
  routes.auth.login,
  routes.auth.register,
  '/_next',
  '/favicon.ico'
] 

// 默认重定向规则
export const defaultRedirects = {
  // 已登录用户访问首页时重定向到仪表板
  authenticatedHome: routes.dashboard,
  // 未登录用户访问首页时重定向到登录页
  unauthenticatedHome: routes.auth.login
} 

