/**
 * 这个文件的路由不会显示布局。
 * 这是一个独立的新页面。
 * 文件的内容仍然需要登录才能访问
 */
import type { AppRouteModule } from '/@app/model';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [];

export const mainOutRouteNames = mainOutRoutes.map(item => item.name);
