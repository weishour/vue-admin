import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWidthOut, useUserStoreWidthOut } from '/@app/store/modules';
import { PageEnum } from '/@app/enums';
import { PAGE_NOT_FOUND_ROUTE } from '/@app/router/routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWidthOut();
  const permissionStore = usePermissionStoreWidthOut();

  router.beforeEach(async (to, from, next) => {
    // 处理登录后跳转到404页面
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 白名单是否可以进入
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = userStore.getToken;

    // token不存在
    if (!token) {
      // 可以允许不经过授权，但需要设置meta.ignoreAuth为true
      if (
        to.meta.ignoreAuth
        // || to.name === FULL_PAGE_NOT_FOUND_ROUTE.name
      ) {
        next();
        return;
      }

      // 重定向到登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };

      if (to.path) {
        redirectData.query = {
          redirect: to.path,
          ...redirectData.query,
        };
      }

      next(redirectData);

      return;
    }
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();

    routes.forEach(route => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };

    permissionStore.setDynamicAddedRoute(true);

    next(nextData);
  });
}
