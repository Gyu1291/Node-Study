const { Kafka } = require("kafkajs");


const connectConsumer = async() =>{
    const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"],
      });
    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect().then(console.log("consumer connected"));
}

const subscribeTopic = async(topic, fromBeginning, consumer) =>{
    await consumer.subscribe({topic: topic, fromBeginning: fromBeginning});
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
          });
        },
    });
}

module.exports = {messageConsumer}