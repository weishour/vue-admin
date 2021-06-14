<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { isFunction } from '/@app/utils/common';
  import { useI18n } from '/@app/hooks/web';
  import { useCountdown } from './useCountdown';

  const props = {
    value: { type: [Object, Number, String, Array] },
    count: { type: Number, default: 60 },
    beforeStartFunc: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  };

  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    props,
    setup(props) {
      const loading = ref(false);

      const { currentCount, isStart, start, reset } = useCountdown(props.count);
      const { t } = useI18n();

      const getButtonText = computed(() => {
        return !unref(isStart)
          ? t('component.countdown.normalText')
          : t('component.countdown.sendText', [unref(currentCount)]);
      });

      watchEffect(() => {
        props.value === undefined && reset();
      });
      /**
       * @description: 执行前判断是否有外部函数，执行后决定是否启动
       */
      async function handleStart() {
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart };
    },
  });
</script>
