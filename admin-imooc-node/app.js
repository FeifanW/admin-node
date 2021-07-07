// 整个后端的入口文件
const express = require('express')
const router = require('./router')
// 这个app就是一个express应用
const app = express()
// 将全局的路由托管到这个router里面来，可以让业务代码更加简洁，这个router实际上就是一个中间件
app.use('/', router)
// app.listen来将整个项目运行起来,监听5000端口的http请求
const server = app.listen(5000, function() {
  const { address, port } = server.address()
  console.log('HTTP启动成功 http://%s:%s', address, port)
})

