/**
 * Mitt: Tiny functional event emitter / pubsub
 *
 * @name mitt
 * @param {Array} [all] Optional array of event names to registered handler functions
 * @returns {Function} The function's instance
 */
export class Mitt {
  private cache: Map<string | Symbol, Array<(...data: any) => void>>;
  constructor(all = []) {
    // 事件名称到注册处理程序函数的映射.
    this.cache = new Map(all);
  }

  once(type: string | Symbol, handler: Fn) {
    const decor = (...args: any[]) => {
      handler && handler.apply(this, args);
      this.off(type, decor);
    };
    this.on(type, decor);
    return this;
  }

  /**
   * 为给定类型注册一个事件处理程序。
   *
   * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
   * @param {Function} handler Function to call in response to given event
   */
  on(type: string | Symbol, handler: Fn) {
    const handlers = this.cache?.get(type);
    const added = handlers && handlers.push(handler);
    if (!added) {
      this.cache.set(type, [handler]);
    }
  }

  /**
   * 移除给定类型的事件处理程序。
   *
   * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
   * @param {Function} handler Handler function to remove
   */
  off(type: string | Symbol, handler: Fn) {
    const handlers = this.cache.get(type);
    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
  }

  /**
   * 调用给定类型的所有处理程序。
   * If present, `"*"` handlers are invoked after type-matched handlers.
   *
   * Note: 不支持手动触发"*"处理程序。
   *
   * @param {string|symbol} type The event type to invoke
   * @param {*} [evt] Any value (object is recommended and powerful), passed to each handler
   */
  emit(type: string | Symbol, evt?: any) {
    for (const handler of (this.cache.get(type) || []).slice()) handler(evt);
    for (const handler of (this.cache.get('*') || []).slice()) handler(type, evt);
  }

  /**
   * 删除所有事件处理程序。
   *
   * Note: 这也将删除通过“mitt(all: EventHandlerMap)”传递的事件处理程序。
   */
  clear() {
    this.cache.clear();
  }
}
