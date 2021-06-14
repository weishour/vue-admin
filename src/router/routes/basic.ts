import type { AppRouteRecordRaw } from '/@app/model';

import { t } from '/@app/hooks/web/useI18n';
import { REDIRECT_NAME, LAYOUT, EXCEPTION_COMPONENT } from '/@app/constants';

// 404页面路由
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

// 重定向路由
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@app/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

// 错误日志路由
export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'errorLog',
  component: LAYOUT,
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'list',
      name: 'errorLogList',
      component: () => import('/@app/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
      },
    },
  ],
};
