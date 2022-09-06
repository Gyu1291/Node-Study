// @ts-check
const {Pool} = require('pg');

const pg = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5678
});

/* run only when the postgresDB is up and running
pg.connect(err=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Postgre DB Connected!");
    }
})
*/


const bodyParser = require("body-parser")
const express = require("express")
const userRouter = require("./Source/routes/userRouter.js")
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.listen(PORT, () => {
  console.log("server running on port " + PORT)
})

app.use("/users", userRouter.userRouter)
