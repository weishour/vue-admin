/**
 * 组件库样式按需引入
 * https://github.com/anncwb/vite-plugin-style-import
 */

import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return [];
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: name => `ant-design-vue/es/${name}/style/index`,
      },
      {
        libraryName: 'vxe-table',
        esModule: true,
        resolveComponent: name => `vxe-table/es/${name}`,
        resolveStyle: name => `vxe-table/es/${name}/style.css`,
      },
    ],
  });
  return styleImportPlugin;
}
