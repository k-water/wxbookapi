const Books = require('../dao/books')
const moment = require('moment')
const Comments = require('../dao/comments')
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
  getBookById: function (req, res, next) {
    const bookid = req.query.bookId
    if (!bookid) {
      res.json({
        result: -1,
        errmsg: '缺少请求参数字段bookid，请检查后重试'
      })
      return
    }
    Books.getBookInfo(false, bookid).then(function (resData) {
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
   * 
   */
  queryBookBySkey: function (req, res, next) {
    const responseData = {}
    Books.queryBookBySkey(req.query.bookid, req.query.skey)
      .then(resData => {
        if (resData && resData[0] && resData[0]['buyCount'] === 1) {
          responseData['is_buy'] = 1
        } else {
          responseData['is_buy'] = 0
        }

        // 返回当前书籍评论列表
        return Comments.getCommentsBySkey(req.query.bookid)
      })
      .then(resCommentData => {
        if (resCommentData && resCommentData.length) {
          resCommentData.forEach(item => {
            item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss')
          })
          responseData['lists'] = resCommentData
        } else {
          resCommentData['lists'] = []
        }

        res.json({
          result: 0,
          data: resCommentData
        })
      })
      .catch(err => {
        res.json({
          result: -2,
          errmsg: '数据查询出错：' + JSON.stringify(err)
        })
      })
  }
}