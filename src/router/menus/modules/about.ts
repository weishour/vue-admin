import type { MenuModule } from '/@app/model';
import { t } from '/@app/hooks/web';

const about: MenuModule = {
  orderNo: 100000,
  menu: {
    path: '/about/index',
    name: t('routes.dashboard.about'),
  },
};
export default about;
