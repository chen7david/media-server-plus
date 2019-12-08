const express = require('express')
const app = express()
const server = require('http').createServer(app)
const nunjucks = require('nunjucks')
const cors = require('cors')
const port = require('./config').APP_PORT || 4000
const {} = require('./routes')





// run server
server.listen(port, () => {
    console.log(`MediaServer is running at http://localhost:${port}`)
})