import { createAsyncComponent } from '/@app/utils/factory';
export const MarkDown = createAsyncComponent(() => import('./src/Markdown.vue'));

export * from './src/types';
