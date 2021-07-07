const express = require('express')

const router = express.Router()

// info会作为路由的后缀
router.get('/info', function(req, res, next) {
  res.json('user info...')
})

module.exports = router