exports.up = function(knex) {
  return knex.schema.createTable('posters', table => {
      table.increments()
      table.string('posterId').unique().notNullable()
      table.string('filename').unique().notNullable()
      table.string('mimetype').notNullable()
      table.integer('size').notNullable()
      table.boolean('default').defaultTo(false)
      table.integer('movie_id').notNullable().references('id').inTable('movies').onDelete('CASCADE').index()
      table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('posters')
}