import type { MenuModule } from '/@app/model';
import { t } from '/@app/hooks/web';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    path: '/dashboard',
    name: t('routes.dashboard.dashboard'),
    children: [
      {
        path: 'analysis',
        name: t('routes.dashboard.analysis'),
      },
      {
        path: 'workbench',
        name: t('routes.dashboard.workbench'),
      },
    ],
  },
};
export default menu;
