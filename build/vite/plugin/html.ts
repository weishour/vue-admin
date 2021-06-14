/**
 * 插件最小化和使用ejs模板语法在index.html。
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite';

import { GLOB_CONFIG_FILE_NAME } from '/@/build/constant';
import { darkBackgroundColor } from '/@/build/config/theme';
import html from 'vite-plugin-html';
import pkg from '/@/package.json';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // 将数据注入ejs模板
      injectData: {
        title: VITE_GLOB_APP_TITLE,
        darkBackgroundColor,
      },
      // 生成的app.config.js文件
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
  return htmlPlugin;
}
