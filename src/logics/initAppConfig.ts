/**
 * 应用程序配置
 */
import type { ProjectConfig } from '/@/types/config';

import { primaryColor } from '/@/build/config/theme';
import { PROJ_CFG_KEY } from '/@app/constants';
import { ThemeEnum } from '/@app/enums';
import projectSetting from '/@app/settings/project';

import {
  updateHeaderBgColor,
  updateSidebarBgColor,
  updateColorWeak,
  updateGrayMode,
  updateDarkTheme,
  changeTheme,
} from '/@app/logics/theme';

import { useAppStore, useLocaleStore } from '/@app/store/modules';
import { getCommonStoragePrefix, getStorageShortName, deepMerge } from '/@app/utils';
import { Persistent } from '/@app/utils/cache/persistent';

// 初始化项目配置
export function initAppConfigStore() {
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});

  const appStore = useAppStore(),
    localeStore = useLocaleStore(),
    darkMode = appStore.getDarkMode,
    {
      colorWeak,
      grayMode,
      themeColor,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
    } = projCfg;

  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor);
    }

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }

  appStore.setProjectConfig(projCfg);

  // 初始化暗黑模式
  updateDarkTheme(darkMode);

  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }

  // 初始化本地存储
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * 清除无用的密钥
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach(key => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
