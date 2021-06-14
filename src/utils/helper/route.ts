import type { AppRouteModule, AppRouteRecordRaw } from '/@app/model';
import type { Router, RouteRecordNormalized } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';
import { getParentLayout, EXCEPTION_COMPONENT, LAYOUT, LayoutMapKey } from '/@app/constants';
import { ExceptionEnum } from '/@app/enums';
import { warn } from '/@app/utils/common';
import { cloneDeep, omit } from 'lodash-es';

const LayoutMap = new Map<LayoutMapKey, () => Promise<typeof import('*.vue')>>();

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// 动态导入路由
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');

  if (!routes) return;

  routes.forEach(item => {
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const dynamicComponent = dynamicImport(dynamicViewsModules, component as string);
      item.component = dynamicComponent.component;
      item.props = dynamicComponent.props;
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

/**
 * 路由动态导入
 * @param dynamicViewsModules
 * @param component
 * @returns
 */
function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter(key => {
    let k = key.replace('../../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });

  if (matchKeys?.length > 1) {
    warn(`请不要在视图文件夹下相同层次目录中同时创建'.vue'和'.tsx'文件名，这将导致动态引入失败！`);
    return;
  }

  // 判断是否有路由组件
  const dynamicComponent: any = {
    component: matchKeys?.length === 1 ? dynamicViewsModules[matchKeys[0]] : EXCEPTION_COMPONENT,
    props: matchKeys?.length === 1 ? {} : { status: ExceptionEnum.PAGE_NOT_REGISTER },
  };

  return dynamicComponent;
}

// 将后台对象转换为路由对象
export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
  LayoutMap.set('LAYOUT', LAYOUT);

  routeList.forEach(route => {
    if (route.component) {
      if ((route.component as string).toUpperCase() === 'LAYOUT') {
        //route.component = LayoutMap.get(route.component as LayoutMapKey);
        route.component = LayoutMap.get((route.component as string).toUpperCase() as LayoutMapKey);
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = '';
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

/**
 * 将多级路由转换为二级路由
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // 使用 vue-router 拼接菜单
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map(item => omit(item, 'children'));
}

/**
 * 添加所有子路由到二级路由
 * @param routes
 * @param children
 * @param routeModule
 */
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find(item => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find(item => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

// 判断路由层级是否超过2层
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
