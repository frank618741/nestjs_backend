import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigEnum } from './src/enum/config.enum';

//通过环境变量读取不同的.env文件
function getEnv(env: string): Record<string, unknown> {
  //如果env文件存在 则使用fs方法读取env文件,否则则返回一个空对象
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

//通过dotENV来解析不同的配置
function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  const config = { ...defaultConfig, ...envConfig }; //将配置文件进行合并 这里的config就相当于configservice

  //这里用entitiesDir来替换一大堆的entity文件的引入
  //[__dirname + '/**/*.entity.ts']表示读取当前目录下所有的entity.ts文件
  //[__dirname + '/**/*.entity{.js,.ts}']表示读取当前目录下所有的entity.js和entity.ts文件 在生产环境下是commonjs规范
  //读取的是.js的文件
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.js,.ts}'];

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    // 同步本地的schema与数据库 -> 开发环境初始化的时候可以去使用
    //在生产环境下绝对禁止使用synchronize:true 必须关闭 使用数据迁移指令去同步数据库
    synchronize: false,
    logging: false,
    // logging: ['error'],
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

//这里使用DataSource 因为typeormcli从0.4的版本开始就要求使用DataSource了
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
