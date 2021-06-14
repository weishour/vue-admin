import { createAsyncComponent } from '/@app/utils/factory';

export const BasicDragVerify = createAsyncComponent(() => import('./src/DragVerify'));
export const RotateDragVerify = createAsyncComponent(() => import('./src/ImgRotate'));

export * from './src/types';
