
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/application.js";
import tourRoutes from "./routes/tour.js";
import bodyParser from "body-parser";

const app = express();
const url = "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());

// Database connect
mongoose.connect(url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", authRoutes);
app.use("/uploads", express.static('uploads'));
app.use("/api/tours", tourRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));