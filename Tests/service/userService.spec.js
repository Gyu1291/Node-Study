//@ts-check
const userService = require("../../Source/service/userService.js")
const { userRepository } = require("../../Source/repository/userRepository.js")

test("userService-transaction-fail", async () => {
  let userId = "FAIL"
  await expect(userService.doTransaction(userId)).rejects.toBe(
    "TRANSACTION FAILS!"
  )
})

test("userService-transaction-success", async () => {
  let userId = "SUCCESS"
  await expect(userService.doTransaction(userId)).resolves.toBe(0)
})

// @AfterEach
//afterEach(async () => await userRepository.flushTable())
