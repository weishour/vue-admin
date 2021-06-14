/**
 * @description: 内容区域宽度
 */
export enum ContentEnum {
  // 流式
  FULL = 'full',
  // 定宽
  FIXED = 'fixed',
}

/**
 * @description: 菜单主题
 */
export enum ThemeEnum {
  // 暗黑
  DARK = 'dark',
  // 浅色
  LIGHT = 'light',
}

/**
 * @description: 设置按钮位置
 */
export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

/**
 * @description: 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = 'ROLE',
  // black
  BACK = 'BACK',
}

/**
 * @description: 路由切换动画
 */
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
