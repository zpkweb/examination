import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604565499557_1976';

  // add your config here
  config.middleware = [];

  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: [ 'http://localhost:7001' ],
  };

  config.orm = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root1234",
    "database": "test",
    "synchronize": true,
    "logging": false
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
      '.njk': 'nunjucks',
    },
  };

  // config.static = {
  //   enable: true,
  //   package: 'egg-static',
  // };


  return config;
};
