const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Movie extends BaseModel {

    static get virtualAttributes() {
        return ['cover', 'poster'];
    }

    async $beforeInsert() {
        this.movieId = "MO" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    async cover(){
        const cover = await this.$relatedQuery('images').where('type',1).andWhere('default', true).first()
        return cover
    }

    static get relationMappings(){
        
        const Video = require('./Video')
        const Image = require('./Image')
        const Caption = require('./Caption')

        return {
            videos:{
                relation: BaseModel.HasManyRelation,
                modelClass: Video,
                join:{
                    from:'movies.id',
                    to:'videos.movie_id'
                }
            },
            images:{
                relation: BaseModel.HasManyRelation,
                modelClass: Image,
                join:{
                    from:'movies.id',
                    to:'images.movie_id'
                }
            },
            captions:{
                relation: BaseModel.HasManyRelation,
                modelClass: Caption,
                join:{
                    from:'movies.id',
                    to:'captions.movie_id'
                }
            },
        }
    }
}

module.exports = Movie