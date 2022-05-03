const Payments = require("../Models/PaymentModel");
const Users = require("../models/userModel");
const Payment = require("../Models/PaymentModel");

exports.GetPayment = (req, res) => {
  const { order_id, userID } = req.query;
  if (userID) {
    Payments.findOne(
      { user_id: userID },
      { expiry_year: 1, expiry_month: 1, card_number: 1 }
    )
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({});
        }
      })
      .catch((er) => {
        res.status(404).json({});
      });
  } else {
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
  }
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
            Payment.findByIdAndUpdate(
              { _id: order_id },
              { $set: { Payment: true } }
            );
            // :TODO increase sold count
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

exports.DeletePayment = (req, res) => {
  const { _id } = req.query;
  Payments.deleteOne({ _id })
    .then((data) => {
      res.status(200).json({ deleted: true });
    })
    .catch((er) => {
      res.status(404).json({ deleted: false });
    });
};
