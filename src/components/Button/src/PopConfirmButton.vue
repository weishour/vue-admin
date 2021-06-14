<script lang="ts">
  import { defineComponent, h, unref, computed } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { extendSlots } from '/@app/utils';
  import { useAttrs } from '/@app/hooks/core';
  import { useI18n } from '/@app/hooks/web';
  import { omit } from 'lodash-es';
  import BasicButton from './BasicButton.vue';

  const props = {
    /**
     * Whether to enable the drop-down menu
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true,
    },
  };

  export default defineComponent({
    name: 'PopButton',
    components: { Popconfirm, BasicButton },
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const { t } = useI18n();
      const attrs = useAttrs();

      // 获取继承绑定值
      const getBindValues = computed(() => {
        const popValues = Object.assign(
          {
            okText: t('common.okText'),
            cancelText: t('common.cancelText'),
          },
          { ...props, ...unref(attrs) }
        );
        return popValues;
      });

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon');
        const Button = h(BasicButton, bindValues, extendSlots(slots));

        // 如果未启用，则为正常按钮
        if (!props.enable) {
          return Button;
        }

        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>
