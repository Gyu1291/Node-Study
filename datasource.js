const { Pool } = require("pg")

// settings for connecting to the DB.
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

module.exports = { pool }
