import type { ContextMenuItem } from '/@app/components/ContextMenu';

import { onUnmounted, getCurrentInstance } from 'vue';
import { createContextMenu, destroyContextMenu } from '/@app/components/ContextMenu';

export type { ContextMenuItem };
export function useContextMenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
