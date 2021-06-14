<template>
  <NrGrid ref="nrGridElRef" v-bind="nrGridOptions" />
  <NrModal ref="nrModalElRef" v-bind="nrModalOptions">
    <template #default>
      <ATabs v-bind="nrTabOptions" v-model:activeKey="activeKey">
        <ATabPane key="1" tab="基础信息">
          <BasicForm @register="registerForm" />
        </ATabPane>
      </ATabs>
    </template>
  </NrModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, onMounted } from 'vue';
  import { VxeGridInstance, VxeModalInstance } from 'vxe-table';
  import { useMessage } from '/@app/hooks/web';
  import {
    NrGridElRef,
    NrModalElRef,
    NrGridProps,
    NrModalProps,
  } from '/@app/components/@Ws/common';
  import { BasicForm, useForm } from '/@app/components/Form';
  import { toolbar, columns, schemas } from './data';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicForm },
    setup() {
      const { createMessage, createConfirm } = useMessage();

      const nrGridElRef = ref({} as NrGridElRef);
      const nrModalElRef = ref({} as NrModalElRef);

      let $menuGrid = {} as VxeGridInstance,
        $menuModal = {} as VxeModalInstance;

      onMounted(() => {
        $menuGrid = unref(nrGridElRef).gridElRef;
        $menuModal = unref(nrModalElRef).modalElRef;
      });

      const activeKey = ref('1');
      const nrTabOptions = reactive({
        size: 'small',
        tabBarGutter: 4,
        onTabClick: val => {
          console.log(val);
        },
      });

      // 表单注册
      const [registerForm, formActions] = useForm({ schemas });

      const nrModalOptions: NrModalProps = reactive({
        title: '菜单新增',
        onContinueButtonClick: params => {
          console.log(params);
          console.log('点击了保存继续按钮');
          // $menuModal.close();
          console.log(unref(activeKey));
        },
        onSaveButtonClick: params => {
          handleSubmit();
          console.log(params);
          // console.log('点击了保存按钮');
          // $menuModal.close();
        },
      });

      const nrGridOptions: NrGridProps = reactive({
        toolbar,
        columns,
        proxyConfig: {
          props: {
            result: 'result',
            total: 'page.total',
          },
          ajax: {
            // 接收 Promise
            query: ({ page }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = [
                    {
                      id: 1,
                      name: 'Test1',
                      nickname: 'T1',
                      role: 'Develop',
                      sex: 'Man',
                      age: 28,
                      address: 'Shenzhen',
                    },
                    {
                      id: 2,
                      name: 'Test1',
                      nickname: 'T1',
                      role: 'Develop',
                      sex: 'Man',
                      age: 28,
                      address: 'Shenzhen',
                    },
                    {
                      id: 3,
                      name: 'Test1',
                      nickname: 'T1',
                      role: 'Develop',
                      sex: 'Man',
                      age: 28,
                      address: 'Shenzhen',
                    },
                  ];
                  resolve({
                    page: {
                      total: list.length,
                    },
                    result: list.slice(
                      (page.currentPage - 1) * page.pageSize,
                      page.currentPage * page.pageSize
                    ),
                  });
                }, 100);
              });
            },
            // body 对象： { removeRecords }
            delete: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({});
                }, 100);
              });
            },
            // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
            save: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({});
                }, 100);
              });
            },
          },
        },
        onToolbarButtonClick: ({ code }) => {
          switch (code) {
            case 'add': {
              $menuModal.open();

              // const { insertRecords, removeRecords, updateRecords } = $grid.getRecordset();
              // VXETable.modal.message({
              //   content: `新增 ${insertRecords.length} 条，删除 ${removeRecords.length} 条，更新 ${updateRecords.length} 条`,
              //   status: 'success',
              // });
              break;
            }
            case 'edit': {
              break;
            }
            case 'del': {
              const checkedRecords = $menuGrid.getCheckboxRecords();

              if (checkedRecords.length == 0) {
                return createMessage.warning('请至少选择一条数据！');
              }

              createConfirm({
                iconType: 'warning',
                title: '消息提示',
                content: '您确定要删除所选记录吗？',
                onOk: async () => {
                  $menuGrid.removeCheckboxRow();
                  createMessage.success('数据删除成功！');
                },
              });

              console.log('点击了删除按钮');
              break;
            }
          }
        },
      });

      function handleSubmit() {
        formActions.validate().then(
          result => {
            console.log(result);
          },
          error => {
            formActions.validateErrorHandle(error);
          }
        );
      }

      return {
        nrGridElRef,
        nrModalElRef,
        nrGridOptions,
        nrModalOptions,
        activeKey,
        nrTabOptions,
        registerForm,
      };
    },
  });
</script>

<style lang="scss">
  $vxe-primary-color: '#0960bd';
</style>
