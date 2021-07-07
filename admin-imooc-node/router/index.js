const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const {
  CODE_ERROR
} = require('../utils/constant')

// 注册路由
const router = express.Router()
// 监听跟路由下的处理
router.get('/', function(req, res) {
  res.send('电子书管理后台')
})
// 指定的/user会作为指定路由的前缀
router.use('/user', userRouter)

// 集中处理404请求的中间件
// 注意：该中间件必须放在正常处理流程之后
// 否则，会拦截正常请求
// 使用next继续把这个异常向下传递
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})
// 自定义异常处理中间件
// 注意两点：
// 第一，方法的参数不能少
// 第二，方法必须放在路由后面
router.use((err, req, res, next) => {
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
  // 返回错误码，json信息
  res.status(statusCode).json({
    code: CODE_ERROR,
    msg,
    error: statusCode,
    errorMsg
  })
})
// 帮助我们处理路由的监听
module.exports = router