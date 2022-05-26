const Payments = require("../Models/PaymentModel");
const Users = require("../models/userModel");
const Payment = require("../Models/PaymentModel");
const { mailSender } = require("../Utils/mailSender");

const stripe = require("stripe")(
  "sk_test_51Kx6nmHWfJlN8CzRA5pkvIyuA1MDC4K5JXxIpgme3LlOi1oKgY2vwC4xloJYMyRuCz98ppbGv1sUpFc4wTAVNU6o001wPMW7Wq"
);
const uuid = require("uuid").v4;

//get payment data
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
          return res.status(404).json({ fetched: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  } else {
    Payments.findOne({ order_id: order_id })
      .then((data) => {
        if (data) {
          return res.status(200).json({ exist: "yes" });
        } else {
          return res.status(404).json({ fetched: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  }
};

// add payment data
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

  const OTP = Math.floor(100000 + Math.random() * 900000);
  if (method === "mobile") {
    
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
            return res.status(200).json({ added: true });
          })
          .catch((er) => {
            console.log(er)
            return res.status(404).json({ added: false });
          });
      })
      .catch((er) => {
        
      });
  } else {
    const { token } = req.body;
    const idempotencyKey = uuid();

    //data
    const newPayment = new Payments({
      user_id,
      order_id,
      amount,
      method,
      card_number: token.card.last4,
      expiry_year: token.card.exp_year,
      expiry_month: token.card.exp_month,
      name_on_card: token.card.brand,
      OTP,
    });

    stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges
          .create(
            {
              amount: amount * 100,
              currency: "usd",
              customer: customer.id,
              receipt_email: token.email,
              description: `Purchased the ${order_id}`,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip,
                },
              },
            },
            {
              idempotencyKey,
            }
          )
          .then((data) => {
            newPayment
              .save()
              .then((data) => {
                Users.cart.$set([]).then((data) => {});
                return res.status(200).json({ success: true });
              })
              .catch((er) => {
                return res.status(200).json({ success: true });
              });
          })
          .catch((er) => {
            return res.status(404).json({ success: false });
          });
      });
  }
};

// otp check
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
        return res.status(404).json({ ok: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ ok: false });
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
