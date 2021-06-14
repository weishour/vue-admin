<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';
  import { Icon } from '/@app/components/Icon';
  import { useDesign } from '/@app/hooks/web/useDesign';
  import { useHeaderSetting, useMenuSetting } from '/@app/hooks/setting';
  import { triggerWindowResize } from '/@app/utils/event';

  export default defineComponent({
    name: 'FoldButton',
    components: { Icon },
    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { getShowMenu, setMenuSetting } = useMenuSetting();
      const { getShowHeader, setHeaderSetting } = useHeaderSetting();

      const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

      const getIcon = computed(() =>
        unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'
      );

      function handleFold() {
        const isUnFold = unref(getIsUnFold);
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold,
        });
        setHeaderSetting({ show: isUnFold });
        triggerWindowResize();
      }

      return { prefixCls, getIcon, handleFold };
    },
  });
</script>
