const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
await producer.connect().then(console.log("producer connected"));

const sendMessages = async (topic, messages) => {
  await producer.send({
    topic: topic,
    messages: [{ value: messages }],
  });
};

module.exports = {messageProducer}
