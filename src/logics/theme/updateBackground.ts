import { colorIsDark, lighten, darken, setCssVar } from '/@app/utils';
import { useAppStore } from '/@app/store/modules/app';
import { ThemeEnum } from '/@app/enums';
import {
  HEADER_BG_COLOR_VAR,
  HEADER_BG_HOVER_COLOR_VAR,
  HEADER_MENU_ACTIVE_BG_COLOR_VAR,
  SIDER_DARK_BG_COLOR,
  SIDER_DARK_DARKEN_BG_COLOR,
  SIDER_LIGHTEN_BG_COLOR,
} from '/@app/constants';

/**
 * 更改顶部标题的背景颜色
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore();
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (darkMode) {
      color = '#151515';
    } else {
      color = appStore.getHeaderSetting.bgColor;
    }
  }
  // 设置背景颜色
  setCssVar(HEADER_BG_COLOR_VAR, color);

  // 设置停悬颜色
  const hoverColor = lighten(color!, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  // 根据颜色值的深度并自动切换主题
  const isDark = colorIsDark(color!);

  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  });
}

/**
 * 更改左边菜单的背景颜色
 * @param color 背景颜色
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore();

  // if (!isHexColor(color)) return;
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (darkMode) {
      color = '#212121';
    } else {
      color = appStore.getMenuSetting.bgColor;
    }
  }
  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));

  // only #ffffff is light
  // 只有当背景颜色为#fff时，菜单的主题才会变成light
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase());

  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  });
}
