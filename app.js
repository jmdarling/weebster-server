var express = require('express')
var app = express()

app.get('/', function (request, response) {
  response.send('swag')
})

app.listen(8080)
