const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  console.log(val, _id, pid);
  if (val) {
    Users.findByIdAndUpdate({ _id }, { $addToSet: { favorites: pid } })
      .then((data) => {
        res.status(200).json({});
      })
      .catch((er) => {
        res.status(404).json({});
      });
  } else {
    Users.findByIdAndUpdate({ _id }, { $pull: { favorites: pid } })
      .then((data) => {
        res.status(200).json({});
      })
      .catch((er) => {
        res.status(404).json({});
      });
  }
};
