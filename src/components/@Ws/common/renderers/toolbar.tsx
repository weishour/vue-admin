import { reactive, unref } from 'vue';
import VXETable from 'vxe-table';

// 创建一个简单的工具栏-左侧按钮渲染
VXETable.renderer.add('ToolbarButton', {
  renderToolbarButton(renderOpts, params) {
    const getBindValue = reactive({
      name: '新增',
      code: 'add',
      status: 'add',
      icon: 'fa ac-add',
    });

    return [
      <vxe-button {...getBindValue}> {unref(getBindValue).name} </vxe-button>,
      <vxe-button {...getBindValue}> {unref(getBindValue).name} </vxe-button>,
    ];
  },
});
