const datasource = require("../../datasource.js")
const { userRepository } = require("../repository/userRepository.js")

exports.doTransaction = async function (userId) {
  let tr = await datasource.getTransaction()
  try {
    await tr.begin()
    await userRepository.createUser(userId, "Alice", tr)
    if (userId == "FAIL") throw "TRANSACTION FAILS!"
    await tr.commit()
    return 0
  } catch (e) {
    await tr.rollback()
    throw e
  }
}
