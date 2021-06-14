import type { Ref } from 'vue';
import type { VxeGridProps } from 'vxe-table';

import { unref } from 'vue';

export function useSlots(getBindValue: Ref<VxeGridProps>) {
  const toolbarButtonsSlot = unref(getBindValue)?.toolbarConfig?.slots?.buttons;
  const toolbarToolsSlot = unref(getBindValue)?.toolbarConfig?.slots?.tools;

  return {
    toolbarButtonsSlot,
    toolbarToolsSlot,
  };
}
