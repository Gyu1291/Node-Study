const { MongoClient } = require("mongodb")

const mongo = require("mongodb").MongoClient
const uri =
  "mongodb+srv://mongo:mongo1234qwer@cluster0.ny5iwpg.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// a simple example for querying mongo db
// decided to use RDB for cards service.
// mongo may be handy with daily missions
var mongoRepository = {
  basic: async function main() {
    await client.connect()
    const cards = client.db("mongo").collection("cards")

    await cards.deleteMany({})
    await cards.insertMany([
      {
        name: "Alice",
        cards: ["A", "A", "B"],
      },
      {
        name: "Bob",
        cards: ["A", "B", "B"],
      },
      {
        name: "Charlie",
        cards: ["A", "A", "A"],
      },
    ])
  },
}

module.exports = { mongoRepository }
