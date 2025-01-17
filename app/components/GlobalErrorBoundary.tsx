'use client';

import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { initMessage, Message } from '@/utils/message';

interface Props {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: Props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Global error caught:', error);
      setHasError(true);
      Message.error('系统出现错误');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    initMessage(messageApi);
  }, [messageApi])
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl mb-4">系统出现错误</h2>
        <Button 
          type="primary"
          onClick={() => {
            setHasError(false);
            window.location.reload();
          }}
        >
          重新加载
        </Button>
      </div>
    );
  }

  return <>{contextHolder}{children}</>;
} 