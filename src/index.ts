import express from "express";
import { OrderConfirmedConsumer } from "./events/order-confirmed-consumer";
import mongoose from "mongoose";
const { Kafka, logLevel } = require('kafkajs')

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World, from pd-notification!");
});


//Kafka consumer and producer
const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`localhost:9092`],
    clientId: 'notification-consumer',
  })

  
const consumer = kafka.consumer({ groupId: 'notification-group' })
consumer.connect()

 new OrderConfirmedConsumer(consumer).start();

 mongoose.connect('mongodb://127.0.0.1:27017/pd_notifications');
 
app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
