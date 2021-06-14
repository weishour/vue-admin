export const REDIRECT_NAME = 'Redirect';
export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const EXCEPTION_COMPONENT = () => import('/@app/views/sys/exception/Exception.vue');

/**
 * @description: 默认布局
 */
export const LAYOUT = () => import('/@app/layouts/default/index.vue');

/**
 * @description: 上级布局
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
};
