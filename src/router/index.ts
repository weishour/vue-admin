import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { REDIRECT_NAME } from '/@app/constants';
import { basicRoutes, LoginRoute } from './routes';

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];

// 系统路由
export const router = createRouter({
  history:
    import.meta.env.VITE_HASH_ROUTER_MODE == true
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 设置路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}
