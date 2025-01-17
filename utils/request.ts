import { message } from 'antd';
import Cookies from 'js-cookie';

interface RequestOptions extends RequestInit {
  token?: string;
  skipErrorMessage?: boolean;
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

const getToken = () => {
  // 从 cookie 中获取 token， 使用 js-cookie 库
  return Cookies.get('token') || '';
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  const token = options.token || getToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    // 统一处理错误
    if (data.code !== 0) {
      if (!options.skipErrorMessage) {
        message.error(data.message || '请求失败');
      }
      // 处理 token 过期
      if (data.code === 401) {
        // 清除 token 并跳转到登录页
        debugger
        Cookies.remove('token');
        window.location.href = '/login';
      }
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (!options.skipErrorMessage) {
      message.error((error as Error).message || '网络请求失败');
    }
    throw error;
  }
};

// 封装常用方法
export const http = {
  get: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'GET' }),
    
  post: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>(url, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' }),
}; 