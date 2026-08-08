import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import { Product } from "./models/products.model.js";

import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.post("/api/v1/products", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

app.use(errorHandler);

const start = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
start();
