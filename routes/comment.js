const express = require('express')
const Book = require('../controllers/books')
const router = express.Router()
const Comment = require('../controllers/comments')

router.post('/write', function(req, res, next) {
  const {
    skey,
    content
  } = req.body
  const bookid = parseInt(req.body.bookid)

  if (skey === void 0) {
    res.json({
      result: -1,
      errmsg: '缺少请求参数skey字段，请检查后重试'
    })
    return
  }

  if (content === void 0) {
    res.json({
      result: -1,
      errmsg: '缺少请求参数content字段，请检查后重试'
    })
    return
  }

  if (bookid === void 0) {
    res.json({
      result: -1,
      errmsg: '缺少请求参数bookid字段，请检查后重试'
    })
    return
  }
  Comment.addCommentBySkey(req, res, next)
})

module.exports = router