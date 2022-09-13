// @ts-check
const { userRepository } = require("../../Source/repository/userRepository.js")

test("userRepository-save-user", async () => {
  let userId = "123"
  let username = "Alice"
  var foundUser = { userId: undefined, username: undefined }
  try {
    await userRepository.createUser(userId, username)
    foundUser = await userRepository.selectUser(userId)
  } catch (e) {
    console.log(e)
  } finally {
    expect(foundUser.userId).toBe(userId)
    expect(foundUser.username).toBe(username)
  }
})

// @AfterEach
afterEach(async () => await userRepository.flushTable())
