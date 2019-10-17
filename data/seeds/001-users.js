const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  await knex('Users').insert([
    { id: 1, username: 'George', password: bcrypt.hashSync('pass', 12), department: 'CS' },
    { id: 2, username: 'Steve', password: bcrypt.hashSync('pass', 12), department: 'Biology' },
    { id: 3, username: 'Harry', password: bcrypt.hashSync('abc123', 12), department: 'Accounting' }
  ])
}
