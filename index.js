// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/application.js";
// import tourRoutes from "./routes/tour.js";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const url = process.env.MONGODB_URL || "mongodb://localhost:27017/your-db-name";

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Database connect
// mongoose.connect(url)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api", authRoutes);
// app.use("/uploads", express.static('uploads'));
// app.use("/api/tours", tourRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









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