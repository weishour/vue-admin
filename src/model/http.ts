export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式请求参数时间
  formatDate?: boolean;
  // 是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 是否添加前缀
  joinPrefix?: boolean;
  // 接口地址，使用默认apiUrl，如果你让它为空
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
  status?: boolean;
  error?: Error;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // 其他参数
  data?: Recordable;
  // 文件参数接口字段名
  name?: string;
  // 文件实例
  file: File | Blob;
  // 文件名称
  filename?: string;
  [key: string]: any;
}
