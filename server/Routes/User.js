const Router = require("express").Router;
const router = Router();
const User = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router.post("/login", User.Login);

router.post("/register", User.Register);

router.put("/role", auth, User.ChangeRole);

router
  .route("/favorites")
  .get(auth, User.GetFavorites)
  .put(auth, User.SetFavorite);

router
  .route("/dp/:id")
  .get(auth, User.GetDP)
  .delete(auth, User.DeleteDp)
  .post(auth, User.UploadDp);

router.get("/", auth, User.GetUser);

router.put("/", auth, User.UpdateUser);

module.exports = router;
