import { defHttp } from '/@app/plugin';
import { getMenuListResultModel } from '/@app/model';

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: 通过id获取用户菜单
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
