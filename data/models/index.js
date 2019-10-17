// Initiate database connection
const db = require('../dbConfig')

// ==== Application Methods ==== //
/**
 * Database model to list all users in the database
 * @returns array of table records
 */
async function getUsers() {
  try {
    let data = await db('Users')
      .select('id', 'username', 'department')
      .orderBy('id')
    return data
  }
  catch (err) {
    return err
  }
}

// ==== Global Database Methods ==== //
/**
 * Database model to get all records in a table
 * @param {string} table
 * @returns array of table records
 */
async function find(table) {
  try {
    let data = await db(table).orderBy('id')
    return data
  }
  catch (err) {
    return err
  }
}

/**
 * Database model to get a single record by id
 * @param {string} table
 * @param {integer} id
 * @returns database record
 */
async function findById(table, id) {
  try {
    let data = await db(table)
      .select('id', 'username', 'department')
      .where({ id: Number(id) })
      .first()
    return data
  }
  catch (err) {
    return err
  }
}

/**
 * Database model to get a user record by username
 * @param {string} username
 * @returns database record
 */
async function findByUser(table, username) {
  try {
    let data = await db(table)
      .where({ username })
      .first()
    return data
  }
  catch (err) {
    return err
  }
}

/**
 * Database model to get all records in a table given some search criteria
 * @param {string} table
 * @param {string} field
 * @param {string} id
 * @returns array of table records
 */
async function findByField(table, field, data) {
  try {
    let query = await db(table)
      .where(`${field}`, data)
      .first()
    return query
  }
  catch (err) {
    return err
  }
}

/**
 * Database model to add a record
 * @param {string} table
 * @param {object} data
 * @returns newly created record
 */
async function addRecord(table, data) {
  try {
    let newRecordId = await db(table).insert(data, 'id')
    let newRecord = await findById('Users', newRecordId)
    return newRecord
  }
  catch (err) {
    return err
  }
}

/**
 * Database method to update existing record
 * @param {string} table
 * @param {integer} id
 * @param {object} data
 * @returns updated record
 */
async function updateRecord(table, id, data) {
  try {
    let updateCount = await db(table)
      .where({ id }).update(data)
    if (updateCount > 0) {
      let updatedRecord = await findById(table, id)
      console.log(`update db method invoked updatedRecord: `, updatedRecord)
      return updatedRecord
    } else throw err
  }
  catch (err) {
    return err
  }
}

/**
 * Database method to remove record from the database
 * @param {string} table
 * @param {integer} id
 * @returns deletion confirmation message in a json object
 */
async function removeRecord(table, id) {
  try {
    let deleteCount = await db(table)
      .where({ id }).del()
    if (deleteCount > 0) {
      return {
        message: `${deleteCount} ${deleteCount > 1 ?
          'records' : 'record'} deleted`
      }
    } else throw err
  }
  catch (err) {
    return err
  }
}

module.exports = {
  db,
  find,
  findById,
  findByUser,
  findByField,
  addRecord,
  updateRecord,
  removeRecord,
  getUsers
}