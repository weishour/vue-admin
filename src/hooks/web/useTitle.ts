import { watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useI18n } from '/@app/hooks/web';
import { useGlobSetting } from '/@app/hooks/setting';
import { REDIRECT_NAME } from '/@app/constants';

export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);
      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true }
  );
}
