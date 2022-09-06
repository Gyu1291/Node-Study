/*
route for creating(register) a new user
The 'front-controller', which depends on express-specific technologies,
such as router.get and router.post.

It maps paths to the respective controller functions,
passing (to the controller functions == handlers)
the parsed request parameters as plain javascript objects
*/

// @ts-check
const express = require("express")
const controllerPath = "../controllers/"

const controller = require(controllerPath + "userController.js")
const userRouter = express.Router()

userRouter.get("/getUser/:username/:pw", (req, res) => {
  //result is the 'model view'.
  //it's a model and also a view because it's data(model) and also
  //what we finally send to the client(view)
  let result = controller.getUser(req.params)
  res.json(result)
})

userRouter.post("/createUser/username/pw", (req, res) => {
  let result = controller.createUser(req.body)
  res.json(result)
})

module.exports = { userRouter }
