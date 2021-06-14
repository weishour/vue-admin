import { ErrorTypeEnum } from '/@app/enums/exception-enum';
import { MenuModeEnum, MenuTypeEnum } from '/@app/enums/menu-enum';

// 锁屏信息
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// 错误日志信息
export interface ErrorLogInfo {
  // 错误类型
  type: ErrorTypeEnum;
  // 错误文件
  file: string;
  // 错误名称
  name?: string;
  // 错误信息
  message: string;
  // 错误堆栈
  stack?: string;
  // 错误详情
  detail: string;
  // 错误路径
  url: string;
  // 错误时间
  time?: string;
}

export interface UserInfo {
  id: string | number;
  username: string;
  realname: string;
  avatar?: string;
  desc?: string;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
