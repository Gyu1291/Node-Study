// @ts-check
const { pool } = require("../../datasource.js")
const sqlMapper = require("./mapper.js")

var mapper = sqlMapper.getMapper("userMapper")

var userRepository = {
  // create a user
  createUser: async function (userId, username) {
    var query = mapper.makeQuery("createUser", {
      userId: userId,
      username: username,
    })
    await pool.query(query)
  },
  // select a single user
  selectUser: async function (userId) {
    var query = mapper.makeQuery("selectUser", { userId: userId })
    const rs = await pool.query(query)
    const rs0 = rs.rows[0]
    return { userId: rs0.uid, username: rs0.username }
  },
  // delete a single user
  deleteUser: async function (userId) {
    var query = mapper.makeQuery("deleteUser", { userId: userId })
    await pool.query(query)
  },
  // flush the DB
  flushTable: async function () {
    var query = mapper.makeQuery("flushTable")
    await pool.query(query)
  },
}

module.exports = { userRepository }
