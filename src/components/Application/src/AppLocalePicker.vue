<template>
  <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    @menuEvent="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Dropdown>
</template>
<script lang="ts">
  import type { LocaleType } from '/@/types/config';
  import type { DropMenu } from '/@app/components/Dropdown';

  import { defineComponent, ref, watchEffect, unref, computed } from 'vue';
  import { Dropdown } from '/@app/components/Dropdown';
  import { useLocale } from '/@app/locales';
  import { localeList } from '/@app/settings/locale';
  import { Icon } from '/@app/components/Icon';

  export default defineComponent({
    name: 'AppLocalPicker',
    components: { Dropdown, Icon },
    props: {
      /**
       * 是否显示文本
       */
      showText: { type: Boolean, default: true },
      /**
       * 更改时是否刷新接口
       */
      reload: { type: Boolean },
    },
    setup() {
      const selectedKeys = ref<string[]>([]);

      const { changeLocale, getLocale } = useLocale();
      // const { refreshPage } = useTabs();

      const getLocaleText = computed(() => {
        const key = selectedKeys.value[0];
        if (!key) return '';
        return localeList.find(item => item.event === key)?.text;
      });

      watchEffect(() => {
        selectedKeys.value = [unref(getLocale)];
      });

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType);
        selectedKeys.value = [lang as string];

        // 刷新当前页面
        // await refreshPage();

        // 重新加载系统
        // props.reload && location.reload();
      }

      function handleMenuEvent(menu: DropMenu) {
        if (unref(getLocale) === menu.event) return;
        toggleLocale(menu.event as string);
      }

      return { localeList, handleMenuEvent, selectedKeys, getLocaleText };
    },
  });
</script>

<style lang="less">
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
