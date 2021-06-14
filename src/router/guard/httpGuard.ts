import type { Router } from 'vue-router';
import { AxiosCanceler } from '/@app/plugin/axios/axiosCancel';
import projectSetting from '/@app/settings/project';

/**
 * 当路由切换时，关闭当前页面以取消未完成请求
 * @param router
 */
export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;

  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }

  router.beforeEach(async () => {
    // 切换路由将删除先前的请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}
