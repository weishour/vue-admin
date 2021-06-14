import type { NamePath, RuleObject, ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
import type { VNode, CSSProperties, Ref } from 'vue';
import type { ButtonProps as AntdButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { FormItem } from './formItem';
import type { ColEx, ComponentType } from './index';
import type { TableActionType } from '/@app/components/Table/src/types/table';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

export interface FormActionType {
  getFormElRef: () => unknown;
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
  validateErrorHandle: (error: ValidateErrorEntity) => any;
}

export type RegisterFn = (formInstance: FormActionType, tableElRef: Ref<ComponentRef>) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];

export interface FormProps {
  // 表单布局
  layout?: 'vertical' | 'inline' | 'horizontal';
  // 表单数据对象
  model?: Recordable;
  // 扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用
  labelWidth?: number | string;
  // label 标签的文本对齐方式
  labelAlign?: 'left' | 'right';
  // 整个表单的行配置
  rowProps?: RowProps;
  // 在重置时提交表单
  submitOnReset?: boolean;
  // 整个表单通用 LabelCol 配置
  labelCol?: Partial<ColEx>;
  // 整个表单通用 wrapperCol 配置
  wrapperCol?: Partial<ColEx>;
  // 配置所有 Row 的 style 样式
  baseRowStyle?: CSSProperties;
  // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
  baseColProps?: Partial<ColEx>;
  // 表单配置，见下方 FormSchema 配置
  schemas?: FormSchema[];
  // 额外传递到子组件的参数 values
  mergeDynamicData?: Recordable;
  // 紧凑类型表单，减少 margin-bottom
  compact?: boolean;
  // 空白行格,可以是数值或者 col 对象 数
  emptySpan?: number | Partial<ColEx>;
  // 向表单内所有组件传递 size 参数,自定义组件需自行实现 size 接收
  size?: 'default' | 'small' | 'large';
  // 向表单内所有组件传递 disabled 属性，自定义组件需自行实现 disabled 接收
  disabled?: boolean;
  // 用于将表单内时间区域的应设成 2 个字段,见下方说明
  fieldMapToTime?: FieldMapToTime;
  // 自动设置表单内组件的 placeholder，自定义组件需自行实现
  autoSetPlaceHolder?: boolean;
  // 按回车输入自动提交
  autoSubmitOnEnter?: boolean;
  // 如果表单项有校验，会自动生成校验信息，该参数控制是否将字段中文名字拼接到自动生成的信息后方
  rulesMessageJoinLabel?: boolean;
  // 是否显示收起展开按钮
  showAdvancedButton?: boolean;
  // 是否聚焦第一个输入框，只在第一个表单项为 input 的时候作用
  autoFocusFirstItem?: boolean;
  // 如果 showAdvancedButton 为 true，超过指定行数行默认折叠
  autoAdvancedLine?: number;
  // 是否显示操作按钮(重置/提交)
  showActionButtonGroup?: boolean;
  // 重置按钮配置
  resetButtonOptions?: Partial<ButtonProps>;
  // 确认按钮配置
  submitButtonOptions?: Partial<ButtonProps>;
  // 操作按钮外层 Col 组件配置，如果开启 showAdvancedButton，则不用设置，具体见下方 actionColOptions
  actionColOptions?: Partial<ColEx>;
  // 是否显示重置按钮
  showResetButton?: boolean;
  // 是否显示提交按钮
  showSubmitButton?: boolean;
  // 自定义重置按钮逻辑
  resetFunc?: () => Promise<void>;
  // 自定义提交按钮逻辑
  submitFunc?: () => Promise<void>;
  transformDateFunc?: (date: any) => string;
  // 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效)
  colon?: boolean;
}
export interface FormSchema {
  // 字段名称
  field: string;
  // 表单更新事件名称
  changeEvent?: string;
  // v-model绑定的变量名默认值
  valueField?: string;
  // 标签名称
  label: string;
  // 二级标签名灰色
  subLabel?: string;
  // 标签名右侧温馨提示
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  // 标签名右侧温馨提示组件 props
  helpComponentProps?: Partial<HelpComponentProps>;
  // 标签宽度，如果它被传递，itemProps配置的labelCol和WrapperCol将无效
  labelWidth?: string | number;
  // 使用formModel全局设置禁用labelWidth的调整，手动设置labelCol和wrapperCol
  disabledLabelWidth?: boolean;
  // 渲染的组件类型
  component: ComponentType;
  // 所渲染的组件的 props
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  // 简化 rules 配置，为 true 则转化成 [{required:true}]
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 后缀
  suffix?: string | number | ((values: RenderCallbackParams) => string | number);
  // 校验规则
  rules?: Rule[];
  // 校验信息是否加入 label
  rulesMessageJoinLabel?: boolean;
  // Form.Item配置
  itemProps?: Partial<FormItem>;
  // 在Form.Item外的col配置
  colProps?: Partial<ColEx>;
  // 所渲渲染组件的初始值
  defaultValue?: any;
  // 是否展开
  isAdvanced?: boolean;
  // Matching details components
  span?: number;
  // 动态判断当前组件是否显示,js 控制，会删除 dom
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 动态判断当前组件是否显示,css 控制，不会删除 dom
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 自定义渲染组件
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
  // 自定义渲染组件（需要自行包含 formItem）
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
  // 自定义渲染组内部的 slot
  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string;
  // 自定义 slot，渲染组件
  slot?: string;
  // 自定义 slot，渲染组件 （需要自行包含 formItem）
  colSlot?: string;
  // 动态判断当前组件是否禁用
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 动态判断返回当前组件的校验规则
  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
}
export interface HelpComponentProps {
  maxWidth: string;
  // 是否显示序号
  showIndex: boolean;
  // 文本列表
  text: any;
  // 颜色
  color: string;
  // 字体大小
  fontSize: string;
  icon: string;
  absolute: boolean;
  // 定位
  position: any;
}
