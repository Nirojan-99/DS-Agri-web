const Router = require("express").Router;
const router = Router();
const Payment = require("../Controller/PaymentCtrl");
const auth = require("../Middleware/auth");

router
  .route("/payment")
  .post(auth, Payment.AddPayment)
  .get(auth, Payment.GetPayment)
  .put(auth, Payment.CheckOTP)
  .delete(auth, Payment.DeletePayment);

module.exports = router;
