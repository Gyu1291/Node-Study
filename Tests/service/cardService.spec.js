const cardService = require("../../Source/service/cardService.js")
const { CardRepository } = require("../../Source/repository/cardRepository.js")

test("random card pack", async () => {
  let userId = "3"
  let result = null
  try {
    cardService.openCardPack(userId, 5, false)
    await setTimeout(() => {}, 1000)
    const cardRepository = await CardRepository.instance()
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
    expect(result.rows?.length).toBeGreaterThan(1)
  }
})

//@AfterEach
/*
afterEach(async () => {
  await cardRepository.deleteAllWithUser("3")
})
*/
