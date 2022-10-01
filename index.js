// @ts-check

const bodyParser = require("body-parser")
const express = require("express")
const userRouter = require("./Source/routes/userRouter.js")
const app = express()
const PORT = 3000

const kafkaProducer = require("./Source/kafka/producer.js");
kafkaProducer.messageProducer.run();
const sendData = [{
  user: 'soongyu',
  score: 113,
  songName: 'Honey',
}];
const stringData = sendData.toString();
kafkaProducer.messageProducer.sendMessages("play-record", "[{user: 'soongyu', score: 113, songName: 'Honey'}]");

app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log("server running on port " + PORT)
})
const currentRank = require("./Source/currentRank.js");

app.use("/users", userRouter.userRouter)
