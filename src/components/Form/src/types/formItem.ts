import type { NamePath } from 'ant-design-vue/lib/form/interface';
import type { ColProps } from 'ant-design-vue/lib/grid/Col';
import type { VNodeChild } from 'vue';

export interface FormItem {
  /**
   * 与标签一起使用，是否显示:在标签文本之后。
   * @default true
   * @type boolean
   */
  colon?: boolean;

  /**
   * 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
   * @type any (string | slot)
   */
  extra?: string | VNodeChild | JSX.Element;

  /**
   * 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
   * @default false
   * @type boolean
   */
  hasFeedback?: boolean;

  /**
   * 提示信息，如不设置，则会根据校验规则自动生成
   * @type any (string | slot)
   */
  help?: string | VNodeChild | JSX.Element;

  /**
   * label 标签的文本
   * @type any (string | slot)
   */
  label?: string | VNodeChild | JSX.Element;

  /**
   * label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
   * @type Col
   */
  labelCol?: ColProps;

  /**
   * 是否必填，如不设置，则会根据校验规则自动生成
   * @default false
   * @type boolean
   */
  required?: boolean;

  /**
   * 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
   * @type string
   */
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';

  /**
   * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
   * @type Col
   */
  wrapperCol?: ColProps;
  /**
   * 设置子元素 label htmlFor 属性
   */
  htmlFor?: string;
  /**
   * 标签文本对齐方式
   */
  labelAlign?: 'left' | 'right';
  /**
   * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
   */
  name?: NamePath;
  /**
   * 表单验证规则
   */
  rules?: object | object[];
  /**
   * 是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联，参见下方注意事项
   */
  autoLink?: boolean;
  /**
   * 当某一规则校验不通过时，是否停止剩下的规则的校验。
   */
  validateFirst?: boolean;
  /**
   * 设置字段校验的时机
   */
  validateTrigger?: string | string[] | false;
}
