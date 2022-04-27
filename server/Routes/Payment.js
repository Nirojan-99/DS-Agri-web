const Router = require("express").Router;
const router = Router();
const Payment = require("../Controller/PaymentCtrl");
const auth = require("../Middleware/auth");

router.route("/payment").post(auth).get(auth,Payment.GetPayment).put(auth);

module.exports = router;
