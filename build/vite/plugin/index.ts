import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import purgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';

import { configHtmlPlugin } from './html';
import { configPwaConfig } from './pwa';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configThemePlugin } from './theme';
import { configImageminPlugin } from './imagemin';
import { configSvgIconsPlugin } from './svgSprite';
import { configHmrPlugin } from './hmr';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  // 开发环境启用
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy (为打包后的文件提供传统浏览器兼容性支持)
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html (支持在index.html使用ejs模板语法)
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-windicss (集成windicss)
  vitePlugins.push(windiCSS());

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // vite-plugin-style-import (按需引入组件库样式)
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme (系统主题切换)
  vitePlugins.push(configThemePlugin(isBuild));

  // 以下插件只能在生产环境中工作
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
