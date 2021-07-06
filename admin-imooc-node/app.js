// 整个后端的入口文件
const express = require('express')
// 这个app就是一个express应用
const app = express()
// function myLogger(req, res, next) {
//   console.log('myLogger')
//   next()
// }
// 中间件是一个回调函数
// app.use(myLogger)
// 监听跟路由，创建一个处理函数
app.get('/', function(req, res) {
  throw new Error('error...')
})

function errorHandler(err, req, res, next) {
  console.log()
  res.status(500).json({
    error: -1,
    msg: err.toString()
  })
}

app.use(errorHandler)

// app.listen来将整个项目运行起来,监听5000端口的http请求
const server = app.listen(5000, function() {
  const { address, port } = server.address()
  console.log('HTTP启动成功 http://%s:%s', address, port)
})

