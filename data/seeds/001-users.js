
exports.seed = async function(knex) {
  await knex('Users').insert([
    { id: 1, username: 'George', password: 'pass', department: 'CS' },
    { id: 2, username: 'Steve', password: 'pass', department: 'Biology' },
    { id: 3, username: 'Harry', password: 'abc123', department: 'Accounting' }
  ])
}
