// @ts-check
const { songRepository } = require("../../Source/repository/songRepository.js")

test("userRepository-save-user", async () => {
    let userId = 123;
    let songName = "Cheerup"
    let artistId = 444;
    let score = 100;
    let stars = 3;
    var highScoreTable = null;
  try {
    await songRepository.addPlayRecord(userId, songName, artistId, score, stars)
    highScoreTable = await songRepository.selectHighScore(userId)
  } catch (e) {
    console.log(e)
  } finally {
    expect(highScoreTable[0]?.userId).toBe(userId)
    expect(highScoreTable[0]?.songName).toBe(songName)
  }
})

// @AfterEach
afterEach(async () => await songRepository.flushTable())
