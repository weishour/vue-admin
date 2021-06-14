import type { FieldMapToTime, FormSchema } from './types/form';
import type { CSSProperties, PropType } from 'vue';
import type { ColEx } from './types';
import type { TableActionType } from '/@app/components/Table';
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';

import { propTypes } from '/@app/utils/common';

export const basicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 100,
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  compact: propTypes.bool,
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
    default: { span: 7 },
  },
  autoSetPlaceHolder: propTypes.bool.def(true),
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: propTypes.bool.def(false),
  submitOnReset: propTypes.bool,
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  // 禁用表单
  disabled: propTypes.bool,
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0,
  },
  // 是否显示收起展开按钮
  showAdvancedButton: propTypes.bool,
  // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date;
    },
  },
  // 校验信息是否加入 label
  rulesMessageJoinLabel: propTypes.bool.def(true),
  // 超过3行自动折叠
  autoAdvancedLine: propTypes.number.def(3),
  // 是否显示操作按钮
  showActionButtonGroup: propTypes.bool.def(false),
  // 操作列Col配置
  actionColOptions: Object as PropType<Partial<ColEx>>,
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: propTypes.bool.def(true),
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 自定义重置函数
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,
  // 以下为默认props
  hideRequiredMark: propTypes.bool,
  labelCol: Object as PropType<Partial<ColEx>>,
  // 表单布局
  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
  tableAction: {
    type: Object as PropType<TableActionType>,
  },
  // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
  wrapperCol: Object as PropType<Partial<ColEx>>,
  // 表示是否显示 label 后面的冒号
  colon: propTypes.bool.def(true),
  // 标签文本对齐方式
  labelAlign: propTypes.oneOf(['left', 'right']).def('right'),
  rowProps: {
    type: Object as PropType<RowProps>,
    default: {
      align: 'middle',
      justify: 'start',
      type: 'flex',
    },
  },
};
