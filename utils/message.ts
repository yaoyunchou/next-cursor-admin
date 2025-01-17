
let baseMessage:any = null;

// 初始化Message
export const initMessage = (messageApi: any) => {
    baseMessage = messageApi;
}

// 导出静态方法
export const Message =  {

    success: (content: string) => baseMessage.success(content),
    error: (content: string) => baseMessage.error(content),
    warning: (content: string) => baseMessage.warning(content),
    info: (content: string) => baseMessage.info(content),
    loading: (content: string) => baseMessage.loading(content),
  
}; 