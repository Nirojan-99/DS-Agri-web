const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

module.exports = async (req, res, next) => {
  //check header
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    res.status(400).json({ auth: "fail" });
    return;
  }
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    res.status(400).json({ auth: "fail" });
    return;
  }

  let decodedToken;

  try {
    //check token
    decodedToken = jwt.verify(token, "Agriuservalidation");
  } catch (err) {
    res.status(400).json({ auth: "fail" });
    return;
  }
  if (!decodedToken) {
    res.status(400).json({ auth: "fail" });
    return;
  }
  req.userID = decodedToken.userID;
  userID = decodedToken.userID;

  const resp = await Users.findById(userID);
  if (resp) {
    req.role = resp.role;
  } else {
    res.status(400).json({ auth: "fail" });
    return;
  }

  req.auth = true;
  next();
};
