import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultError, getRequestToken, requestParams } from '/@/mock/_utils';
import { AppRouteModule } from '/@app/model';
import { createFakeUserList } from './user';

const systemRoute: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: 'layout',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: 'routes.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.system.account',
        ignoreKeepAlive: true,
      },
      component: '/system/account/index',
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.system.menu',
        ignoreKeepAlive: false,
      },
      component: '/system/menu/index',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.system.role',
        ignoreKeepAlive: true,
      },
      component: '/system/role/index',
    },
    {
      path: 'department',
      name: 'DeptManagement',
      meta: {
        title: 'routes.system.department',
        ignoreKeepAlive: true,
      },
      component: '/system/department/index',
    },
  ],
};

// single
const dashboardRoute: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'layout',
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        affix: true,
        ignoreKeepAlive: false,
        title: 'routes.dashboard.analysis',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        title: 'routes.dashboard.workbench',
      },
    },
  ],
};

const aboutRoute: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: '/sys/about/index',
  meta: {
    ignoreKeepAlive: false,
    title: 'routes.dashboard.about',
    icon: 'simple-icons:about-dot-me',
  },
};

export default [
  {
    url: '/api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find(item => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;

      if (!id || id === '1') {
        return resultSuccess([systemRoute, dashboardRoute, aboutRoute]);
      }
      // if (id === '2') {
      //   return resultSuccess([dashboardRoute, authRoute, authRoute1, levelRoute]);
      // }
    },
  },
] as MockMethod[];
