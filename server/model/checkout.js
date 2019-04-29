import mongoose from "mongoose";

const Schema = mongoose.Schema;

const checkOutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Person" },
    order: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    status: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    paid: {
      type: Boolean,
      default: false
    },
    address: {
      type: String
    },
    total: Number
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Checkout = mongoose.model("Checkout", checkOutSchema);

export default Checkout;
