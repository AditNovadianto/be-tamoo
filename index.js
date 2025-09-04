import express from "express";
import cors from "cors";
import { connectDB } from "./database/mongo.js";
import dataRoutes from "./routes/dataRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // biar audio bisa diakses

// Routes
app.use("/api/data", dataRoutes);

// Koneksi DB & start server
connectDB();

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
