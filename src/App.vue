<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@app/components/Application';

  import { useTitle } from '/@app/hooks/web';
  import { useLocale } from '/@app/locales';

  export default defineComponent({
    name: 'App',
    components: { ConfigProvider, AppProvider },
    setup() {
      useTitle();

      // 支持多语言
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
    },
  });
</script>
