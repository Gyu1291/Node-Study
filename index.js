// @ts-check

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
