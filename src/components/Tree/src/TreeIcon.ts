import type { VNode, FunctionalComponent } from 'vue';

import { h } from 'vue';
import { isString } from '/@app/utils/common';
import { Icon } from '/@app/components/Icon';

export interface ComponentProps {
  icon: VNode | string;
}

export const TreeIcon: FunctionalComponent = ({ icon }: ComponentProps) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return Icon;
};
