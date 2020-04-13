const express = require('express')
const app = express()
const port = 3000


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

//this one is called when any of the HTTP request is called
app.all('/', function (req, res, next){
	console.log('Accessing behind the scenes...')
	next() //pass control to the next handler/function
})

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
