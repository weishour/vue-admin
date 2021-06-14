/**
 * @description: 菜单类型
 */
export enum MenuTypeEnum {
  // 侧边菜单
  SIDEBAR = 'sidebar',
  // 混合侧边菜单
  MIX_SIDEBAR = 'mix-sidebar',
  // 混合菜单
  MIX = 'mix',
  // 顶部菜单
  TOP_MENU = 'top-menu',
}

/**
 * @description: 折叠触发器位置
 */
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER',
}

/**
 * @description: 菜单布局方式
 */
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT,
}

/**
 * @description: 顶部菜单位置
 */
export enum TopMenuAlignEnum {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

/**
 * @description: 混合侧边菜单触发方式
 */
export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
