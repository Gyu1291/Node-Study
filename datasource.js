//@ts-check

const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "production",
  //this should go in the env variables
  password: "monday%77ER",
  port: 5432,
})

//side effect - runs only once even if this module is imported
// multiple times
pool.connect((err) => {
  if (err) {
    console.log(err)
  }
})

// different DB - nodejs connectors may have different interfaces
// this provides a single interface for making transactions
async function getConnection() {
  return await pool.connect()
}

// utility class for dealing with transactions
async function transaction() {
  var conn = await pool.connect()
  return {
    begin: async function () {
      try {
        await conn.query("BEGIN")
      } catch (e) {
        throw e
      }
    },
    rollback: async function () {
      try {
        await conn.query("ROLLBACK")
      } catch (e) {
        throw e
      } finally {
        await conn.release()
      }
    },
    commit: async function () {
      try {
        await conn.query("COMMIT")
      } catch (e) {
        throw e
      } finally {
        await conn.release()
      }
    },
    getConnection: () => {
      return conn
    },
  }
}

async function executeQuery(transaction, query) {
  var conn = null
  var rs = null
  if (transaction === null) {
    conn = await getConnection()
    try {
      rs = await conn.query(query)
    } catch (e) {
      throw e
    } finally {
      conn.release()
    }
  } else {
    conn = await transaction.getConnection()
    rs = await conn.query(query)
    await conn.query(query)
  }
  return rs
}

exports.getConnection = getConnection
exports.getTransaction = transaction
exports.executeQuery = executeQuery
