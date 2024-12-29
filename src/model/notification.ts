import mongoose from "mongoose";

const schema = new mongoose.Schema({ order_id: String, status: String });
const Notification = mongoose.model("Notification", schema);

export { Notification };
