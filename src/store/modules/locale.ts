import type { LocaleSetting, LocaleType } from '/@/types/config';

import { defineStore } from 'pinia';
import { store } from '/@app/store';

import { LOCALE_KEY } from '/@app/constants';
import { createLocalStorage } from '/@app/utils/cache';
import { localeSetting } from '/@app/settings/locale';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(_) {
      return !!this.localInfo?.showPicker;
    },
    getLocale(_): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * 设置多语言信息和缓存
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * 初始化多语言信息并从本地缓存加载现有配置
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// 需要在设置之外使用
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
