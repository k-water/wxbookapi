const http = require('axios')
const crypto = require('crypto')
const {
  appConfig: config
} = require('../conf/app')
const {
  decryptByAES,
  encryptSha1
} = require('../util/util')

/**
 * 登录校验中间件
 */

 function authorizeMiddleware(req, res, next) {
   return authMiddleware(req)
            .then(function(result) {
              res['auth_data'] = result
              return next()
            })
 }

 function authMiddleware(req) {
   const {
     appid,
     secret
   } = config

   const {
     code,
     encryptedData,
     iv
   } = req.query

  //  检查参数是否完整
   if ([code, encryptedData, iv].some(item => !item)) {
     return {
       result: -1,
       errmsg: '缺少参数字段，请检查重试'
     }
   }

  //  获取session_key和openid
  return getSessionKey(code, appid, secret)
          .then(resData => {
            const { session_key } = resData
            const skey = encryptSha1(session_key)

            let decryptedData = JSON.parse(decryptByAES(encryptedData, session_key, iv))
            console.log('-------------decryptedData---------------')
            console.log(decryptedData)
            console.log('-------------decryptedData---------------')

          })
}

function getSessionKey(code, appid, appSecret) {
  const option = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      appid,
      secret: appSecret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  }

  return http(option).then((response) => {
    const data = response.data

    if (!data.openid || !data.session_key || data.errcode) {
      return {
        result: -2,
        errmsg: data.errmsg || '返回数据字段不完整'
      }
    } else {
      return data
    }
  })
}

module.exports = {
  authorizeMiddleware
}