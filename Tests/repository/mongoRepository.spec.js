const { mongoRepository } = require("../../Source/repository/cardRepository.js")

test("mongoRepository", () => {
  mongoRepository.basic()
})
