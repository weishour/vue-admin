// #!/usr/bin/env node

import { runBuildConfig } from './buildConf';
import pkg from '../../package.json';
import chalk from 'chalk';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    // 生产配置文件
    if (!argvList.includes('disabled-config')) {
      await runBuildConfig();
    }

    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)}` + ' - 构建成功!');
  } catch (error) {
    console.log(chalk.red('vite 构建失败:\n' + error));
    process.exit(1);
  }
};
runBuild();
