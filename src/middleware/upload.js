const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const images = ['image/jpeg','image/png']
        if (file.mimetype === 'audio/mp3') {
            cb(null, 'src/public/uploads/audio')
          } else if (file.mimetype === 'video/mp4') {
            cb(null, 'src/public/uploads/video')
          } else if (images.includes(file.mimetype)) {
            cb(null, 'src/public/uploads/image')
          } else if (file.mimetype === 'application/pdf') {
            cb(null, 'src/public/uploads/pdf')
          }else {
            cb({ error: 'Mime type not supported' })
          }
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

module.exports = multer({ storage: storage })