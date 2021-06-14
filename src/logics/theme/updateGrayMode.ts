import { toggleClass } from '/@app/utils/common';

/**
 * 更改系统灰色模式状态
 * @param {boolean} gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement);
}
