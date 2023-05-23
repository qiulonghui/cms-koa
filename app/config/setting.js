const path = require('path');

const port = process.env.NODE_ENV === 'development' ? 6001 : 5000;
const siteDomain = process.env.NODE_ENV === 'development' ? ('http://localhost:' + port) : 'https://2h94609x15.imdo.co';
module.exports = {
  port,
  siteDomain,
  countDefault: 10,
  pageDefault: 0,
  apiDir: 'app/api',
  accessExp: 60 * 60 * 4, // 4h 单位秒
  // 指定工作目录，默认为 process.cwd() 路径
  baseDir: path.resolve(__dirname, '../../'),
  // debug 模式
  debug: process.env.NODE_ENV === 'development',
  // refreshExp 设置refresh_token的过期时间，默认一个月
  refreshExp: 60 * 60 * 24 * 30,
  // 暂不启用插件
  pluginPath: {
    // // plugin name
    // poem: {
    //   // determine a plugin work or not
    //   enable: true,
    //   // path of the plugin
    //   path: "app/plugin/poem",
    //   // other config
    //   limit: 2
    // },
  },
  // 是否开启登录验证码
  loginCaptchaEnabled: false,
  wx: {
    appId: 'wxb8037aea7bbd6701',
    appSecret: 'a0a58c295ed31da734b550bb790bf5e2'
  }
};
