const Books = require('../dao/books')
const moment = requrie('moment')

module.exports = {
  /**
   * 获取所有图书信息
   */
  getAllBooks: function (req, res, next) {
    Books.getBookInfo(true).then(function (resData) {
      res.json({
        result: 0,
        data: resData.map(function (item) {
          return {
            author: item.bkauthor || '',
            category: item.bkclass || '',
            cover_url: item.bkcover || '',
            file_url: item.bkfile || '',
            book_id: item.bkid || '',
            book_name: item.bkname || '',
            book_price: item.bkprice || 0,
            book_publisher: item.bkpublisher || ''
          }
        })
      })
    })
  },

  /**
   * 根据id获取图书详情
   */
  getBookById: function(req, res, next) {
    const bookid = req.query.bookId
    if (!bookid) {
      res.json({
        result: -1,
        errmsg: '缺少请求参数字段bookid，请检查后重试'
      })
      return
    }
    Books.getBookInfo(false, bookid).then(function(resData) {
      res.json({
        result: 0,
        data: resData.map(function (item) {
          return {
            author: item.bkauthor || '',
            category: item.bkclass || '',
            cover_url: item.bkcover || '',
            file_url: item.bkfile || '',
            book_id: item.bkid || '',
            book_name: item.bkname || '',
            book_price: item.bkprice || 0,
            book_publisher: item.bkpublisher || ''
          }
        })
      })
    })
  }
}