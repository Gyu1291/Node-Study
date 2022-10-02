const datasource = require("../../datasource.js")
const sqlMapper = require("./mapper.js")
const { Card } = require("../domain/Card.js")
var mapper = sqlMapper.getMapper("cardMapper")

class CardRepository {
  static #instance = null
  static async instance() {
    if (CardRepository.#instance === null) {
      CardRepository.#instance = new CardRepository()
      //we block this call because we need this to run to completion
      //for correct initialization of #instance.
      await CardRepository.#instance.#start()
    }
    return CardRepository.#instance
  }
  /*
  cardRepository = new CardRepository()
  should still work, although we really shouldn't use it.
  */
  constructor() {
    //initialize!
    if (CardRepository.#instance) return CardRepository.#instance
    this.allCardTypes = []
  }

  async #start() {
    let query = mapper.makeQuery("selectAllCardTypes", {
      excludeLimitedThemes: true,
    })

    let conn = await datasource.getConnection()
    let result = await conn.query(query)
    result.rows.forEach((item) => {
      this.allCardTypes.push({
        card_name: item.card_name,
        theme: item.theme,
        group: item.group,
        isLimitedTheme: item.isLimitedTheme,
      })
    })
  }

  async addCard(user, card, transaction = null) {
    let query = mapper.makeQuery("addCard", {
      user: user,
      card_name: card.card_name,
      theme: card.theme,
      grade: card.grade,
      level: card.level,
    })
    datasource.executeQuery(transaction, query)
  }

  async addManyCards(user, cards, transaction = null) {
    let query = mapper.makeQuery("addManyCards", {
      user: user,
      list: cards,
    })
    datasource.executeQuery(transaction, query)
  }

  async selectCardsUser(user, transaction = null) {
    let query = mapper.makeQuery("selectCardsUser", {
      user: user,
    })
    return await datasource.executeQuery(transaction, query)
  }

  async deleteAllWithUser(user, transaction = null) {
    let query = mapper.makeQuery("deleteAllWithUser", {
      user: user,
    })
    datasource.executeQuery(transaction, query)
  }
}

module.exports = { CardRepository }
/*
_allCardTypes = []
async function start() {
  query = mapper.makeQuery("selectAllCardTypes", {
    excludeLimitedThemes: true,
  })
  conn = await datasource.getConnection()
  result = await conn.query(query)
  result.rows.forEach((item) => {
    _allCardTypes.push({
      card_name: item.card_name,
      theme: item.theme,
      group: item.group,
      isLimitedTheme: item.isLimitedTheme,
    })
  })
}
// public
async function cardRepositoryFactory() {
  await start()
  return {
    allCardTypes: _allCardTypes,
    addCard: async function (user, card, transaction = null) {
      query = mapper.makeQuery("addCard", {
        user: user,
        card_name: card.card_name,
        theme: card.theme,
        grade: card.grade,
        level: card.level,
      })
      datasource.executeQuery(transaction, query)
    },
    addManyCards: async function (user, cards, transaction = null) {
      query = mapper.makeQuery("addManyCards", {
        user: user,
        list: cards,
      })
      datasource.executeQuery(transaction, query)
    },
    selectCardsUser: async function (user, transaction = null) {
      query = mapper.makeQuery("selectCardsUser", {
        user: user,
      })
      return await datasource.executeQuery(transaction, query)
    },
    deleteAllWithUser: async function (user, transaction = null) {
      query = mapper.makeQuery("deleteAllWithUser", {
        user: user,
      })
      datasource.executeQuery(transaction, query)
    },
  }
}

exports.getCardRepository = cardRepositoryFactory
*/
