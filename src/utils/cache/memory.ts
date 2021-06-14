export interface Cache<V = any> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number;
  alive?: number;
}

const NOT_ALIVE = 0;

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: Cache<V> } = {};
  private alive: number;

  constructor(alive = NOT_ALIVE) {
    // Unit second
    this.alive = alive * 1000;
  }

  get getCache() {
    return this.cache;
  }

  setCache(cache) {
    this.cache = cache;
  }

  // get<K extends keyof T>(key: K) {
  //   const item = this.getItem(key);
  //   const time = item?.time;
  //   if (!isNullOrUnDef(time) && time < new Date().getTime()) {
  //     this.remove(key);
  //   }
  //   return item?.value ?? undefined;
  // }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.get(key);

    if (!expires || (expires as number) <= 0) {
      expires = this.alive;
    }
    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: expires };
      this.cache[key] = item;
    }

    if (!expires) {
      return value;
    }
    const now = new Date().getTime();
    item.time = now + this.alive;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires
    );

    return value;
  }

  /**
   * 删除缓存
   * @param key
   * @returns
   */
  remove<K extends keyof T>(key: K) {
    const item = this.get(key);

    // 删除属性
    Reflect.deleteProperty(this.cache, key);

    if (item) {
      clearTimeout(item.timeoutId!);
      return item.value;
    }
  }

  /**
   * 重置缓存
   * @param cache
   */
  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach(key => {
      const k = key as any as keyof T;
      const item = cache[k];

      if (item && item.time) {
        const now = new Date().getTime();
        const expire = item.time;
        if (expire > now) {
          this.set(k, item.value, expire);
        }
      }
    });
  }

  /**
   * 清空缓存
   */
  clear() {
    Object.keys(this.cache).forEach(key => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}
