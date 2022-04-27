const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      default: {
        address: "",
        city: "",
        province: "",
        postalcode: "",
        country: "",
      },
    },
    products: {
      type: Object,
      default: {},
    },
    status: {
      type: Boolean,
      default: false,
    },
    date_time: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
