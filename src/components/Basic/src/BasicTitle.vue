<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :text="helpMessage" />
  </span>
</template>
<script lang="ts">
  import type { PropType } from 'vue';

  import { defineComponent, computed } from 'vue';
  import { useDesign } from '/@app/hooks/web';
  import BasicHelp from './BasicHelp.vue';

  export default defineComponent({
    name: 'BasicTitle',
    components: { BasicHelp },
    props: {
      /**
       * 帮助文本列表或字符串
       * @default: ''
       */
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
        default: '',
      },
      /**
       * 是否色块在标题的左侧
       * @default: false
       */
      span: { type: Boolean },
      /**
       * 是否默认文本，即不加粗
       * @default: false
       */
      normal: { type: Boolean },
    },
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-title');

      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal },
      ]);
      return { prefixCls, getClass };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {
    position: relative;
    display: flex;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: @text-color-base;
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      background-color: @primary-color;
      content: '';
    }

    &-help {
      margin-left: 10px;
    }
  }
</style>
