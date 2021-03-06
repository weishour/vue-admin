import type { DropMenu } from '/@app/components/Dropdown/src/types';
import type { LocaleSetting, LocaleType } from '/@/types/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // 是否显示语言选择器
  showPicker: true,
  // 当前语言
  locale: LOCALE.ZH_CN,
  // 默认语言
  fallback: LOCALE.ZH_CN,
  // 可用语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

/**
 * @description 语言列表
 */
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
