const Payments = require("../Models/PaymentModel");
const Users = require("../models/userModel");

exports.GetPayment = (req, res) => {
  const { order_id } = req.query;
  Payments.findOne({ order_id: order_id })
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

exports.AddPayment = (req, res) => {
  const {
    user_id,
    order_id,
    amount,
    method,
    mobile_number,
    card_number,
    expiry_year,
    expiry_month,
    cvv,
    name_on_card,
  } = req.body;

  const newPayment = new Payments({
    user_id,
    order_id,
    amount,
    method,
    mobile_number,
    card_number,
    expiry_year,
    expiry_month,
    cvv,
    name_on_card,
  });

  newPayment
    .save()
    .then((data) => {
      return res.status(200).json({});
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.CheckOTP = (req, res) => {
  const { OTP, order_id, userID } = req.body;
  Payments.findOne({ order_id: order_id })
    .then((data) => {
      if (+OTP === data.OTP) {
        Users.findByIdAndUpdate({ _id: userID }, { $set: { cart: [] } }).then(
          () => {
            return res.status(200).json({ ok: true });
          }
        );
      } else {
        return res.status(404).json({});
      }
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};
