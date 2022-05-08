const Payments = require("../Models/PaymentModel");
const Users = require("../models/userModel");
const Payment = require("../Models/PaymentModel");
const { mailSender } = require("../Utils/mailSender");

exports.GetPayment = (req, res) => {
  const { order_id, userID } = req.query;
  if (userID) {
    Payments.findOne(
      { user_id: userID },
      { expiry_year: 1, expiry_month: 1, card_number: 1 }
    )
      .then((data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({fetched:false});
        }
      })
      .catch((er) => {
        return res.status(404).json({fetched:false});
      });
  } else {
    Payments.findOne({ order_id: order_id })
      .then((data) => {
        if (data) {
          return res.status(200).json({ exist: "yes" });
        } else {
          return res.status(404).json({fetched:false});
        }
      })
      .catch((er) => {
        return res.status(404).json({fetched:false});
      });
  }
};

exports.AddPayment = (req, res) => {
  const OTP = Math.floor(100000 + Math.random() * 900000);

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
    OTP,
  });

  Users.findById({ _id: user_id }, { email: 1 })
    .then((data) => {
      //mailing data
      const to = data.email;
      const subject = "ABC bank - online transaction";
      const text = `Please enter OTP : <b>${OTP}</b> to complete your online payment request.<br/>Thank you.`;

      newPayment
        .save()
        .then((data) => {
          //send otp
          const val = mailSender(to, subject, text);
          return res.status(200).json({added:true});
        })
        .catch((er) => {
          return res.status(404).json({added:false});
        });
    })
    .catch((er) => {});
};

exports.CheckOTP = (req, res) => {
  const { OTP, order_id, userID } = req.body;
  Payments.findOne({ order_id: order_id })
    .then((data) => {
      if (+OTP === data.OTP) {
        Users.findByIdAndUpdate({ _id: userID }, { $set: { cart: [] } }).then(
          (userdata) => {
            //send confirmation mail
            const to = userdata.email;
            const subject = "AgriGo";
            const text = `Your order number #${order_id} is confirmed.<br/>We will send you an update when your order has shipped.`;

            const val = mailSender(to, subject, text);
            
            Payment.findByIdAndUpdate(
              { _id: order_id },
              { $set: { Payment: true } }
            ).then((data) => {
              // :TODO increase sold count
              return res.status(200).json({ ok: true });
            });
          }
        );
      } else {
        return res.status(404).json({ok:false});
      }
    })
    .catch((er) => {
      return res.status(404).json({ok:false});
    });
};

exports.DeletePayment = (req, res) => {
  const { _id } = req.query;
  Payments.deleteOne({ _id })
    .then((data) => {
      return res.status(200).json({ deleted: true });
    })
    .catch((er) => {
      return res.status(404).json({ deleted: false });
    });
};
