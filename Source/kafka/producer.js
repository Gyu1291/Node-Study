const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer();

var messageProducer = {
  run : async()=>{
    //await producer.connect().then(console.log("producer connected"));
  },

  sendMessages: async (topic, messages) => {
    await producer.connect().then(console.log("producer connected"));
    await producer.send({
      topic: "play-record", //원래 topic으로 넣어주면 된다.
      messages: [{ value: messages}],
    }).then(console.log("successfully send!!"));
    await producer.disconnect();
  }
}



module.exports = {messageProducer}
