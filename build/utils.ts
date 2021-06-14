import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdFn(mode: string): boolean {
  return mode === 'production';
}

/**
 * 是否生成包预览
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

// 读取所有环境变量配置文件到process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realname = envConf[envName].replace(/\\n/g, '\n');
    realname = realname === 'true' ? true : realname === 'false' ? false : realname;

    if (envName === 'VITE_PORT') {
      realname = Number(realname);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realname = JSON.parse(realname);
      } catch (error) {}
    }
    ret[envName] = realname;
    process.env[envName] = realname;
  }
  return ret;
}

/**
 * 获取配置文件变量名
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

/**
 * 获取以指定前缀开始的环境变量
 * @param match 前缀
 * @param confFiles 环境变量文件名
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
  let envConfig = {};
  confFiles.forEach(item => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });

  Object.keys(envConfig).forEach(key => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

/**
 * 获取绝对路径
 * @param dir
 */
export function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}
