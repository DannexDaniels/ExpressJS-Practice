const express = require('express')
const app = express()
const port = 3000

app.engine('pug', require('pug').__express)

var path = require('path')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Responds with a "hello world when a get request is made on the homepage
app.get('/', (req, res) => res.send('Hello World!'))

//basic routing
//structure is
//app.http_method(path, handler/function)
app.get('/2', function (req, res) {
	res.send('you have asked for a GET Request at /2')
})

app.post('/', function (req, res) {
	res.send('Just got a POST Request')
})

app.put('/user', function (req,res){
	res.send('Got a PUT Request at /user')
})

app.delete('/user', (req,res) => res.send('Got a DELETE Request at /user'))

//routing parameters
//used to capture values specified at their position in the url
//the captured values are populated in the req.params with the name of the route parameter specified in the path as their keys
app.get('/user/:userId/books/:bookId', (req,res) => res.send(req.params))

//you can use '.' or '-' to pass two parameters as one 
app.get('/flights/:from-:to', (req,res) => res.send(req.params))

app.get('/plantae/:genus.:species', (req, res) => res.send(req.params))

//Route handlers
//Multiple callback that behave like middleware to handle a request
//route hadler inform of a function
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

//route handler inform of an array
var cb0 = function (req, res, next) {
  console.log('function b1 called')
  next()
}

var cb1 = function (req, res, next) {
  console.log('function b2 called')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

//route handler inform of a combination of both array and function
var cb0 = function (req, res, next) {
  console.log('function d1 is called')
  next()
}

var cb1 = function (req, res, next) {
  console.log('function d2 is called')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

//chainable route handlers
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

//this one is called when any of the HTTP request is called
app.all('/', function (req, res, next){
	console.log('Accessing behind the scenes...')
	next() //pass control to the next handler/function
})

//loading router module
var birds = require('./birds')

//mount the module on the app
app.use('/birds', birds)


//handling the 404 responses
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

//setting up an error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)
)
