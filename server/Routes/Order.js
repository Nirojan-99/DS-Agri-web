const Router = require("express").Router;
const router = Router();
const Order = require("../Controller/OrderCtrl");
const auth = require("../Middleware/auth");
const authAdmin = require("../Middleware/authAdmin");

router
  .route("/order")
  .post(auth, Order.AddOrder)
  .get(auth,Order.GetOrder)
  .put(auth, Order.UpdateOrder);

module.exports = router;
