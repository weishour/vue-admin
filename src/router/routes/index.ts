import type { AppRouteRecordRaw, AppRouteModule } from '/@app/model';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@app/router/routes/basic';
import { PageEnum } from '/@app/enums';
import { t } from '/@app/hooks/web';
import { mainOutRoutes } from './mainOut';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@app/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// 带有权限的基本路由
export const basicRoutes = [LoginRoute, RootRoute, ...mainOutRoutes, REDIRECT_ROUTE];
