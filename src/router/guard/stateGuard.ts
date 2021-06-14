import type { Router } from 'vue-router';

import {
  useAppStore,
  useMultipleTabStore,
  usePermissionStore,
  useUserStore,
} from '/@app/store/modules';
import { PageEnum } from '/@app/enums';
import { removeTabChangeListener } from '/@app/logics/mitt/routeChange';

export function createStateGuard(router: Router) {
  router.afterEach(to => {
    const tabStore = useMultipleTabStore();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const permissionStore = usePermissionStore();

    // 只需进入登录页面清除身份验证信息
    if (to.path === PageEnum.BASE_LOGIN) {
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
