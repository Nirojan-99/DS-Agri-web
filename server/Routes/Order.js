const Router = require("express").Router;
const router = Router();
const Order = require("../Controller/OrderCtrl");
const auth = require("../Middleware/auth");

router
  .route("/orders")
  .post(auth, Order.AddOrder)
  .get(auth, Order.GetOrder)
  .put(auth, Order.UpdateOrder);

router.get("/orders/:id", Order.GetOrders);

module.exports = router;
