import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [];
Object.keys(modules).forEach(key => {
  if (key.includes('/_')) return;

  mockModules.push(...modules[key].default);
});

/**
 * 在生产环境中使用。需要手动导入所有模块
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
