import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';

import { generateModifyVars } from '/@/build/generate/generateModifyVars';
import { pathResolve, wrapperEnv } from '/@/build/utils';
import { createProxy } from '/@/build/vite/proxy';
import { createVitePlugins } from '/@/build/vite/plugin';

import pkg from '/@/package.json';
import moment from 'moment';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

/**
 * @description: https://vitejs.dev/config/
 */
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => /xxxx
        {
          find: /\/@\//,
          replacement: process.cwd() + '/',
        },
        // /@app/xxxx => src/xxxx
        {
          find: /\/@app\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      // 监听所有本地ip
      host: true,
      port: VITE_PORT,
      // 从.env加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 用于在生产环境中console
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // 关闭brotliSize显示可以略微减少包装时间
      brotliSize: false,
      chunkSizeWarningLimit: 3000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
        scss: {
          additionalData: '@import "./src/design/vxe/index.scss";',
        },
      },
    },
    // 项目使用的vite插件
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ],
      exclude: ['vue-demi', 'consolidate'],
    },
  };
};
