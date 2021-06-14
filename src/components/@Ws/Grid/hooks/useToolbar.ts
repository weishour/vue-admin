import type { Ref, ComputedRef } from 'vue';
import { ref, unref, toRaw, computed, nextTick, onMounted } from 'vue';
import { VxeGridInstance, VxeToolbarPropTypes } from 'vxe-table';
import { translate } from '/@app/hooks/web';
import {
  ToolbarPropsType,
  BasicGridProps,
  CustomProps,
  SINGLE_ACTION,
  MULTIPLE_ACTION,
} from '/@app/components/@Ws/common';
import { merge, includes, isUndefined } from 'lodash-es';

export function useToolbar(
  getProps: ComputedRef<BasicGridProps>,
  gridElRef: Ref<VxeGridInstance>,
  emit: EmitType
) {
  let $grid = {} as VxeGridInstance;
  const checkedRecords = ref<any[]>([]);

  onMounted(async () => {
    await nextTick();
    $grid = unref(gridElRef);
  });

  const toolbarProps = computed((): CustomProps => {
    const buttons = handleActions(getProps, checkedRecords);

    return {
      toolbarConfig: {
        buttons,
        refresh: {
          query: params => {
            const result = $grid
              .commitProxy('reload')
              .catch(e => e)
              .then(() => {
                checkedRecords.value = $grid.getCheckboxRecords();

                emit('ws-toolbar-refresh', params);
              });

            return result;
          },
        },
      },
      // 单元格点击
      onCellClick: params => {
        const { column, row } = params;
        const checkedRecords = $grid.getCheckboxRecords();
        const recordsCount = ref(checkedRecords.length);
        const isSampleRowChecked =
          unref(recordsCount) == 1 && row?.id === unref(checkedRecords)[0]?.id;

        // 文本单元格点击处理
        if (!includes(['radio', 'checkbox'], column.type)) {
          // 避免同一单元格重复选中
          if (isSampleRowChecked) return;

          $grid.clearCheckboxRow();
          $grid.setCheckboxRow(row, true);

          // 手动触发onCheckboxChange选中改变事件
          $grid.dispatchEvent('checkbox-change', params);
        }
      },
      // 复选框选中改变事件
      onCheckboxChange: _ => {
        checkedRecords.value = $grid.getCheckboxRecords();
      },
      // 全选勾选事件
      onCheckboxAll: _ => {
        checkedRecords.value = $grid.getCheckboxRecords();
      },
      // 当鼠标范围选择内的行数改变事件
      onCheckboxRangeChange: _ => {
        checkedRecords.value = $grid.getCheckboxRecords();
      },
    };
  });

  return {
    toolbarProps,
  };
}

/**
 * 动作配置处理
 * @param propsRef
 * @returns
 */
function handleActions(
  propsRef: ComputedRef<BasicGridProps>,
  checkedRecords: Ref<any[]>
): VxeToolbarPropTypes.Buttons {
  const toolbar = unref(propsRef).toolbar,
    recordsCount = unref(checkedRecords).length,
    buttons = ref<VxeToolbarPropTypes.Buttons>([]);

  for (const action in toolbar) {
    const actionProp = toolbar[action];

    if (actionProp === false) continue;

    // 根据配置获取按钮初始设置
    let button = initButton(action, actionProp as ToolbarPropsType);

    // 根据mode处理按钮禁用状态
    button = handleButtonDisabled(action, button, actionProp as ToolbarPropsType, recordsCount);

    unref(buttons).push(button);
  }

  return toRaw(buttons).value;
}

/**
 * 默认按钮配置
 * @param action
 * @param actionProp
 * @returns button
 */
function initButton(
  action: string,
  actionProp: ToolbarPropsType
): VxeToolbarPropTypes.ButtonConfig {
  let name: string | number;
  let button: VxeToolbarPropTypes.ButtonConfig = {
    type: 'button',
    code: action,
    status: action,
    icon: `fa ac-${action}`,
    visible: true,
    disabled: false,
    round: false,
    circle: false,
    placement: 'bottom',
    destroyOnClose: false,
    transfer: false,
    dropdowns: [],
    buttonRender: undefined,
  };

  if (typeof actionProp === 'boolean') {
    name = translate(`common.${action}Text`, action);
  } else {
    const bname = actionProp?.name || action;
    name = translate(`common.${bname}Text`, bname);

    button = merge(button, actionProp, {
      code: actionProp?.code || action,
      status: actionProp?.status || action,
      icon: actionProp?.icon || `fa ac-${action}`,
    });
  }

  button.name = name;

  return button;
}

/**
 * 按钮禁用状态处理
 * @param action
 * @param button
 * @param actionProp
 * @param recordsCount
 * @returns
 */
function handleButtonDisabled(
  action: string,
  button: VxeToolbarPropTypes.ButtonConfig,
  actionProp: ToolbarPropsType,
  recordsCount: number
) {
  if (typeof actionProp === 'object' && !isUndefined(actionProp?.mode)) {
    if (actionProp?.mode == 'single') {
      if (unref(recordsCount) !== 1) button.disabled = true;
    } else if (actionProp?.mode == 'multiple') {
      if (unref(recordsCount) == 0) button.disabled = true;
    }
  } else {
    if (includes(SINGLE_ACTION, action)) {
      if (unref(recordsCount) !== 1) button.disabled = true;
    } else if (includes(MULTIPLE_ACTION, action)) {
      if (unref(recordsCount) == 0) button.disabled = true;
    }
  }

  return button;
}
