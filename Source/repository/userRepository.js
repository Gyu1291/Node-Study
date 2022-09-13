const datasource = require("../../datasource.js")
const sqlMapper = require("./mapper.js")

var mapper = sqlMapper.getMapper("userMapper")

var userRepository = {
  // create a user
  createUser: async function (userId, username, transaction = null) {
    var query = mapper.makeQuery("createUser", {
      userId: userId,
      username: username,
    })
    var conn = null
    if (transaction === null) {
      conn = await datasource.getConnection()
      await conn.query(query)
      conn.release()
    } else {
      conn = await transaction.getConnection()
      await conn.query(query)
    }
  },
  // select a single user, connection provided from outside
  selectUser: async function (userId, transaction = null) {
    var query = mapper.makeQuery("selectUser", { userId: userId })
    var conn = null
    var rs
    if (transaction === null) {
      conn = await datasource.getConnection()
      rs = await conn.query(query)
      conn.release()
    } else {
      conn = await transaction.getConnection()
      rs = await conn.query(query)
    }
    const rs0 = rs.rows[0]
    return { userId: rs0.uid, username: rs0.username }
  },
  // delete a single user
  deleteUser: async function (userId, transaction = null) {
    var query = mapper.makeQuery("deleteUser", { userId: userId })
    var conn = null
    if (transaction === null) {
      conn = await datasource.getConnection()
      await conn.query(query)
      conn.release()
    } else {
      conn = await transaction.getConnection()
      await conn.query(query)
    }
  },
  // flush the DB
  flushTable: async function () {
    var query = mapper.makeQuery("flushTable")
    var conn = await datasource.getConnection()
    await conn.query(query)
    conn.release()
  },
}

module.exports = { userRepository }
