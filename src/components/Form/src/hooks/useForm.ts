import type { NamePath, ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
import type { DynamicProps } from '/@app/model';
import type { FormProps, FormActionType, UseFormReturnType, FormSchema } from '../types/form';

import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import { useMessage } from '/@app/hooks/web';
import { isProdMode, error, getDynamicProps } from '/@app/utils';
import { filter, includes } from 'lodash-es';

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;

type Props = Partial<DynamicProps<FormProps>>;

export function useForm(props?: Props): UseFormReturnType {
  const { createMessage } = useMessage();
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formElRef = ref<ComponentRef>(null);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType, getFormElRef) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadedRef.value = null;
        formElRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;
    formElRef.value = getFormElRef.value;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods: FormActionType = {
    // 获取表单实例
    getFormElRef: () => formElRef,
    // 滚动到对应字段位置
    scrollToField: async (name: NamePath, options?: ScrollOptions | undefined) => {
      const form = await getForm();
      form.scrollToField(name, options);
    },
    // 设置表单 Props
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      form.setProps(formProps);
    },
    // 更新表单的 schema
    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.updateSchema(data);
    },
    // 重置表单的 schema
    resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      form.resetSchema(data);
    },
    // 清空校验
    clearValidate: async (name?: string | string[]) => {
      const form = await getForm();
      form.clearValidate(name);
    },
    // 重置表单值
    resetFields: async () => {
      getForm().then(async form => {
        await form.resetFields();
      });
    },
    // 根据 field 删除 Schema
    removeSchemaByFiled: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByFiled(field);
    },

    // 获取表单值
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },
    // 设置表单字段值
    setFieldsValue: async <T>(values: T) => {
      const form = await getForm();
      form.setFieldsValue<T>(values);
    },
    // 插入到指定 filed 后面，如果没传指定 field，则插入到最后.当 first=true 时插入到第一个位置
    appendSchemaByField: async (
      schema: FormSchema,
      prefixField: string | undefined,
      first: boolean
    ) => {
      const form = await getForm();
      form.appendSchemaByField(schema, prefixField, first);
    },
    // 提交表单
    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },
    // 校验表单
    validate: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validate(nameList);
    },
    // 校验指定表单项
    validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validateFields(nameList);
    },
    // 校验错误处理
    validateErrorHandle: (error: ValidateErrorEntity) => {
      const formElRef = methods.getFormElRef() as any;
      const errorFields = error.errorFields.map(errorField => {
        return {
          name: errorField.name[0],
          error: errorField.errors[0],
        };
      });

      // 表单项自动聚焦
      const errorFieldNames = error.errorFields.map(errorField => errorField.name[0]);
      const focusElFields = filter(
        props?.schemas as FormSchema[],
        schema =>
          includes(errorFieldNames, schema.field) &&
          includes(['Input', 'InputNumber'], schema.component)
      );
      const errorFieldProp = unref(formElRef)?.getFieldsByNameList(focusElFields[0]?.field)[0];
      const inputEl = unref(errorFieldProp).$el.querySelector('input');

      if (inputEl && focusElFields.length > 0) inputEl?.focus();

      // 消息提示
      // createMessage.error(
      //   focusElFields.length > 0 ? unref(errorFieldProp).validateMessage : errorFields[0].error
      // );

      return errorFieldProp;
    },
  };

  return [register, methods];
}
