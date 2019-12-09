const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const video = ['video/mp4']
        const images = ['image/jpeg','image/png']
        const audio = ['audio/mp3']
        
         if (video.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/video')
          } else if (images.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/image')
          } else if (audio.includes(file.mimetype)) {
              cb(null, 'src/public/uploads/audio')
          } else if (file.mimetype === 'application/pdf') {
              cb(null, 'src/public/uploads/pdf')
          } else {
              cb({ error: 'Mime type not supported' })
          }
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

module.exports = multer({ storage: storage })