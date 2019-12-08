const nunjucks = require('nunjucks')

nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app
})

module.exports = nunjucks