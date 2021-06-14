import type { App } from 'vue';
import { i18n } from '/@app/locales/setupI18n';
import VXETable from 'vxe-table';
import VXETablePluginAntd from 'vxe-table-plugin-antd';
import VXETablePluginMenus from 'vxe-table-plugin-menus';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
import 'xe-utils';
import 'vxe-table/lib/style.css';
import 'vxe-table-plugin-antd/dist/style.css';

export function registerVxe(app: App<Element>) {
  // 自定义渲染 ant-design-vue 组件
  VXETable.use(VXETablePluginAntd);

  // 快捷菜单集
  VXETable.use(VXETablePluginMenus);

  // 导入导出xlsx
  VXETable.use(VXETablePluginExportXLSX);

  // 全局设置
  VXETable.setup({
    // 对组件内置的提示语进行国际化翻译
    i18n: (key, args) => i18n.global.t(key, args),
    // 可选，对参数中的列头、校验提示..等进行自动翻译（只对支持国际化的有效）
    translate(key, args) {
      // 例如，只翻译 "vxe." 开头的键值
      if (key && key.indexOf('vxe.') > -1) {
        return i18n.global.t(key, args);
      }
      return key;
    },
    // 全局尺寸
    size: 'mini',
    // 全局 zIndex 起始值
    zIndex: 999,
    version: 0,
    icon: {
      TABLE_EDIT: 'fa fa-edit',
      MODAL_ZOOM_IN: 'fa fa-window-maximize',
      MODAL_ZOOM_OUT: 'fa fa-window-restore',
    },
    // 基础表格
    table: {
      // 自动监听父元素的变化去重新计算表格
      autoResize: true,
      // 所有的列是否允许拖动列宽调整大小
      resizable: true,
      // 是否带有斑马纹
      stripe: true,
      // 是否带有边框
      border: true,
      // 是否为圆角边框
      round: false,
      // 保持原始值的状态
      keepSource: true,
      // 所有的列对齐方式
      align: 'center',
      // 所有的表头列的对齐方式
      headerAlign: 'center',
      // 所有的表尾列的对齐方式
      footerAlign: 'center',
      // 是否显示表头
      showHeader: true,
      // 是否要高亮当前行
      highlightCurrentRow: false,
      // 鼠标移到行是否要高亮显示
      highlightHoverRow: true,
      // 是否要高亮当前列
      highlightCurrentColumn: false,
      // 鼠标移到列是否要高亮显示
      highlightHoverColumn: true,
    },
    // 高级表格
    grid: {
      // 表格的尺寸
      size: 'mini',
    },
    // 弹窗
    modal: {
      // 是否显示底部
      showFooter: true,
    },
  });

  app.use(VXETable);

  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
}
