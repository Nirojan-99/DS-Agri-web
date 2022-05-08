const Router = require("express").Router;
const router = Router();
const Product = require("../Controller/ProductCtrl");
const auth = require("../Middleware/auth");
const authAdmin = require("../Middleware/authAdmin");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router.get("/products/:_id", auth, Product.GetProduct);

router
  .route("/products")
  .post(auth, authAdmin, Product.NewProduct)
  .get(auth, Product.GetProducts)
  .delete(auth, authAdmin, Product.DeleteProduct)
  .put(auth, authAdmin, Product.UpdateProduct);

module.exports = router;
