<template>
  <!-- <BasicForm
    :labelWidth="100"
    :schemas="schemas"
    :actionColOptions="{ span: 24 }"
    @submit="handleSubmit"
  /> -->
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useMessage } from '/@app/hooks/web';
  import { BasicForm, FormSchema, useForm } from '/@app/components/Form/index';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '菜单名称',
      required: true,
      colProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'parentMenu',
      label: '上级菜单',
      component: 'TreeSelect',
      colProps: {
        span: 8,
      },
      componentProps: {
        replaceFields: {
          title: 'menuName',
          key: 'id',
          value: 'id',
        },
        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'orderNo',
      label: '排序',
      component: 'InputNumber',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'icon',
      label: '图标',
      component: 'IconPicker',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'icon',
      label: '图标',
      component: 'IconPicker',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'icon',
      label: '图标',
      component: 'IconPicker',
      required: true,
      colProps: {
        span: 8,
      },
    },
  ];

  export default defineComponent({
    name: 'MenuForm',
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage();

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: schemas,
        showActionButtonGroup: false,
        actionColOptions: { span: 24 },
      });

      return {
        registerForm,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
      };
    },
  });
</script>
