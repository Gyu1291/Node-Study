const datasource = require("../../datasource.js")
const sqlMapper = require("./mapper.js")

var mapper = sqlMapper.getMapper("moneyMapper")

var moneyRepository = {
  // creates an entry, updates if existing
  createEntry: async function (userId, transaction = null) {
    var query = mapper.makeQuery("createEntry", {
      userId: userId,
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
  // set the balance of an existing user
  setRPBalance: async function (userId, RP_amount, transaction = null) {
    var query = mapper.makeQuery("setRPBalance", {
      userId: userId,
      RP_amount: RP_amount,
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
  // set the balance of an existing user
  setDIABalance: async function (userId, DIA_amount, transaction = null) {
    var query = mapper.makeQuery("setDIABalance", {
      userId: userId,
      DIA_amount: DIA_amount,
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
  updateRPBalance: async function (userId, RP_amount, transaction = null) {
    var query = mapper.makeQuery("updateRPBalance", {
      userId: userId,
      RP_amount: RP_amount,
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
  updateDIABalance: async function (userId, DIA_amount, transaction = null) {
    var query = mapper.makeQuery("updateDIABalance", {
      userId: userId,
      DIA_amount: DIA_amount,
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
  queryBalance: async function (userId, transaction = null) {
    var query = mapper.makeQuery("queryBalance", { userId: userId })
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
    console.log(rs0.uid)
    return {
      userId: rs0.uid,
      RP_amount: parseInt(rs0.RP_amount),
      DIA_amount: parseInt(rs0.DIA_amount),
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

module.exports = { moneyRepository }
