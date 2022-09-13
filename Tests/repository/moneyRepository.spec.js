// @ts-check
const { userRepository } = require("../../Source/repository/userRepository.js")
const {
  moneyRepository,
} = require("../../Source/repository/moneyRepository.js")

test("moneyRepository-update-RP", async () => {
  let userId = "1234"
  let username = "Alice"
  var result = null
  try {
    await userRepository.createUser(userId, username)
    await moneyRepository.createEntry(userId)
    await moneyRepository.setRPBalance(userId, 100)
    await moneyRepository.updateRPBalance(userId, 100)
    result = await moneyRepository.queryBalance(userId)
  } catch (e) {
    console.log(e)
  } finally {
    expect(result?.userId).toBe(userId)
    expect(result?.DIA_amount).toBe(0)
    expect(result?.RP_amount).toEqual(200)
  }
})

//@AfterEach

afterEach(async () => {
  await userRepository.flushTable()
  await moneyRepository.flushTable()
})
