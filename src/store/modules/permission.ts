import type { AppRouteRecordRaw, Menu } from '/@app/model';

import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { store } from '/@app/store';
import { useUserStore } from './user';
import { useAppStoreWidthOut } from './app';
import {
  transformObjToRoute,
  flatMultiLevelRoutes,
  transformRouteToMenu,
  filter,
} from '/@app/utils/helper';

import { PermissionModeEnum } from '/@app/enums';
import { asyncRoutes } from '/@app/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@app/router/routes/basic';
import { getMenuList } from '/@app/api/sys/menu';
import { getPermCode } from '/@app/api/sys/user';
import projectSetting from '/@app/settings/project';

interface PermissionState {
  // 权限代号列表
  permCodeList: string[];
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // 触发更新菜单时间
  lastBuildMenuTime: number;
  // 后台菜单列表
  backMenuList: Menu[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发更新菜单时间
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
  }),
  getters: {
    getPermCodeList(_) {
      return this.permCodeList;
    },
    getBackMenuList(_) {
      return this.backMenuList;
    },
    getLastBuildMenuTime(_) {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(_) {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      const codeList = await getPermCode();
      this.setPermCodeList(codeList);
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore();
      const appStore = useAppStoreWidthOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
      // 角色权限
      if (permissionMode === PermissionModeEnum.ROLE) {
        const routeFilter = (route: AppRouteRecordRaw) => {
          const { meta } = route;
          const { roles } = meta || {};
          if (!roles) return true;
          return roleList.some(role => roles.includes(role));
        };
        routes = filter(asyncRoutes, routeFilter);
        routes = routes.filter(routeFilter);
        // 将多级路由转换为二级路由
        routes = flatMultiLevelRoutes(routes);
        // 后台动态权限处理
      } else if (permissionMode === PermissionModeEnum.BACK) {
        // 模拟从后台获取权限代码，该函数可能只需要执行一次，实际项目可以自行放置在合适的时间
        let routeList: AppRouteRecordRaw[] = [];
        try {
          this.changePermissionCode();
          routeList = (await getMenuList()) as AppRouteRecordRaw[];
        } catch (error) {
          console.error(error);
        }

        // 动态导入组件
        routeList = transformObjToRoute(routeList);

        // 后台路由转为菜单结构
        const backMenuList = transformRouteToMenu(routeList);
        this.setBackMenuList(backMenuList);

        routeList = flatMultiLevelRoutes(routeList);
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
      }
      routes.push(ERROR_LOG_ROUTE);
      console.log('所有路由表：', routes);
      return routes;
    },
  },
});

// 需要在设置之外使用
export function usePermissionStoreWidthOut() {
  return usePermissionStore(store);
}
