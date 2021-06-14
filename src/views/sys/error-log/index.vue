<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <BasicTable @register="register" class="error-handle-table">
      <template #toolbar>
        <a-button @click="fireVueError" type="primary">
          {{ t('sys.errorLog.fireVueError') }}
        </a-button>
        <a-button @click="fireResourceError" type="primary">
          {{ t('sys.errorLog.fireResourceError') }}
        </a-button>
        <a-button @click="fireAjaxError" type="primary">
          {{ t('sys.errorLog.fireAjaxError') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            { label: t('sys.errorLog.tableActionDesc'), onClick: handleDetail.bind(null, record) },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import type { ErrorLogInfo } from '/@app/model';

  import { defineComponent, watch, ref, nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@app/components/Table';
  import { useModal } from '/@app/components/Modal';
  import { useI18n, useMessage } from '/@app/hooks/web';
  import { useErrorLogStore } from '/@app/store/modules';
  // import { fireErrorApi } from '/@app/api/demo/error';
  import { cloneDeep } from 'lodash-es';
  import { getColumns } from './data';
  import DetailModal from './DetailModal.vue';

  export default defineComponent({
    name: 'ErrorHandler',
    components: { DetailModal, BasicTable, TableAction },
    setup() {
      const rowInfo = ref<ErrorLogInfo>();
      const imgList = ref<string[]>([]);

      const { t } = useI18n();
      const errorLogStore = useErrorLogStore();
      const [register, { setTableData }] = useTable({
        title: t('sys.errorLog.tableTitle'),
        columns: getColumns(),
        actionColumn: {
          width: 80,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const [registerModal, { openModal }] = useModal();

      watch(
        () => errorLogStore.getErrorLogInfoList,
        list => {
          nextTick(() => {
            setTableData(cloneDeep(list));
          });
        },
        {
          immediate: true,
        }
      );
      const { createMessage } = useMessage();
      if (import.meta.env.DEV) {
        createMessage.info(t('sys.errorLog.enableMessage'));
      }
      // 查看详情
      function handleDetail(row: ErrorLogInfo) {
        rowInfo.value = row;
        openModal(true);
      }

      function fireVueError() {
        throw new Error('fire vue error!');
      }

      function fireResourceError() {
        imgList.value.push(`${new Date().getTime()}.png`);
      }

      async function fireAjaxError() {
        // await fireErrorApi();
      }

      return {
        register,
        registerModal,
        handleDetail,
        fireVueError,
        fireResourceError,
        fireAjaxError,
        imgList,
        rowInfo,
        t,
      };
    },
  });
</script>
