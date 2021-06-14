import { Persistent, BasicKeys } from '/@app/utils/cache/persistent';
import { TOKEN_KEY } from '/@app/constants';
import { CacheTypeEnum } from '/@app/enums';
import projectSetting from '/@app/settings/project';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}
