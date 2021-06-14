import '/@app/design/index.less';

// 注册 windi
import 'virtual:windi.css';
// 注册 icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { setupStore } from '/@app/store';
import { initAppConfigStore, setupErrorHandle } from '/@app/logics';
import { registerGlobComp, registerNrComp } from '/@app/components';
import { registerVxe } from '/@app/plugin';
import { setupI18n } from '/@app/locales';
import { router, setupRouter } from '/@app/router';
import { setupRouterGuard } from '/@app/router/guard';
import { setupGlobDirectives } from '/@app/directives';
import App from '/@app/App.vue';

if (import.meta.env.DEV) import('ant-design-vue/dist/antd.less');

async function bootstrap() {
  const app = createApp(App);

  // 设置状态管理
  setupStore(app);

  // 初始化系统内部配置
  initAppConfigStore();

  // 注册全局组件
  registerGlobComp(app);

  // 注册vxe组件
  registerVxe(app);

  // 注册Nr组件
  registerNrComp(app);

  // 设置多语言
  await setupI18n(app);

  // 设置路由
  setupRouter(app);

  // 设置路由守卫
  setupRouterGuard();

  // 设置全局指令
  setupGlobDirectives(app);

  // 设置全局错误处理
  setupErrorHandle(app);

  // 当路由器完成初始化导航之后进行根组件的挂载
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
