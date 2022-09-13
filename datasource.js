//@ts-check

const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "production",
  //this should go in the env variables
  password: "1234",
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

exports.getConnection = getConnection
exports.getTransaction = transaction
