const Router = require("express").Router;
const router = Router();
const User = require("../Controller/UserCtrl");

router.post("/login", User.Login);

module.exports = router;
