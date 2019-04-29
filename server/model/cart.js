import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Person" },
  item: { type: Schema.Types.ObjectId, ref: "Product" },
  amount: {
    type: Number
  },
  paid: {
    type: Boolean,
    default: false
  }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
