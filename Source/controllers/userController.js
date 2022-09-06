/*
controller for creating users
the simplest of all controllers - it creates the model view directly,
but with more complex situations, the 
@Service layer(=logic) and the 
@Repository layer(=DB access) should be separated 
from the controller. (will be described later)
*/

// @ts-check
const { userRepository } = require("../repository/userRepository.js")

exports.createUser = function createUser(params) {
  return { id: params.username, pw: params.pw, timestamp: new Date() }
}

exports.getUser = function getUser(params) {
  return { id: params.username, timestamp: new Date() }
}

exports.getThree = async function getThree(params) {
  try {
    let result = await userRepository.getThree()
    console.log(result)
  } catch (err) {
    throw err
  }
  return
}
