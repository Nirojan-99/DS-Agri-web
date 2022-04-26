const Router = require("express").Router;
const router = Router();
const Product = require("../Controller/ProductCtrl");
const auth = require("../Middleware/auth");
const authAdmin = require("../Middleware/authAdmin");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router
  .route("/product")
  .post(auth, authAdmin, Product.NewProduct)
  .get(auth, Product.GetProducts)
  .delete(auth, authAdmin, Product.DeleteProduct);

module.exports = router;
