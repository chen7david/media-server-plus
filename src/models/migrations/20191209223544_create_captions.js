exports.up = function(knex) {
  return knex.schema.createTable('captions', table => {
      table.increments()
      table.string('captionId').unique().notNullable()
      table.string('filename').unique().notNullable()
      table.string('label').notNullable()
      table.string('srclang').notNullable()
      table.string('mimetype').notNullable()
      table.integer('size').notNullable()
      table.integer('movie_id').notNullable().references('id').inTable('movies').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('captions')
}