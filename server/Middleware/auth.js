const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");
const db = require("../db");

module.exports = (req, res, next) => {
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

  db.getDb()
    .db()
    .collection("User")
    .findOne({ _id: new mongodb.ObjectId(userID) })
    .then((resp) => {
      if (resp) {
        const type = resp.type;
        req.type = type;
      } else {
        res.status(400).json({ auth: "fail" });
        return;
      }
    })
    .catch((er) => {
      console.log(er);
    });

  req.auth = true;
  next();
};
