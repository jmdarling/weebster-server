var express = require('express')
var app = express()

var requestService = require('request')

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

app.get('/users/:username/library', function (request, response) {
  var username = request.params.username

  requestService('http://hummingbird.me/api/v1/users/' + username + '/library').pipe(response)
})

var server = app.listen(3000, function () {
  console.log('Listening on port', server.address().port)
})
