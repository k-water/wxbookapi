const pool = require('./connect')

module.exports = {
  query: function (sqlString, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sqlString, params, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}