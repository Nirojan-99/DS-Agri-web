const Router = require("express").Router;
const router = Router();
const User = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router.post("/login", User.Login);

router.put("/role", auth, User.ChangeRole);

router.post("/password", User.SendOtp);

router
  .route("/password/:_id")
  .post(User.ResetPassword)
  .get(User.CheckResetValidity);

router
  .route("/favorites")
  .get(auth, User.GetFavorites)
  .put(auth, User.SetFavorite);

router
  .route("/carts")
  .put(auth, User.AddCart)
  .delete(auth, User.RemoveCartEle)
  .get(auth, User.getCart);

router
  .route("/dp/:id")
  .get(auth, User.GetDP)
  .delete(auth, User.DeleteDp)
  .post(auth, User.UploadDp);

router
  .route("/")
  .get(auth, User.GetUser)
  .put(auth, User.UpdateUser)
  .post(User.Register);

module.exports = router;
