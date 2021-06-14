<template>
  <vxe-grid ref="gridElRef" v-bind="getBindValue">
    <!-- 工具栏按钮插槽 -->
    <template #[toolbarButtonsSlot]>
      <slot :name="toolbarButtonsSlot"></slot>
    </template>
    <!-- 工具栏右侧工具列表插槽 -->
    <template #[toolbarToolsSlot]>
      <slot :name="toolbarToolsSlot"></slot>
    </template>
  </vxe-grid>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { VxeGridInstance, VxeGridProps } from 'vxe-table';
  import { vxeSetup } from '/@app/settings/vxe';
  import { ToolbarProps, BasicGridProps } from '/@app/components/@Ws/common';
  import { buildShortUUID } from '/@app/utils';
  import { merge, cloneDeep } from 'lodash-es';
  import { useSlots, useToolbar } from '../hooks';

  export default defineComponent({
    name: 'NrGrid',
    components: {},
    props: {
      toolbar: {
        type: Object as PropType<ToolbarProps>,
        required: true,
      },
    },
    emits: ['ws-toolbar-refresh'],
    setup(props, { attrs, emit }) {
      const gridElRef = ref({} as VxeGridInstance);
      const innerPropsRef = ref<Partial<BasicGridProps>>();

      const getProps = computed(() => {
        return merge(cloneDeep({ ...props }), { ...unref(innerPropsRef) }) as BasicGridProps;
      });

      async function setProps(props: Partial<BasicGridProps>): Promise<void> {
        innerPropsRef.value = merge(
          cloneDeep(getBindValue),
          { ...unref(innerPropsRef) },
          { ...props }
        );
      }

      const { toolbarProps } = useToolbar(getProps, gridElRef, emit);

      const getBindValue = computed((): VxeGridProps => {
        const bindValue = merge(
          cloneDeep(vxeSetup.grid),
          {
            id: buildShortUUID('ws-grid'),
            ...attrs,
            ...unref(toolbarProps),
          },
          { ...unref(getProps) }
        );

        return bindValue;
      });

      console.log(getBindValue);

      const { toolbarButtonsSlot, toolbarToolsSlot } = useSlots(getBindValue);

      return {
        gridElRef,
        getBindValue,
        setProps,
        toolbarButtonsSlot,
        toolbarToolsSlot,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-grid';
</style>
