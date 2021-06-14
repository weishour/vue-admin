import type { RouteRecordRaw } from 'vue-router';

import {
  useAppStore,
  usePermissionStore,
  useUserStore,
  useMultipleTabStore,
} from '/@app/store/modules';

import { router, resetRouter } from '/@app/router';
// import { RootRoute } from '/@app/router/routes';
import { PermissionModeEnum, RoleEnum } from '/@app/enums';
import { isArray } from '/@app/utils/common';
import { intersection } from 'lodash-es';
import { useTabs } from './useTabs';
import projectSetting from '/@app/settings/project';

// 用户权限相关操作
export function usePermission() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const { closeAll } = useTabs(router);

  /**
   * 改变权限模式
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROLE
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * 重置和恢复授权资源信息
   * @param id
   */
  async function resume() {
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    closeAll();
  }

  /**
   * 判断是否授权
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    const permMode = projectSetting.permissionMode;

    if (PermissionModeEnum.ROLE === permMode) {
      // Visible by default
      if (!value) {
        return def;
      }
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value as RoleEnum);
      }
      return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0;
    }

    if (PermissionModeEnum.BACK === permMode) {
      // Visible by default
      if (!value) {
        return def;
      }
      const allCodeList = permissionStore.getPermCodeList;
      if (!isArray(value)) {
        return allCodeList.includes(value as string);
      }
      return (intersection(value, allCodeList) as string[]).length > 0;
    }
    return true;
  }

  /**
   * 改变角色
   * @param roles
   */
  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROLE) {
      throw new Error('请将配置中的PermissionModeEnum模式切换为ROLE模式进行操作!');
    }

    if (!isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    await resume();
  }

  /**
   * 刷新菜单数据
   */
  async function refreshMenu() {
    resume();
  }

  return { changeRole, hasPermission, togglePermissionMode, refreshMenu };
}
