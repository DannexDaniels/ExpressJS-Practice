var express = require('express')
var router = express.Router()//used to create modular, mountable route handlers

var timelog = (req, res, next) => {
	console.log('Time: ', Date.now())
	console.log('Request URL: ', req.originalUrl)
	console.log('Request Type: ', req.method)
	//adding property to the request object to be used by the next function
	req.requestTime = Date.now()
	next()
	}

// middleware that is specific to this router
router.use(timelog)

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page<br /> <small>Requested at: '+req.requestTime+' </small>')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('bird is regular')
})

// handler for the /user/:id path, which sends a special response
router.get('/user/:id', function (req, res, next) {
  res.send('bird is special')
})

//route to load view
router.get('/html', (req, res) => res.render('index',{title: 'Greetings', message: 'Hello there!'}))
module.exports = router
