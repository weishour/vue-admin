import { reactive } from 'vue';
import { Empty } from 'ant-design-vue';
import VXETable from 'vxe-table';

// 创建一个空内容渲染
VXETable.renderer.add('EmptyData', {
  // 空内容模板
  renderEmpty(renderOpts, params) {
    const getBindValue = reactive({
      image: Empty.PRESENTED_IMAGE_SIMPLE,
    });

    return [<Empty {...getBindValue} />];
  },
});
