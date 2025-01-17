'use client';

import { Component, ReactNode } from 'react';
import { Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-xl mb-4">系统出现错误</h2>
          <Button 
            type="primary"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            重新加载
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
} 