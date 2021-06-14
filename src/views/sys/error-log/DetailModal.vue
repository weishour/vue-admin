<template>
  <BasicModal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <Description :data="info" @register="register" />
  </BasicModal>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from '/@app/model';

  import { defineComponent } from 'vue';
  import { BasicModal } from '/@app/components/Modal';
  import { Description, useDescription } from '/@app/components/Description';
  import { useI18n } from '/@app/hooks/web';
  import { getDescSchema } from './data';

  export default defineComponent({
    name: 'ErrorLogDetailModal',
    components: { BasicModal, Description },
    props: {
      info: {
        type: Object as PropType<ErrorLogInfo>,
        default: null,
      },
    },
    setup() {
      const { t } = useI18n();

      const [register] = useDescription({
        column: 2,
        schema: getDescSchema()!,
      });

      return {
        register,
        useI18n,
        t,
      };
    },
  });
</script>
