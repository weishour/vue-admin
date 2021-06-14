import type { ComputedRef } from 'vue';
import type { BasicTableProps, TableCustomRecord } from '../types/table';

import { unref } from 'vue';
import { isFunction } from '/@app/utils/common';

export function useTableStyle(propsRef: ComputedRef<BasicTableProps>, prefixCls: string) {
  function getRowClassName(record: TableCustomRecord, index: number) {
    const { striped, rowClassName } = unref(propsRef);
    if (!striped) return;
    if (rowClassName && isFunction(rowClassName)) {
      return rowClassName(record);
    }
    return (index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '';
  }

  return {
    getRowClassName,
  };
}
