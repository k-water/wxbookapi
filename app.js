const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')


const {
  authorizeMiddleware
} = require('./middleware/auth')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


/**
 * routers
 */
const loginRouter = require('./routes/login')
const bookRouter = require('./routes/book')
const commentRouter = require('./routes/comment')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')

app.use('/login', authorizeMiddleware, loginRouter)
app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)
app.use('/api/comment', commentRouter)
app.use('/api/order', orderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

module.exports = app
