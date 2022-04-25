const Router = require("express").Router;
const router = Router();
const User = require("../Controller/UserCtrl");
const auth = require("../Middleware/auth");

router.post("/login", User.Login);
router.post("/register", User.Register);
router.get("/", auth, User.GetUser);
router.put("/", auth, User.UpdateUser);

module.exports = router;
