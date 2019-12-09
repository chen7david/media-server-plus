const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Image extends BaseModel {

    async $beforeInsert() {
        this.imageId = "IM" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }
}

module.exports = Image