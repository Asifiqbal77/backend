import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tourId: { type: String, required: true },
  tourName: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  amount: { type: Number, required: true },      // amount in smallest currency unit (e.g. cents or paisa)
  currency: { type: String, default: "usd" },
  status: { type: String, enum: ["pending","paid","cancelled"], default: "pending" },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
