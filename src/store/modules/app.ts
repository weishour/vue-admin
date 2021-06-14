import type { ProjectConfig } from '/@/types/config';
import type { BeforeMiniState } from '/@app/model';

import { defineStore } from 'pinia';
import { store } from '/@app/store';

import { ThemeEnum } from '/@app/enums';
import { APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '/@app/constants';
import { Persistent } from '/@app/utils/cache/persistent';
import { darkMode } from '/@app/settings';
import { resetRouter } from '/@app/router';
import { deepMerge } from '/@app/utils';

interface AppState {
  // 主题模式
  darkMode?: ThemeEnum;
  // 页面是否加载
  pageLoading: boolean;
  // 项目配置
  projectConfig: ProjectConfig | null;
  // 当窗口缩小时，记住一些状态，并在窗口恢复时恢复这些状态
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(_) {
      return this.pageLoading;
    },
    getDarkMode(_): ThemeEnum | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode;
    },

    getBeforeMiniInfo(_) {
      return this.beforeMiniInfo;
    },

    getProjectConfig(_): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(_) {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(_) {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(_) {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(_) {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // 防止闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// 需要在设置之外使用
export function useAppStoreWidthOut() {
  return useAppStore(store);
}
