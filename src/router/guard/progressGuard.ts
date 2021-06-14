import type { Router } from 'vue-router';

import { unref } from 'vue';
import { useTransitionSetting } from '/@app/hooks/setting';
import nProgress from 'nprogress';

export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async to => {
    if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    // if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
