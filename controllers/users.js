const Users = require('../dao/user')

module.exports = {
  /**
   * 保存用户信息
   */
  saveUserInfo: function(obj) {
    const userInfo = obj.userInfo || {},
          session_key = obj.session_key || '',
          skey = obj.skey || ''

    return Users.saveUserInfo(userInfo, session_key, skey)
      .then(res => {
        return res
      })
  },

  /**
   * 获取已购书籍
   */
  getBoughtBooks: function(req, res, next) {
    User.getBoughtBooks(req.query.skey)
      .then(resData => {
        if (resData && resData.length) {
          res.json({
            result: 0,
            list: resData.filter(item => {
              return item.bkid && item.bkname && item.bkfile && item.bkcover
            })
          })
        } else {
          res.json({
            result: 0,
            list: []
          })
        }
      })
      .catch(err => {
        res.json({
          result: -2,
          errmsg: '获取已购书籍失败' + JSON.stringify(err)
        })
      })
  }
}