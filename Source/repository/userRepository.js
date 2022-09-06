// @ts-check
const { pool } = require("../../datasource.js")

var userRepository = {
  getThree: async () => {
    const res = await pool.query("SELECT 1+2 AS three")
    console.log("succeed query with rs[0]: " + res.rows[0].three)
    return { three: res.rows[0].three }
  },
}

module.exports = { userRepository }
