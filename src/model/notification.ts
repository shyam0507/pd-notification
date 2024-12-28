import mongoose from "mongoose";

const schema = new mongoose.Schema({ orderId: String, status: String });
const Notification = mongoose.model("Notification", schema);

export { Notification };
