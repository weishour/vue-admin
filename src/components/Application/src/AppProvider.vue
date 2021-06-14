<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue';
  import { createBreakpointListen } from '/@app/hooks/event';
  import { prefixCls } from '/@app/settings/design';
  import { useAppStore } from '/@app/store/modules';
  import { MenuModeEnum, MenuTypeEnum } from '/@app/enums';
  import { createAppProviderContext } from './useAppContext';

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
      /**
       * class 样式前缀
       */
      prefixCls: { type: String, default: prefixCls },
    },
    setup(props, { slots }) {
      const isMobile = ref(false);
      const isSetState = ref(false);

      const appStore = useAppStore();

      // 系统页面大小监听
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
        handleRestoreState();
      });

      const { prefixCls } = toRefs(props);

      // 将变量注入全局变量中
      createAppProviderContext({ prefixCls, isMobile });

      /**
       * 用于维护窗口更改前的状态
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true;

            const {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = appStore.getProjectConfig;

            appStore.setProjectConfig({
              menuSetting: {
                type: MenuTypeEnum.SIDEBAR,
                mode: MenuModeEnum.INLINE,
                split: false,
              },
            });

            // 设置页面缩小信息状态
            appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false;
            const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;

            appStore.setProjectConfig({
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            });
          }
        }
      }
      return () => slots.default?.();
    },
  });
</script>
