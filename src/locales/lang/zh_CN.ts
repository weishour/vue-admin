import { genMessage } from '/@app/utils';
import { merge } from 'lodash-es';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import vxeLocale from 'vxe-table/lib/locale/lang/zh-CN';
import momentLocale from 'moment/dist/locale/zh-cn';

const modules = import.meta.globEager('./zh_CN/**/*.ts');

export default {
  message: merge({ ...vxeLocale }, { antdLocale }, { ...genMessage(modules, 'zh_CN') }),
  momentLocale,
  momentLocaleName: 'zh-cn',
};
