var express = require('express')
var app = express()

var requestService = require('request')

var bodyParser = require('body-parser')

var apiBase = 'https://hummingbird.me/api/v1/'

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

  requestService.post(apiBase + 'users/authenticate').json({
    username: username,
    password: password
  }).pipe(response)
})

app.get('/users/:username/library', function (request, response) {
  var username = request.params.username

  requestService(apiBase + 'users/' + username + '/library?status=' + request.query.status).pipe(response)
})

app.get('/anime/:animeId', function (request, response) {
  var animeId = request.params.animeId

  requestService(apiBase + 'anime/' + animeId).pipe(response)
})

app.post('/libraryEntry/:id', function (request, response) {
  var authToken = request.body.auth_token
  var id = request.params.id

  if (authToken == null || id == null) {
    response.status(404).send('Bad Request')
    return
  }

  requestService.post(apiBase + 'libraries/' + id).json(request.body).pipe(response)
})

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', server.address().port)
})
