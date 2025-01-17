/*
 * @Author: yaoyc yaoyunchou@bananain.com
 * @Date: 2025-01-16 16:06:20
 * @LastEditors: yaoyc yaoyunchou@bananain.com
 * @LastEditTime: 2025-01-16 16:06:30
 * @FilePath: \next-cursor-admin\app\providers\GlobalStateProvider.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlobalStateContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  // 可以添加其他全局状态
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 初始化全局状态
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <GlobalStateContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}; 