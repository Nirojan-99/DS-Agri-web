const Router = require("express").Router;
const router = Router();
const User = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");

router.post("/login", User.Login);
router.post("/register", User.Register);
router.put("/role", auth, User.ChangeRole);
// router.get("/dp/:id", auth, User.GetDP);
// router.put("/dp", auth, User.DeleteDp);
router.get("/", auth, User.GetUser);
router.put("/", auth, User.UpdateUser);

router
  .route("/dp/:id")
  .get(auth, User.GetDP)
  .delete(auth, User.DeleteDp)
  .post(auth.User.UploadDp);

module.exports = router;
