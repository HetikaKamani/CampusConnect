import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"; // ✅ ADD THIS

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 Admin Auth Routes
app.use("/api/admin", authRoutes);

// 📅 Event Routes
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("CampusConnect API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
