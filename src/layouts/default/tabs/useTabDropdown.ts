import type { TabContentProps } from './types';
import type { DropMenu } from '/@app/components/Dropdown';
import type { ComputedRef } from 'vue';

import { computed, unref, reactive } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';
import { useMultipleTabStore } from '/@app/store/modules';
import { useTabs, useI18n } from '/@app/hooks/web';
import { MenuEventEnum } from './types';

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  });

  const { t } = useI18n();
  const tabStore = useMultipleTabStore();
  const { currentRoute } = useRouter();
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
  });

  /**
   * @description: 菜单下拉列表
   */
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return;
    }
    const { meta } = unref(getTargetTab);
    const { path } = unref(currentRoute);

    // 刷新页面
    const curItem = state.current;
    const index = state.currentIndex;
    const refreshDisabled = curItem ? curItem.path !== path : true;
    // 关闭左侧标签
    const closeLeftDisabled = index === 0;

    const disabled = tabStore.getTabList.length === 1;

    // 关闭右侧标签
    const closeRightDisabled =
      index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0;
    const dropMenuList: DropMenu[] = [
      {
        icon: 'ion:reload-sharp',
        event: MenuEventEnum.REFRESH_PAGE,
        text: t('layout.multipleTab.reload'),
        disabled: refreshDisabled,
      },
      {
        icon: 'clarity:close-line',
        event: MenuEventEnum.CLOSE_CURRENT,
        text: t('layout.multipleTab.close'),
        disabled: !!meta?.affix || disabled,
        divider: true,
      },
      {
        icon: 'line-md:arrow-close-left',
        event: MenuEventEnum.CLOSE_LEFT,
        text: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: 'line-md:arrow-close-right',
        event: MenuEventEnum.CLOSE_RIGHT,
        text: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'dashicons:align-center',
        event: MenuEventEnum.CLOSE_OTHER,
        text: t('layout.multipleTab.closeOther'),
        disabled: disabled,
      },
      {
        icon: 'clarity:minus-line',
        event: MenuEventEnum.CLOSE_ALL,
        text: t('layout.multipleTab.closeAll'),
        disabled: disabled,
      },
    ];

    return dropMenuList;
  });

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return;
      }
      e?.preventDefault();
      const index = tabStore.getTabList.findIndex(tab => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // 标签右键事件处理
  function handleMenuEvent(menu: DropMenu): void {
    const { event } = menu;
    switch (event) {
      // 重新加载
      case MenuEventEnum.REFRESH_PAGE:
        refreshPage();
        break;
      // 关闭当前标签页
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // 关闭左侧标签页
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // 关闭右侧标签页
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // 关闭其他标签页
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // 关闭全部标签页
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu };
}
