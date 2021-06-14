import type { AppRouteModule } from '/@app/model';

import { LAYOUT } from '/@app/constants';
import { t } from '/@app/hooks/web';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@app/views/dashboard/analysis/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@app/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
};

export default dashboard;
