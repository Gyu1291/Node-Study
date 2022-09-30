const datasource = require("../../datasource.js")
const sqlMapper = require("./mapper.js")

var mapper = sqlMapper.getMapper("userMapper")

//repo transaction function
async function executeQuery(transaction, query, rs)
{
  var conn = null;
  if(transaction===null)
  {
    conn = await datasource.getConnection()
    await conn.query(query)
    if(rs)
    {
      rs = await conn.query(query);
    }
    conn.release()

  }
  else
  {
    conn = await transaction.getConnection()
    if(rs)
    {
      rs = await conn.query(query);
    }
    await conn.query(query)
  }
}


var userRepository = {
  // create a user
  createUser: async function (userId, username, transaction = null) {
    var query = mapper.makeQuery("createUser", {
      userId: userId,
      username: username,
    })
    executeQuery(transaction, query);
  },
  // select a single user, connection provided from outside
  selectUser: async function (userId, transaction = null) {
    var query = mapper.makeQuery("selectUser", { userId: userId })
    var conn = null
    var rs;
    executeQuery(transaction, query,rs);
    const rs0 = rs.rows[0]
    return { userId: rs0.uid, username: rs0.username }
  },
  // delete a single user
  deleteUser: async function (userId, transaction = null) {
    var query = mapper.makeQuery("deleteUser", { userId: userId })
    var conn = null
    executeQuery(transaction, query);
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
