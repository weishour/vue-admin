import type { Router } from 'vue-router';

import { setRouteChange } from '/@app/logics/mitt/routeChange';

export function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async to => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由变化
    setRouteChange(to);

    return true;
  });

  router.afterEach(to => {
    loadedPageMap.set(to.path, true);
  });
}
