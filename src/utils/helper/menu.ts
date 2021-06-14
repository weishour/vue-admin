import type { MenuModule, Menu, AppRouteRecordRaw } from '/@app/model';

import { AppRouteModule } from '/@app/model';
import { isUrl } from '/@app/utils/common';
import { cloneDeep } from 'lodash-es';
import { findPath, treeMap } from './tree';

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, n => n.path === path) as Menu[];
  return (menuList || []).map(item => item.path);
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // 注意，以/开头的嵌套路径将被视为根路径。
    // 这允许您在不必使用嵌套URL的情况下利用组件嵌套.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 路径不是以/开头的，也不是地址, 加入父路径
      menu.path = `${parentPath}/${menu.path}`;
    }

    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  }
}

// 解析菜单模块
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParentPath(menuList);
  return menuList[0];
}

export function transformRouteToMenu(routeModList: AppRouteModule[]) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach(item => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
      };
    },
  });
  joinParentPath(list);
  return cloneDeep(list);
}
