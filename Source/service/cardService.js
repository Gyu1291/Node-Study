const datasource = require("../../datasource.js")
const { userRepository } = require("../repository/userRepository.js")
const { CardRepository } = require("../repository/cardRepository.js")
const { randomInt } = require("crypto")
const { Card } = require("../domain/Card.js")

exports.openCardPack = async function (userId, count, premium = false) {
  //TODO: open card pack and use repository!
  var cards = []
  for (let i = 0; i < count; i++) {
    cardRepository = await CardRepository.instance()
    n = cardRepository.allCardTypes.length
    randomCard = cardRepository.allCardTypes[randomInt(n)]
    cards.push(new Card(randomCard.card_name, randomCard.theme, "C", 1))
  }
  // do not await this call
  cards.forEach((item) => cardRepository.addCard(userId, item))
  //cardRepository.addManyCards(userId, cards)
}
