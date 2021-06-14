<template>
  <vxe-modal ref="modalElRef" v-bind="getBindValue">
    <template #title>
      <slot name="title">{{ getBindValue.title }}</slot>
    </template>
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <template #default><slot></slot></template>
    <template #footer>
      <slot name="footer">
        <vxe-button
          status="info"
          :content="t('common.saveContinueText')"
          @click="$emit('continue-button-click', $event)"
        />
        <vxe-button
          status="success"
          :content="t('common.saveText')"
          @click="$emit('save-button-click', $event)"
        />
      </slot>
    </template>
  </vxe-modal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { VxeModalInstance, VxeModalProps } from 'vxe-table';
  import { useI18n } from '/@app/hooks/web';
  import { vxeSetup } from '/@app/settings/vxe';
  import { buildShortUUID } from '/@app/utils';
  import { merge, cloneDeep } from 'lodash-es';

  export default defineComponent({
    name: 'NrModal',
    emits: ['continue-button-click', 'save-button-click'],
    setup(props, { attrs }) {
      const { t } = useI18n();

      const modalElRef = ref({} as VxeModalInstance);
      const propsRef = ref<Partial<VxeModalProps>>({});

      const getProps = computed((): VxeModalProps => {
        return merge(cloneDeep({ ...props }), { ...unref(propsRef) }) as VxeModalProps;
      });

      const getBindValue = computed((): VxeModalProps => {
        return merge(
          cloneDeep(vxeSetup.modal),
          {
            id: buildShortUUID('ws-modal'),
            className: 'no-padding',
            ...attrs,
          },
          { ...unref(getProps) }
        );
      });

      return { t, modalElRef, getBindValue };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-ws-modal';

  .no-padding {
    .vxe-modal--content {
      padding: 0 !important;
    }
  }
</style>
