import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dummyMoney = new Schema({
  money: {
    type: Number
  },
  code: {
    type: String
  }
});

const DummyMoney = mongoose.model("DummyMoney", dummyMoney);

export default DummyMoney;
