import { computed, unref } from 'vue';

import { useAppStore } from '/@app/store/modules';

import { useRouter } from 'vue-router';

/**
 * @description: 全屏显示内容
 */
export const useFullContent = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const { currentRoute } = router;

  // 是否不显示菜单而全屏显示内容
  const getFullContent = computed(() => {
    // 查询参数时，当地址栏中显示完整参数时，显示全屏
    const route = unref(currentRoute);
    const query = route.query;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    // 返回到配置文件中的配置
    return appStore.getProjectConfig.fullContent;
  });

  return { getFullContent };
};
