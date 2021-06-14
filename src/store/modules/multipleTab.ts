import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';

import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY } from '/@app/constants';
import { PageEnum } from '/@app/enums';
import { store } from '/@app/store';
import { useGo, useRedo } from '/@app/hooks/web';
import { getRawRoute } from '/@app/utils';
import { Persistent } from '/@app/utils/cache/persistent';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@app/router/routes/basic';
import projectSetting from '/@app/settings/project';

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}

function handleGotoPage(router: Router) {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
}

const cacheTab = projectSetting.multiTabsSetting.cache;

export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    // 缓存的标签列表
    cacheTabList: new Set(),
    // 多标签列表
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    // 最后移动的标签页的索引
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(_) {
      return this.tabList;
    },
    getCachedTabList(_): string[] {
      return Array.from(this.cacheTabList);
    },
    getLastDragEndIndex(_): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    /**
     * 根据当前打开的标签页更新缓存
     * @returns
     */
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set();

      for (const tab of this.tabList) {
        const item = getRawRoute(tab);
        // 忽略缓存
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) {
          continue;
        }
        const name = item.name as string;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
    },

    /**
     * 刷新标签页面
     * @param router
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;

      const findTab = this.getCachedTabList.find(item => item === name);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
      const redo = useRedo(router);
      await redo();
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    resetState(): void {
      this.tabList = [];
      this.clearCacheTabs();
    },
    goToPage(router: Router) {
      const go = useGo(router);
      const len = this.tabList.length;
      const { path } = unref(router.currentRoute);

      let toPath: PageEnum | string = PageEnum.BASE_HOME;

      if (len > 0) {
        const page = this.tabList[len - 1];
        const p = page.fullPath || page.path;
        if (p) {
          toPath = p;
        }
      }
      // 跳转到当前页面并报告错误
      path !== toPath && go(toPath as PageEnum, true);
    },

    /**
     * 添加标签页
     * @param route
     * @returns
     */
    async addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query } = getRawRoute(route);
      // 404页面不需要添加标签页
      if (
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
      ) {
        return;
      }

      let updateIndex = -1;
      // 已经存在的页面，不重复添加选标签页
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });

      // 如果该标签页已经存在，则执行更新操作
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.tabList.splice(updateIndex, 1, curTab);
      } else {
        // 添加标签页
        this.tabList.push(route);
      }
      this.updateCacheTab();
      cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
    },

    /**
     * 关闭标签页
     * @param tab
     * @param router
     * @returns
     */
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const getToTarget = (tabItem: RouteLocationNormalized) => {
        const { params, path, query } = tabItem;
        return {
          params: params || {},
          path,
          query: query || {},
        };
      };

      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route;
        if (affix) {
          return;
        }
        const index = this.tabList.findIndex(item => item.fullPath === fullPath);
        index !== -1 && this.tabList.splice(index, 1);
      };

      const { currentRoute, replace } = router;

      const { path } = unref(currentRoute);
      if (path !== tab.path) {
        // 关闭不是激活的标签页
        close(tab);
        return;
      }

      // 关闭激活的标签页
      let toTarget: RouteLocationRaw = {};

      const index = this.tabList.findIndex(item => item.path === path);

      // 如果当前是最左边的标签页
      if (index === 0) {
        // 如果只有一个标签页就跳转到主页，否则就跳转到右侧标签页
        if (this.tabList.length === 1) {
          toTarget = PageEnum.BASE_HOME;
        } else {
          // 跳转到右侧标签页
          const page = this.tabList[index + 1];
          toTarget = getToTarget(page);
        }
      } else {
        // 关闭当前标签页
        const page = this.tabList[index - 1];
        toTarget = getToTarget(page);
      }
      close(currentRoute.value);
      replace(toTarget);
    },

    /**
     * 根据key关闭标签页
     * @param key
     * @param router
     */
    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex(item => (item.fullPath || item.path) === key);
      index !== -1 && this.closeTab(this.tabList[index], router);
    },

    /**
     * 标签页排序
     * @param oldIndex
     * @param newIndex
     */
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex];
      this.tabList.splice(oldIndex, 1);
      this.tabList.splice(newIndex, 0, currentTab);
      this.lastDragEndIndex = this.lastDragEndIndex + 1;
    },

    /**
     * 关闭右侧的标签页并跳转
     * @param route
     * @param router
     */
    async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(item => item.path === route.path);

      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index);
        const pathList: string[] = [];
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        this.bulkCloseTabs(pathList);
      }
      this.updateCacheTab();
      handleGotoPage(router);
    },

    /**
     * 关闭左侧的标签页并跳转
     * @param route
     * @param router
     */
    async closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(item => item.fullPath === route.fullPath);

      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length);

        const pathList: string[] = [];
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        this.bulkCloseTabs(pathList);
      }
      this.updateCacheTab();
      handleGotoPage(router);
    },

    /**
     * 关闭所有的标签页
     * @param router
     */
    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter(item => item?.meta?.affix ?? false);
      this.clearCacheTabs();
      this.goToPage(router);
    },

    /**
     * 关闭其他的标签页
     * @param route
     * @param router
     */
    async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map(item => item.fullPath);

      const pathList: string[] = [];

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find(item => item.path === path);
          if (!closeItem) {
            continue;
          }
          const affix = closeItem?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(closeItem.fullPath);
          }
        }
      }
      this.bulkCloseTabs(pathList);
      this.updateCacheTab();
      handleGotoPage(router);
    },

    /**
     * 批量关闭选项卡
     * @param pathList
     */
    async bulkCloseTabs(pathList: string[]) {
      this.tabList = this.tabList.filter(item => !pathList.includes(item.fullPath));
    },

    /**
     * 设置标签标题
     */
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find(item => item === route);
      if (findTab) {
        findTab.meta.title = title;
        await this.updateCacheTab();
      }
    },
  },
});

// 需要在设置之外使用
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
