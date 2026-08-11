import { mongoose } from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    color: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  { _id: true },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: true,
      enum: ["oversized", "graphic", "anime", "plain"],
    },
    variants: {
      type: [variantSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "Product must have at least one variant",
      },
    },
  },
  { timestamps: true },
);
export const Product = mongoose.model("Product", productSchema);
