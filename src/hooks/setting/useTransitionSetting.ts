import type { TransitionSetting } from '/@/types/config';

import { computed } from 'vue';

import { useAppStore } from '/@app/store/modules';

export function useTransitionSetting() {
  const appStore = useAppStore(),
    getEnableTransition = computed(() => appStore.getTransitionSetting?.enable),
    getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress),
    getOpenPageLoading = computed((): boolean => !!appStore.getTransitionSetting?.openPageLoading),
    getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }

  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
