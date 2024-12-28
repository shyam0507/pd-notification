import { Notification } from "../model/notification";
import { BaseConsumer } from "./base-consumer";

export interface OrderConfirmedEvent {
  specversion: string;
  type: string;
  source: string;
  id: string;
  time: string;
  datacontenttype: string;
  data: {
    orderId: string;
    status: string;
  };
}

export class OrderConfirmedConsumer extends BaseConsumer<OrderConfirmedEvent> {
  public topic = "order.created";
  constructor(consumer: any) {
    super(consumer);
  }

  public async onEachMessage(data: OrderConfirmedEvent): Promise<void> {
    try {
      console.log("Received order confirmed event:", data);
      const notification = new Notification({
        orderId: data.data.orderId,
        status: data.data.status,
      });
      await notification.save();
      console.log("Notification saved successfully");
    } catch (error) {
      console.error("Error while processing order confirmed event:", error);
    }
  }
}
