import { getCurrentInstance } from 'vue';

// 暴露公共api
export function useExpose<T>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
