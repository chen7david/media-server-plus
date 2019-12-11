const { Movie } = require('./../models')
const { transaction } = require('objection')
const files = require('./../helpers/files')
module.exports = {

    index: async (req, res) => {
        const movies = await Movie.query().withGraphFetched('[videos(default), covers(default), posters(default), captions]')
        // console.log(movies)
        res.render('movies/index.html', {movies})
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {

        const { title, resolution, description } = req.body
        const { videos, covers, posters, captions } = req.files
        const langCode = ['en','zh','nl','sp','ru','fr']
        const langNames = {
            en:'English',
            zh:'Chinese',
            nl:'Dutch',
            sp:'Spanish',
            ru:'Russian',
            fr:'Frensh'
        }

        try{
            const object = await Movie.transaction( async trx => {
                const movie = await Movie.query(trx).insert({
                    title,
                    resolution,
                    description
                })

                for(let i = 0; i < videos.length; i++){
                    const { filename, size, mimetype} = videos[i]
                    await movie.$relatedQuery('videos', trx).insert({
                        filename, 
                        size, 
                        mimetype,
                        default: i == 0
                    })
                }

                for(let i = 0; i < covers.length; i++){
                    const { filename, size, mimetype} = covers[i]
                    await movie.$relatedQuery('covers', trx).insert({
                        filename, 
                        size, 
                        mimetype,
                        default: i == 0
                    })
                }

                for(let i = 0; i < posters.length; i++){
                    const { filename, size, mimetype} = posters[i]
                    await movie.$relatedQuery('posters', trx).insert({
                        filename, 
                        size, 
                        mimetype,
                        default: i == 0
                    })
                }

                for(let i = 0; i < captions.length; i++){
                    const { filename, size, mimetype, originalname} = captions[i]
                    
                    let srclang = originalname.split('.')[1]
                    if(!langCode.includes(srclang))
                        srclang = 'en'
                    const label = langNames[srclang]
                    console.log(label)
                    await movie.$relatedQuery('captions', trx).insert({
                        filename, 
                        size,
                        label,
                        srclang, 
                        mimetype,
                    })
                }

                return movie;

            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
    },
    delete: async (req, res) => {

        try{
            const object = await Movie.transaction(async trx => {
                const { movieId } = req.params
                const movie = await Movie.query(trx)
                .withGraphFetched('[videos, covers, posters, captions]')
                .where('movieId',movieId).first()

                const { videos, covers, posters, captions } = movie

                for(let i = 0; i < videos.length; i++){
                    const video = videos[i]
                    files.delete('/video/'+video.filename)
                    console.log(video.filename)
                }
        
                for(let i = 0; i < covers.length; i++){
                    const cover = covers[i]
                    files.delete('/image/'+cover.filename)
                    console.log(cover.filename)
                }
        
                for(let i = 0; i < posters.length; i++){
                    const poster = posters[i]
                    files.delete('/image/'+poster.filename)
                    console.log(poster.filename)
                }
        
                for(let i = 0; i < captions.length; i++){
                    const caption = captions[i]
                    files.delete('/captions/'+caption.filename)
                    console.log(caption.filename)
                }

                await movie.$query(trx).delete()
            })

            return res.redirect('/movies')
        }catch(err){
            console.log(err)
            return res.redirect('/movies')
        }
        

        

        
    }

}