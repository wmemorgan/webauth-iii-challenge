
exports.up = async function(knex) {
  await knex.schema.createTable(`Users`, tbl => {
    tbl.increments()
    tbl
      .string('username')
      .notNullable()
      .unique()
    tbl.string('password').notNullable()
    tbl.string('department')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Users')
};
