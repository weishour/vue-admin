// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/@app/model';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';

import { useGlobSetting } from '/@app/hooks/setting';
import { useI18n, useMessage } from '/@app/hooks/web';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@app/enums';
import { isString, getToken, setObjToUrlParams, deepMerge } from '/@app/utils';
import { useErrorLogStoreWithOut } from '/@app/store/modules';
import { joinTimestamp, formatRequestDate } from '/@app/utils/helper';
import { EAxios } from './Axios';
import { checkStatus } from './checkStatus';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();
    const { isTransformRequestResult, isReturnNativeResponse } = options;

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) return res;

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) return res.data;

    // 错误的时候返回
    const result = res.data;
    if (!result) throw new Error(t('sys.api.apiRequestFailed'));

    const { code, data, message } = result;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = result && Reflect.has(result, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) return data;

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    switch (code) {
      case ResultEnum.TIMEOUT:
        const timeoutMsg = t('sys.api.timeoutMessage');
        createErrorModal({
          title: t('sys.api.operationFailed'),
          content: timeoutMsg,
        });
        throw new Error(timeoutMsg);
      default:
        if (message) {
          // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
          // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
          if (options.errorMessageMode === 'modal') {
            createErrorModal({ title: t('sys.api.errorTip'), content: message });
          } else if (options.errorMessageMode === 'message') {
            createMessage.error(message);
          }
        }
    }

    throw new Error(message || t('sys.api.apiRequestFailed'));
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    // 请求之前处理config
    const token = getToken();

    // jwt token
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n();
    const errorLogStore = useErrorLogStoreWithOut();

    errorLogStore.addAjaxErrorInfo(error);

    const { response, code, message } = error || {};
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        createMessage.error(t('sys.api.apiTimeoutMessage'));
      }
      if (err?.includes('Network Error')) {
        createErrorModal({
          title: t('sys.api.networkException'),
          content: t('sys.api.networkExceptionMsg'),
        });
      }
    } catch (error) {
      throw new Error(error);
    }
    checkStatus(error?.response?.status, msg);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new EAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 是否加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true,
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
