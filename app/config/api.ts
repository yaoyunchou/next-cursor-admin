/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-15 20:32:16
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-15 20:43:12
 * @FilePath: \next-cursor-admin\app\config\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const API_BASE_URL = '/api/v1';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  user: {
    list: '/user/list',
    create: '/user',
    update: '/user',
    delete: '/user',
  },
  profile: {
    get: '/profile',
    update: '/profile/update',
    changePassword: '/profile/password',
    uploadAvatar: '/profile/avatar',
  },
  settings: {
    get: '/settings',
    update: '/settings/update',
  },
}; 