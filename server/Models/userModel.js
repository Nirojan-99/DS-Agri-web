const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "client",
    },
    cart: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
    address: {
      type: Object,
      default: {},
    },
    images: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
