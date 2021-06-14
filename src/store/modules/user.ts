import type { UserInfo, ErrorMessageMode } from '/@app/model';

import { defineStore } from 'pinia';
import { store } from '/@app/store';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@app/constants';
import { RoleEnum, PageEnum } from '/@app/enums';
import { getAuthCache, setAuthCache } from '/@app/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@app/model';
import { getUserInfo, loginApi } from '/@app/api/sys/user';
import { useI18n, useMessage } from '/@app/hooks/web';
import { router } from '/@app/router';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    // 路由列表
    roleList: [],
    // 登录是否过期
    sessionTimeout: false,
  }),
  getters: {
    getUserInfo(_): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(_): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(_): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: 登录
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // 保存token
        this.setToken(token);

        // 获取用户信息
        const userInfo = await this.getUserInfoAction();

        // 登录成功之后跳转首页
        const sessionTimeout = this.sessionTimeout;
        sessionTimeout && this.setSessionTimeout(false);
        !sessionTimeout && goHome && (await router.replace(PageEnum.BASE_HOME));

        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfo();
      // const { roles } = userInfo;
      // const roleList = roles.map(item => item.value) as RoleEnum[];
      this.setUserInfo(userInfo);
      this.setRoleList([]);
      return userInfo;
    },
    /**
     * @description: 退出
     */
    logout(goLogin = false) {
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: 退出前确认
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// 需要在设置之外使用
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
