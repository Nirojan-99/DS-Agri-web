const { Int32, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: String,
    //   required: true,
    // },
    _id: {
      unique: true,
      type: ObjectId,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      default: 0,
    },
    card_number: {
      type: Number,
      default: 0,
    },
    expiry_year: {
      type: Number,
      default: 0,
    },
    expiry_month: {
      type: Number,
      default: 0,
    },
    cvv: {
      type: Number,
      default: 0,
    },
    name_on_card: {
      type: String,
      default: "",
    },
    dateTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", paymentSchema);
