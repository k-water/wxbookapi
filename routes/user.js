const express = require('express')
const User = require('../controllers/users')
const router = express.Router()

router.get('/getBoughtBook', function (req, res, next) {
  const {
    skey
  } = req.query

  if (skey === void 0) {
    res.json({
      result: -1,
      errmsg: '缺少请求参数skey字段，请检查后重试'
    })
    return
  }
  User.getBoughtBooks(req, res, next)
})

module.exports = router