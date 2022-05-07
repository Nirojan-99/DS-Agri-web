const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { mailSender } = require("../Utils/mailSender");

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
      return res.status(404).json({ auth: false });
    }
  });
};

exports.Register = async (req, res) => {
  const { firstName, lastName, email, password, mobile_number } = req.body;
  const data = await Users.findOne({ email });
  if (data) {
    return res.status(404).json({ msg: "email already exist" });
  }
  const newUser = new Users({
    firstName,
    lastName,
    email,
    password,
    mobile_number,
  });
  await newUser.save().then((data) => {
    if (data._id) {
      const token = jwt.sign(
        { userID: data._id, email: data.email },
        "Agriuservalidation",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token, _id: data._id, type: data.role });
    } else {
      return res.status(404).json({ created: false });
    }
  });
};

exports.GetUser = (req, res) => {
  const _id = req.query.ID;
  Users.findById(_id)
    .then((data) => {
      return res.status(200).json({ ...data._doc, password: "" });
    })
    .catch((er) => {
      return res.status(404);
    });
};

exports.UpdateUser = (req, res) => {
  const {
    firstName,
    lastName,
    address,
    mobile_number,
    _id,
    password,
    newPassword,
  } = req.body;

  if (password) {
    Users.findById(_id).then((data) => {
      if (data._doc.password === password) {
        Users.findByIdAndUpdate({ _id }, { password: newPassword }).then(() => {
          res.status(200).json({});
        });
      } else {
        return res.status(404).json({});
      }
    });
  } else {
    Users.findByIdAndUpdate(
      { _id },
      { firstName, lastName, address, mobile_number }
    )
      .then((data) => {
        return res.status(200).json({});
      })
      .catch((er) => {
        return res.status(404).json({});
      });
  }
};

exports.ChangeRole = (req, res) => {
  const role = req.body.role;
  const _id = req.body._id;
  // delete products when change to client
  Users.findByIdAndUpdate({ _id }, { role })
    .then((data) => {
      return res.status(200).json({});
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.GetDP = (req, res) => {
  const _id = req.params.id;
  Users.findById(_id)
    .then((data) => {
      return res.status(200).json({ images: data._doc.images });
    })
    .catch((er) => {
      console.log(er);
    });
};

exports.DeleteDp = (req, res) => {
  const _id = req.params.id;
  Users.findByIdAndUpdate({ _id }, { images: "" })
    .then((data) => {
      const path = data.images.split("http://localhost:5000/")[1];
      fs.unlink(path, (er) => {
        if (er) {
          console.log(er);
        }
      });
      return res.status(200).json({});
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.UploadDp = (req, res) => {
  const _id = req.body.id;
  const date = Date.now();
  if (req.files) {
    let fileToUpload = req.files.image;
    const fileName = _id + date + fileToUpload.name;

    fileToUpload.mv("Uploads/" + fileName, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).json({});
      } else {
        const link = "http://localhost:5000/Uploads/" + fileName;
        Users.findByIdAndUpdate({ _id }, { images: link })
          .then((data) => {
            return res.status(200).json({});
          })
          .catch((er) => {
            return res.status(404).json({});
          });
      }
    });
  }
};

exports.GetFavorites = (req, res) => {
  Users.findOne({ _id: req.query._id }, { favorites: 1 })
    .then((data) => {
      return res.status(200).json(data.favorites);
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.SetFavorite = (req, res) => {
  const { _id, pid, val } = req.body;
  if (val) {
    Users.findByIdAndUpdate({ _id }, { $addToSet: { favorites: pid } })
      .then((data) => {
        return res.status(200).json({});
      })
      .catch((er) => {
        return res.status(404).json({});
      });
  } else {
    Users.findByIdAndUpdate({ _id }, { $pull: { favorites: pid } })
      .then((data) => {
        return res.status(200).json({});
      })
      .catch((er) => {
        return res.status(404).json({});
      });
  }
};

exports.AddCart = (req, res) => {
  const { pid, _id, set } = req.body;

  if (set) {
    Users.updateOne({ _id }, { $addToSet: { cart: pid } })
      .then((data) => {
        return res.status(200).json({});
      })
      .catch((er) => {
        return res.status(404).json({});
      });
  } else {
    Users.findByIdAndUpdate({ _id }, { $pull: { cart: pid } })
      .then((data) => {
        return res.status(200).json({});
      })
      .catch((er) => {
        return res.status(404).json({});
      });
  }
};

exports.getCart = (req, res) => {
  const { _id } = req.query;

  Users.findOne({ _id }, { cart: 1 }, {})
    .then((data) => {
      return res.status(200).json(data.cart);
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.RemoveCartEle = (req, res) => {
  const { id, pid } = req.query;
  Users.findByIdAndUpdate({ _id: id }, { $pull: { cart: pid } })
    .then((data) => {
      return res.status(200).json({});
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};

exports.SendOtp = (req, res) => {
  const { email, OTP } = req.body;
  if (OTP) {
    Users.findOne({ email, OTP })
      .then((data) => {
        if (data) {
          res.status(200).json({ match: true, _id: data._id });
        } else {
          res.status(404).json({ match: false });
        }
      })
      .catch((er) => {
        res.status(404).json({ match: false });
      });
  } else {
    const OTP = Math.floor(1000 + Math.random() * 9000);
    //send otp to mail
    const to = email;
    const subject = "Reset Your Password";
    const text = `Please enter OTP : <b>${OTP}</b> to complete your password reset request.<br/>Thank you`;

    const val = mailSender(to, subject, text);

    Users.updateOne({ email }, { OTP: OTP }, { upsert: true })
      .then((data) => {
        res.status(200).json({ sent: true });
      })
      .catch((er) => {
        res.status(404).json({ sent: false });
      });
  }
};

exports.ResetPassword = (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;

  Users.findByIdAndUpdate({ _id }, { password: password, OTP: "" })
    .then((data) => {
      res.status(200).json({ updated: true });
    })
    .catch((er) => {
      res.status(404).json({ updated: false });
    });
};

exports.CheckResetValidity = (req, res) => {
  const { _id } = req.params;
  Users.findById({ _id })
    .then((data) => {
      if (data.OTP) {
        res.status(200).json({ found: true });
      } else {
        res.status(404).json({ found: false });
      }
    })
    .catch((er) => {
      res.status(404).json({ found: false });
    });
};
