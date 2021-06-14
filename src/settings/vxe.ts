// 用于配置某些组件的常规配置，而无需修改组件
import type { VXETableSetupOptions } from 'vxe-table';

export const vxeSetup: VXETableSetupOptions = {
  // 弹窗默认配置
  modal: {
    // 窗口的宽度
    width: 960,
    // 窗口的高度
    height: 600,
    // 窗口的最小宽度
    minWidth: 600,
    // 窗口的最小宽度
    minHeight: 300,
    // 标题是否显示最大化与还原按钮
    showZoom: false,
  },
  // 表格默认配置
  grid: {
    // 表格的高度
    height: 'auto',
    // 是否显示表尾
    showFooter: false,
    // 工具栏配置
    toolbarConfig: {
      // 配套的样式
      perfect: true,
      // 导入按钮
      import: true,
      // 导出按钮
      export: true,
      // 打印按钮
      print: true,
      // 刷新按钮
      refresh: true,
      // 是否允许最大化显示
      zoom: true,
      // 自定义列配置
      custom: true,
    },
    // 列的默认参数
    columnConfig: {
      // 列的默认宽度
      width: 100,
      // 列的默认最小宽度
      minWidth: 35,
    },
    // 列宽拖动配置项
    resizableConfig: {
      // 列宽拖动的最小宽度
      minWidth: 35,
    },
    // 排序配置项
    sortConfig: {
      // 默认排序
      defaultSort: [
        {
          // 列字段名
          field: 'id',
          // 排序方式
          order: 'desc',
        },
      ],
      // 触发方式
      trigger: 'default',
    },
    // 复选框配置项
    checkboxConfig: {
      // 是否显示全选按钮（如果 checkStrictly=true 则默认为 false）
      showHeader: true,
      // 触发方式
      trigger: 'cell',
      // 高亮勾选行
      highlight: true,
      // 开启复选框范围选择功能
      range: true,
    },
    // 筛选配置项
    filterConfig: {
      // 所有列是否使用服务端筛选
      remote: false,
    },
    // tooltip 配置项
    tooltipConfig: {
      // 所有单元格开启 tooltip 显示
      showAll: false,
      // tooltip 的主题颜色
      theme: 'light',
      // 鼠标是否可进入到 tooltip 中
      enterable: true,
    },
    // 分页配置项
    pagerConfig: {
      // 自定义布局
      layouts: [
        'PrevJump',
        'PrevPage',
        'FullJump',
        'PageCount',
        'NextPage',
        'NextJump',
        'Sizes',
        'Total',
      ],
      // 当前页
      currentPage: 1,
      // 每页大小
      pageSize: 20,
      // 每页大小选项列表
      pageSizes: [10, 15, 20, 50, 100],
      // 对齐方式
      align: 'center',
      // 带边框
      border: false,
      // 带背景颜色
      background: true,
      // 配套的样式
      perfect: false,
    },
    // 可编辑配置项
    editConfig: {
      // 触发方式
      trigger: 'dblclick',
      // 编辑模式
      mode: 'row',
      // 是否显示列头编辑图标
      showIcon: false,
      // 是否显示单元格新增与修改状态
      showStatus: true,
      // 是否显示必填字段的红色星号
      showAsterisk: true,
      // 该方法的返回值用来决定该单元格是否允许编辑
      activeMethod() {
        return false;
      },
    },
    // 校验配置项
    validConfig: {
      // 是否自动定位到校验不通过的单元格
      autoPos: true,
      // 是否显示错误显示
      showMessage: true,
    },
    // 自定义列配置项
    customConfig: {
      // 是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）
      storage: {
        // 启用显示/隐藏列状态
        visible: false,
        // 启用列宽状态
        resizable: false,
      },
    },
    // 空内容渲染配置项
    emptyRender: {
      // 渲染器名称
      name: 'EmptyData',
    },
  },
};

export default vxeSetup;
