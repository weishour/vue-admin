import { VxeGridPropTypes } from 'vxe-table';
import { FormSchema } from '/@app/components/Form';
import { ToolbarProps } from '/@app/components/@Ws/common';

/* 工具栏 */
export const toolbar: ToolbarProps = {
  add: true,
  edit: true,
  del: true,
  audit: true,
  noaudit: true,
};

/* 表格列 */
export const columns: VxeGridPropTypes.Columns = [
  { type: 'seq', width: 45 },
  { type: 'checkbox', width: 35 },
  { field: 'name', title: '菜单名称', width: 120, sortable: true },
  { field: 'nickname', title: '图标' },
  { field: 'role', title: '组件' },
  { field: 'age', title: '排序' },
  { field: 'address', title: '状态', showOverflow: true },
];

/* 表单字段 */
export const schemas: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    componentProps: ({ formActionType, formModel, schema }) => {
      return {
        onChange: (e: any) => {
          console.log(e);
        },
        onPressEnter: (e: any) => {
          console.log(e);
          console.log(formActionType.getFormElRef());
          console.log(formActionType, formModel, schema);
        },
      };
    },
    required: true,
  },
  {
    field: 'parentMenu',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'menuName',
        key: 'id',
        value: 'id',
      },
    },
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
  },
  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    required: true,
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    colProps: {
      offset: 1,
    },
  },
  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },
  {
    field: 'show',
    label: '是否显示',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    colProps: {
      offset: 1,
    },
  },
];
