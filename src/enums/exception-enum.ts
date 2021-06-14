/**
 * @description: 异常相关
 */
export enum ExceptionEnum {
  // 路由组件未注册
  PAGE_NOT_REGISTER = 300,

  // 页面不能访问
  PAGE_NOT_ACCESS = 403,

  // 没有相关页面
  PAGE_NOT_FOUND = 404,

  // 系统错误
  ERROR = 500,

  // 网络错误
  NET_WORK_ERROR = 10000,

  // No data on the page. In fact, it is not an exception page
  PAGE_NOT_DATA = 10100,
}

/**
 * @description: 异常类型
 */
export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
