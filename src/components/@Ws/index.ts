import './common';

import { BasicGrid } from './Grid';
import { BasicModal } from './Modal';

import { App } from 'vue';

const compList = [BasicGrid, BasicModal];

export function registerNrComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
