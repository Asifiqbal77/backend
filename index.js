// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/application.js";
// import tourRoutes from "./routes/tour.js";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config(); // load .env

// const app = express();
// const url = process.env.MONGODB_URL || "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";

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

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// // app.use(express.json());

// // // Example routes - prefix all with /api if using baseURL: "/api"
// // app.post("/api/register", (req, res) => { /* register logic */ });
// // app.post("/api/login", (req, res) => { /* login logic */ });
// // app.get("/api/tours", (req, res) => { /* tours logic */ });

// // // ...start server as usual
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });




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