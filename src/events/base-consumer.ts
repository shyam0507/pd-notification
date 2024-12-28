import { Kafka } from 'kafkajs';

export abstract class BaseConsumer<T> {
    abstract topic: string;

    constructor(
        protected consumer: any,
    ) {
        this.consumer = consumer;
    }


    public  async start(): Promise<void> {
        console.log('Kafka consumer started');
        await this.consumer.subscribe({ topic: this.topic })
        await this.consumer.run({
            //@ts-ignore
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                // console.log({
                //     key: message.key.toString(),
                //     value: message.value.toString(),
                //     headers: message.headers,
                // })

                  
                await this.onEachMessage(JSON.parse(message.value.toString()));
            },
        })
        
    }

    public abstract onEachMessage(data: T): Promise<void>;
}