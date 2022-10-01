const {createClient} = require('redis')
const redis = createClient();
const { Kafka } = require("kafkajs");
//const messageConsumer = './kafka/consumer.js';


redis.connect().then(console.log("Redis start"));


/*----------------------------------------------------------
   kafka  connect->코드에서 어떻게 뺄지? 연구좀 더 해보겠음...
-----------------------------------------------------------*/

const run = async()=>{

    const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"],
      });
    const consumer = kafka.consumer({ groupId: "test-group" });
    await consumer.connect().then(console.log("consumer connected"));
    await consumer.subscribe({topic: "play-record", fromBeginning: true});
     //beginning부터 본다는 것인데... 그럴 이유가 있을까?
     //k
    
    
    /*----------------------------------------------------------
       userScoreUpdate: kafka consumer
       topic: play-record만 사용할 예정
       partition: 
       message: json형태로 받아올 예정, kafka는 
    
       redis에서는 여러 모로 sorted set을 사용하는게 가장 좋아보인다.
       새로운 값을 기존 값과 비교해서 바꿔치기하는 작업이 많이 일어나는데
       리스트가 Sorted라고 가정하면, 이건 sort해주고 맨 아래 것과 값 비교->교체라는
       정형화된 방법으로 정리될 수 있기 때문
    -----------------------------------------------------------*/
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Message: "+ message.value);
            /*
            
            
            const objectMessage = JSON.parse(message);
            var count = await redis.ZCOUNT(objectMessage.user);
            if(count<5)
            {
                redis.ZADD(objectMessage.user, objectMessage.score, objectMessage.songName); //key, score, value
                console.log("success!")
            }
            else
            {
                var data = await redis.zRange(objectMessage.user, 0, -1); //가장 작은 값은 data 0 이다.
                if(data[0]<objectMessage.score)
                {
                    await redis.zRem(data[0]); //delete value
                    await redis.ZADD(objectMessage.user, objectMessage.score, objectMessage.songName);
                    console.log("success!")
                    //전체 랭크 비교하는 로직
                }
                else
                {
                    //song repository접근 후 데이터 저장하는 로직
                }
            }
            


            
            
            
            
            
            */
        }
    });
}

run().catch(console.error);

const userScoreUpdate = async(userName) =>{

}

//module.exports = {currentRank}