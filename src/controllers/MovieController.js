const { Movie } = require('./../models')

module.exports = {

    index: async (req, res) => {
        const movies = await Movie.query().eager('[videos, images, captions]')
        console.log(movies)
        res.render('movies/index.html', {movies})
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {
        const { title, resolution, description } = req.body
        const { videos, covers, posters, captions } = req.files

        const movie = await Movie.query().insert({
            title,
            resolution,
            description
        })

        for(let i = 0; i < videos.length; i++){
            const { filename, size, mimetype} = videos[i]
            await movie.$relatedQuery('videos').insert({
                filename, 
                size, 
                mimetype,
                default: i == 0
            })
        }

        for(let i = 0; i < covers.length; i++){
            const { filename, size, mimetype} = covers[i]
            await movie.$relatedQuery('images').insert({
                filename, 
                size, 
                mimetype,
                type: 1,
                default: i == 0
            })
        }

        for(let i = 0; i < posters.length; i++){
            const { filename, size, mimetype} = posters[i]
            await movie.$relatedQuery('images').insert({
                filename, 
                size, 
                mimetype,
                type: 2,
                default: i == 0
            })
        }

        for(let i = 0; i < captions.length; i++){
            const { filename, size, mimetype} = captions[i]
            await movie.$relatedQuery('captions').insert({
                filename, 
                size, 
                mimetype,
                lang: 1,
                default: i == 0
            })
        }

        res.status(200).json({
            body: req.body,
            files: req.files
        })
    },

}