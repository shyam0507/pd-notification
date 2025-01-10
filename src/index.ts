import express from "express";
import { OrderConfirmedConsumer } from "./events/order-confirmed-consumer";
import mongoose from "mongoose";
const { Kafka, logLevel } = require("kafkajs");

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World, from pd-notification!");
});

//Kafka consumer and producer
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [process.env.KAFKA_BROKERS as string],
  clientId: "notification-consumer",
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const consumer = kafka.consumer({ groupId: "notification-group" });
consumer.connect();

new OrderConfirmedConsumer(consumer).start();

mongoose.connect(process.env.MONGO_URI + "/pd_notifications");

app.listen(3007, () => {
  console.log("Server is running on port 3007");
});
