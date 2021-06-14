import { genMessage } from '/@app/utils';
import { merge } from 'lodash-es';
import antdLocale from 'ant-design-vue/es/locale/en_US';
import vxeLocale from 'vxe-table/lib/locale/lang/en-US';
import momentLocale from 'moment/dist/locale/eu';

const modules = import.meta.globEager('./en/**/*.ts');

export default {
  message: merge({ ...vxeLocale }, { antdLocale }, { ...genMessage(modules, 'en') }),
  momentLocale,
  momentLocaleName: 'eu',
};
