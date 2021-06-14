type ColSpanType = number | string;
export interface ColEx {
  style?: any;
  /**
   * 栅格占位格数，为 0 时相当于 display: none
   * @default none (0)
   * @type ColSpanType
   */
  span?: ColSpanType;

  /**
   * 栅格顺序，flex 布局模式下有效
   * @default 0
   * @type ColSpanType
   */
  order?: ColSpanType;

  /**
   * flex 布局填充
   * @default none
   * @type ColSpanType
   */
  flex?: ColSpanType;

  /**
   * 栅格左侧的间隔格数，间隔内不可以有栅格
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType;

  /**
   * 栅格向右移动格数
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType;

  /**
   * 栅格向左移动格数
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType;

  /**
   * <576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;

  /**
   * ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType;
}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'SelectOptGroup'
  | 'TreeSelect'
  | 'Transfer'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate';
