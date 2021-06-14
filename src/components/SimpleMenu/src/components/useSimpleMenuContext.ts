import type { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@app/hooks/core';
import { Mitt } from '/@app/utils/common';

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Mitt;
  activeName: Ref<string | number>;
}

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol();

export function createSimpleRootMenuContext(context: SimpleRootMenuContextProps) {
  return createContext<SimpleRootMenuContextProps>(context, key, { readonly: false, native: true });
}

export function useSimpleRootMenuContext() {
  return useContext<SimpleRootMenuContextProps>(key);
}
