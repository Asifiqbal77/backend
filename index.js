import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/application.js";
import tourRoutes from "./routes/tour.js";
import paymentRoutes from "./routes/payment.js";
import bookingRoutes from "./routes/booking.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const url = process.env.MONGODB_URL || "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";
const PORT = process.env.PORT || 5000;

// IMPORTANT: Keep webhook route using raw body (we mount paymentRoutes after we set express.json)
// We'll still set express.json globally, but the /api/payment/webhook route uses express.raw in its route file.
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Database connect
mongoose.connect(url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Existing routes (no change)
app.use("/api", authRoutes);
app.use("/api/tours", tourRoutes);

// NEW routes
app.use("/api/payment", paymentRoutes);     // /api/payment/create-checkout-session
app.use("/api/bookings", bookingRoutes);    // /api/bookings  (GET protected)

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















//original code below



// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/application.js";
// import tourRoutes from "./routes/tour.js";
// import bodyParser from "body-parser";

// const app = express();
// const url = "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";

// app.use(cors());
// app.use(express.json());

// // Database connect
// mongoose.connect(url)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api", authRoutes);
// app.use("/uploads", express.static('uploads'));
// app.use("/api/tours", tourRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));