import type { ProjectConfig } from '/@/types/config';
import { primaryColor } from '/@/build/config/theme';
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@app/enums/menu-enum';
import { CacheTypeEnum } from '/@app/enums/cache-enum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
} from '/@app/enums/app-enum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './design';

// ! 修改完成后，需要清空浏览器缓存
const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: true,

  // 是否显示主题切换按钮
  showDarkModeToggle: true,

  // 设置按钮位置 可选项
  // SettingButtonPositionEnum.AUTO: 自动选择  SettingButtonPositionEnum.HEADER:位于头部 SettingButtonPositionEnum.FIXED 固定在右侧
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 权限模式, 默认后端角色权限模式
  permissionMode: PermissionModeEnum.BACK,

  // 权限缓存存放位置。默认存放于localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 主题颜色
  themeColor: primaryColor,

  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,

  // 色弱模式
  colorWeak: false,

  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: false,

  // 主题内容宽度
  contentMode: ContentEnum.FULL,

  // 是否显示logo
  showLogo: true,

  // 是否显示底部信息 copyright
  showFooter: false,

  // 头部配置
  headerSetting: {
    // 背景色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 固定头部
    fixed: true,
    // 是否显示顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
    // 开启锁屏功能
    useLockPage: true,
    // 显示全屏按钮
    showFullScreen: true,
    // 显示文档按钮
    showDoc: true,
    // 显示消息中心按钮
    showNotice: true,
    // 显示菜单搜索按钮
    showSearch: true,
  },

  // 菜单配置
  menuSetting: {
    // 背景色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定住菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否可拖拽
    // 只局限于打开左边的菜单，鼠标在菜单的右边有一个拖动条
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发器的位置
    trigger: TriggerEnum.HEADER,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 在路由切换的时候关闭左侧混合菜单展开菜单
    closeMixSidebarOnChange: false,
    // 左侧混合菜单模块切换触发方式 'click'|'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 是否固定左侧混合菜单
    mixSideFixed: false,
  },

  // 多标签
  multiTabsSetting: {
    // 是否缓存
    cache: true,
    // 开启
    show: true,
    // 是否可以拖拽
    canDrag: true,
    // 开启快速操作
    showQuick: true,
    // 是否显示刷新那妞
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },

  // 动画配置
  transitionSetting: {
    // 是否打开切换页面的动画
    // 禁用状态也将禁用页面加载
    enable: false,

    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // 是否打开页面切换loading
    // 仅当enable=true时打开
    openPageLoading: true,

    // 是否打开顶部进度条
    openNProgress: true,
  },

  // 是否启用KeepAlive缓存最好在开发过程中关闭，否则每次都需要清除缓存
  openKeepAlive: false,

  // 自动锁屏时间，为0不锁屏。 单位分钟 默认1个小时
  lockTime: 0,

  // 显示面包屑
  showBreadCrumb: true,

  // 显示面包屑图标
  showBreadCrumbIcon: true,

  // 使用错误处理程序插件
  useErrorHandle: true,

  // 是否开启回到顶部
  useOpenBackTop: true,

  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,

  // 切换接口时是否删除未关闭的消息和通知
  closeMessageOnSwitch: true,

  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
};

export default setting;
