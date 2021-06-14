import {
  VxeGridEventProps,
  VxeGridInstance,
  VxeGridProps,
  VxeToolbarPropTypes,
  VxeGridEvents,
  VxeGridDefines,
} from 'vxe-table';

export interface ActionProps {
  /**
   * 选择表格数据方式
   */
  mode?: 'single' | 'multiple';
}

export type ToolbarPropsType = boolean | (VxeToolbarPropTypes.ButtonConfig & ActionProps);

export type ToolbarProps = {
  [key in string]?: ToolbarPropsType;
};

export type NrGridProps = VxeGridProps &
  VxeGridEventProps & {
    toolbar?: ToolbarProps;
    onNrCellClick?: VxeGridEvents.CellClick;
    onNrToolbarRefresh?: (params: {}) => void;
  };

export interface NrGridElRef {
  gridElRef: VxeGridInstance;
  getBindValue: VxeGridProps;
}

export interface BasicGridProps {
  toolbar?: ToolbarProps;
}

export type CustomProps = VxeGridProps & {
  onCellClick?: (params: VxeGridDefines.CellClickEventParams) => void;
  onCheckboxChange?: (
    params: VxeGridDefines.CheckboxChangeEventParams | VxeGridDefines.CellClickEventParams
  ) => void;
  onCheckboxAll?: (params: VxeGridDefines.CheckboxAllEventParams) => void;
  onCheckboxRangeChange?: (params: VxeGridDefines.CheckboxRangeChangeEventParams) => void;
};
