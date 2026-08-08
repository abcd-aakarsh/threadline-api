import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import { Product } from "./models/products.model.js";
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.post("/api/v1/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.name === "ValidationError") {
      const details = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: "Validation failed", details });
    }
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

const start = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
start();
