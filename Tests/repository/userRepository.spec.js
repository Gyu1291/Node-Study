// @ts-check
const { userRepository } = require("../../Source/repository/userRepository.js")
const { pool } = require("../../datasource.js")

test("userRepository.getThree", async () => {
  try {
    var res = await userRepository.getThree()
    expect(res.three).toBe(3)
  } catch (error) {
    console.log(error)
  }
})
