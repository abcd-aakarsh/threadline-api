import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import { Product } from "./models/products.model.js";

import { errorHandler } from "./middlewares/error.middleware.js";

import productRoutes from "./routes/product.routes.js";
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});
app.use("/api/v1/products", productRoutes);

app.use(errorHandler);

const start = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
start();
