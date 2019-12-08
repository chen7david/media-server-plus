const express = require('express')
const app = express()
const server = require('http').createServer(app)
const nunjucks = require('nunjucks')
const cors = require('cors')
const port = require('./config').APP_PORT || 4000
const {} = require('./routes')

// set app parameters
app.set('view engine', 'njk')

// expose public directories
app.use('/media', express.static(__dirname + '/public/uploads'))
app.use('/assets',express.static(__dirname + '/public/assets'))

// run server
server.listen(port, () => {
    console.log(`MediaServer is running at http://localhost:${port}`)
})