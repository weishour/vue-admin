/**
 * @description: 登录接口参数
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: 获取用户信息返回值
 */
export interface GetUserInfoModel {
  // 用户id
  id: string | number;
  // 用户名
  username: string;
  // 真实名字
  realname: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
  roles: RoleInfo[];
}
