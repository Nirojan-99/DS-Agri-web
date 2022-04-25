const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
