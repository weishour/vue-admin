export * from './ripple';
export * from './clickOutside';
export * from './loading';
export * from './permission';
export * from './repeatClick';

/**
 * 配置和注册全局指令
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
}
