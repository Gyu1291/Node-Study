const { userRepository } = require("../../Source/repository/userRepository.js")
const { CardRepository } = require("../../Source/repository/cardRepository.js")
const { Card } = require("../../Source/domain/Card.js")

test("getAllCards", async () => {
  let userId = "3"
  var result = null
  try {
    var cardRepository = await CardRepository.instance()

    console.log(cardRepository.allCardTypes.length)
    result = await cardRepository.selectCardsUser(userId)
    result.rows.forEach((item) =>
      console.log({
        card_id: item.card_id,
        card_name: item.card_name,
        theme: item.theme,
        grade: item.grade,
        level: item.level,
      })
    )
  } catch (e) {
    console.log(e)
  } finally {
    expect(result.rows?.length).toBeGreaterThan(0)
  }
})
