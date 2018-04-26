const express = require('express')
const Book = require('../controllers/books')
const router = express.Router()

router.get('/getBooks', function(req, res, next) {
  const reqType = req.query.is_all

  if (reqType === undefined) {
    res.json({
      result: -1,
      errmsg: '缺少请求参数is_all字段，请检查后重试'
    })
    return
  }

  if (parseInt(reqType) === 1) {
    Book.getAllBooks(req, res, next)
  } else {
    Book.getBookById(req, res, next)
  }
})

module.exports = router