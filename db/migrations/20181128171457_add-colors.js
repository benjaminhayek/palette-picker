
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('palettes', function (table) {
          table.string('color1');
          table.string('color2');
          table.string('color3');
          table.string('color4');
          table.string('color5');
        })
      ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('palettes', function (table) {
          table.dropColumn('palettes');
        })
      ]);  
};
