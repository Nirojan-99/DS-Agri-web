const Payments = require("../Models/PaymentModel");
const fs = require("fs");

exports.GetPayment = (req, res) => {
  const { order_id } = req.query;
  Payments.findById({ order_id })
    .then((data) => {
      if (data) {
        res.status(200).json({ exist: "yes" });
      } else {
        res.status(404).json({});
      }
    })
    .catch((er) => {
      res.status(404).json({});
    });
};
