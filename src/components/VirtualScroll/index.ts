import { createAsyncComponent } from '/@app/utils/factory';

export const VScroll = createAsyncComponent(() => import('./src/VirtualScroll'));
