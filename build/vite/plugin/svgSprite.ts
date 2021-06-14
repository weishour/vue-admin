/**
 * 用于生成 svg 雪碧图。
 * https://github.com/anncwb/vite-plugin-svg-icons
 */
import SvgIconsPlugin from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = SvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
