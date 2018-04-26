
module.exports = {
  appConfig: {
    appid: require('../.config.js').appid,
    secret: require('../.config.js').secret
  },
  // 用户初始积分余额
  userConfig: {
    credit: 30
  }
}