import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@app/enums/menu-enum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
} from '/@app/enums/app-enum';

import { CacheTypeEnum } from '/@app/enums/cache-enum';

export type MenuMode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline';
export type LocaleType = 'zh_CN' | 'en' | 'ja';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // 全屏显示
  showFullScreen: boolean;
  // 是否显示锁屏
  useLockPage: boolean;
  // 显示文件按钮
  showDoc: boolean;
  // 显示消息中心按钮
  showNotice: boolean;
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  locale: LocaleType;
  // 默认语言
  fallback: LocaleType;
  // 可用语言
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  // 是否打开切换页面的动画
  enable: boolean;
  // 路由基本切换动画
  basicTransition: RouterTransitionEnum;
  // 是否打开页面切换加载
  openPageLoading: boolean;
  // 是否打开顶部进度条
  openNProgress: boolean;
}

export interface ProjectConfig {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum;
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean;
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // 网站灰色模式，开放可能的悼念日期
  grayMode: boolean;
  // 是否开启颜色弱模式
  colorWeak: boolean;
  // 主题颜色
  themeColor: string;

  // 主界面全屏显示，菜单不显示，顶部显示
  fullContent: boolean;
  // 内容的宽度
  contentMode: ContentEnum;
  // 是否显示logo
  showLogo: boolean;
  // 是否显示全局页脚
  showFooter: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // 菜单设置
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // 动画配置
  transitionSetting: TransitionSetting;
  // 是否开启路由缓存
  openKeepAlive: boolean;
  // 锁屏时间
  lockTime: number;
  // 是否显示面包屑
  showBreadCrumb: boolean;
  // 是否显示面包屑图标
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // 是否开回顶
  useOpenBackTop: boolean;
  // 是否有可能嵌入iframe页面
  canEmbedIFramePage: boolean;
  // 切换接口时是否删除未关闭的消息和通知
  closeMessageOnSwitch: boolean;
  // 切换接口时是否取消已发送但未响应的http请求。
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  // 系统标题
  title: string;
  // 服务接口地址
  apiUrl: string;
  // 上传文件地址
  uploadUrl?: string;
  // 服务接口url前缀
  urlPrefix?: string;
  // 项目缩写
  shortName: string;
}
export interface GlobEnvConfig {
  // 系统标题
  VITE_GLOB_APP_TITLE: string;
  // 服务接口地址
  VITE_GLOB_API_URL: string;
  // 服务接口url前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string;
  // 上传文件地址
  VITE_GLOB_UPLOAD_URL?: string;
}
