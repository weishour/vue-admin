import type { Router } from 'vue-router';

import { Modal, notification } from 'ant-design-vue';
import { warn } from '/@app/utils/common';
import projectSetting from '/@app/settings/project';

/**
 * 用于在路由切换时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll();
        notification.destroy();
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}
