var express = require('express')
var app = express()

var requestService = require('request')

var bodyParser = require('body-parser')

// Logging and CORS.
app.use(function (request, response, next) {
  // Log request
  console.log(request.method, 'request to', request.path)

  // Enable cors
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Move on to next middleware
  next()
})

// Body parser.
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.send('swag')
})

app.post('/authenticate', function (request, response) {
  var username = request.body.username
  var password = request.body.password

  if (username == null || password == null) {
    response.status(404).send('Bad Request')
    return
  }

  requestService.post('https://hummingbird.me/api/v1/users/authenticate').json({
    username: username,
    password: password
  }).pipe(response)
})

app.get('/users/:username/library', function (request, response) {
  var username = request.params.username

  requestService('https://hummingbird.me/api/v1/users/' + username + '/library?status=' + request.query.status).pipe(response)
})

app.post('/libraryEntry/:id', function (request, response) {
  var authToken = request.body.auth_token
  var id = request.params.id

  if (authToken == null || id == null) {
    response.status(404).send('Bad Request')
    return
  }

  requestService.post('https://hummingbird.me/api/v1/libraries/' + id).json(request.body).pipe(response)
})

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', server.address().port)
})
