import { toggleClass } from '/@app/utils/common';

/**
 * 更改系统的颜色弱点模式的状态
 * @param {boolean} colorWeak
 */
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement);
}
