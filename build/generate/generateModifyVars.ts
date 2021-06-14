import {
  generateAntColors,
  primaryColor,
  successColor,
  warningColor,
  errorColor,
} from '/@/build/config/theme';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * 全局less变量
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'link-color': primary, // 链接色
    'info-color': primary, // 信息色
    'processing-color': primary, // 处理色
    'success-color': successColor, // 成功色
    'warning-color': warningColor, // 警告色
    'error-color': errorColor, // 错误色
    'border-color-base': '#EEEEEE', // 边框色
    'font-size-base': '14px', // 主文字大小
    'border-radius-base': '2px', // 组件/浮层圆角
    'app-content-background': '#fafafa', // 系统内容背景色
  };
}
