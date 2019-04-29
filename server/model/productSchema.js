import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "please add your own product"]
    },
    stock: {
      type: Number,
      required: [true, "please fill how many stock you want to put"]
    },
    desc: {
      type: String
    },
    price: {
      type: Number
    },
    image: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
