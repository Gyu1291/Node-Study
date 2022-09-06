const controller = require("../../Source/controllers/userController.js")

test("create test", () => {
  //given
  var params = { username: "Alice", pw: "1234" }
  //when
  var mv = controller.createUser(params)
  //then
  expect(mv.id).toBe("Alice")
  expect(mv.pw).toBe("1234")
})
