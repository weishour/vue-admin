/**
 * 多语言相关操作
 */
import type { LocaleType } from '/@/types/config';

import moment from 'moment';

import { i18n } from './setupI18n';
import { useLocaleStoreWithOut } from '/@app/store/modules';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from '/@app/utils';

interface LangModule {
  message: Recordable;
  momentLocale: Recordable;
  momentLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }

  localeStore.setLocaleInfo({ locale });

  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
  });

  // 切换语言会改变useI18n的语言环境并提交配置修改
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);

    if (currentLocale === locale) return locale;

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }

    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message, momentLocale, momentLocaleName } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    moment.updateLocale(momentLocaleName, momentLocale);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  };
}
