
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('palette_projects', (table) => {
        table.increments('id').primary()
        table.string('name')

        table.timestamps(true, true)
      }),

      knex.schema.createTable('palettes', (table) => {
        table.increments('id').primary()
        table.string('palette')
        table.integer('project_id').unsigned()
        table.foreign('project_id')
          .references('palette_projects.id')

        table.timestamps(true, true) 
      })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('palettes'),
        knex.schema.dropTable('projects')
      ]);
};
