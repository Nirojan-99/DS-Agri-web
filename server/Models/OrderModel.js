const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: ObjectId,
    //   unique: true,
    // },
    user_id: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    products: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      default: false,
    },
    date_time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
