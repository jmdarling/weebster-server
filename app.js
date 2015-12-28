var express = require('express')
var app = express()

app.use(function (request, response, next) {
  // Log request
  console.log(request.method, 'request to', request.path)

  // Enable cors
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Move on to next middleware
  next()
})

app.get('/', function (request, response) {
  response.send('swag')
})

var server = app.listen(3000, function () {
  console.log('Listening on port', server.address().port)
})
