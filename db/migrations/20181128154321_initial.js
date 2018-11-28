
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('projects', (table) => {
        table.increments('id').primary()
        table.string('name')

        table.timestamps(true, true)
      }),

      knex.schema.createTable('palettes', (table) => {
        table.increments('id').primary()
        table.string('palette')
        table.integer('project_id').unsigned()
        table.foreign('project_id')
          .references('project.id')

        table.timestamps(true, true) 
      })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('palette'),
        knex.schema.dropTable('project')
      ]);
};