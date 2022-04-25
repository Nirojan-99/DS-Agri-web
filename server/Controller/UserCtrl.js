const mongodb = require("mongodb");
const db = require("../db");

const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const newuser = new Users({
//     firstName: "niro",
//     lastName: "yoga",
//     email: "email@",
//     password: "pass",
//     mobile_number: "2222",
//   });

exports.Login = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email, password }).then((data) => {
    if (data) {
      const token = jwt.sign(
        { userID: data._id, email: data.email },
        "Agriuservalidation",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token, _id: data._id, type: data.role });
    } else {
      return res.status(400).json({ auth: false });
    }
  });
};
