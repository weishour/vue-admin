import type { LockInfo } from '/@app/model/store';

import { defineStore } from 'pinia';
import { LOCK_INFO_KEY } from '/@app/constants';
import { Persistent } from '/@app/utils/cache/persistent';
import { useUserStore } from './user';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {
    getLockInfo(_) {
      return this.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY);
      this.lockInfo = null;
    },
    // 解锁
    async unLock(password?: string) {
      const userStore = useUserStore();

      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }

      const tryLogin = async () => {
        try {
          const username = userStore.getUserInfo?.username;
          const res = await userStore.login({
            username,
            password: password!,
            goHome: false,
            mode: 'none',
          });
          if (res) {
            this.resetLockInfo();
          }
          return res;
        } catch (error) {
          return false;
        }
      };

      return await tryLogin();
    },
  },
});
