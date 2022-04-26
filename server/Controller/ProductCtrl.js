const Products = require("../Models/ProductModel");
const fs = require("fs");

exports.NewProduct = (req, res) => {
  const { price, title, description, category, id, user_id } = req.body;
  const date = Date.now();

  if (req.files) {
    let fileToUpload = req.files.image;
    const fileName = id + date + fileToUpload.name;

    fileToUpload.mv("Uploads/" + fileName, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).json({});
      } else {
        const link = "http://localhost:5000/Uploads/" + fileName;

        const newProduct = new Products({
          price,
          title,
          description,
          category,
          id,
          user_id,
          images: link,
        });

        newProduct
          .save()
          .then((data) => {
            return res.status(200).json({});
          })
          .catch(() => {
            return res.status(404).json({});
          });
      }
    });
  }
};

exports.GetProducts = (req, res) => {
  const pagination = req.query.pagination;
  const title = req.query.title;
  const favList = req.query.favList;
  const owner = req.query.owner;
  const skip = (pagination - 1) * 6;
  const limit = 6;

  const findFiler = {};
  if (title) {
    findFiler.title = { $regex: "^" + title };
  }
  if (favList) {
    favArray = favList.split(",");
    findFiler._id = { $in: favArray };
  }
  if (owner) {
    findFiler.user_id = owner;
  }
  Products.find({ ...findFiler }, {}, { skip, limit })
    .then((data) => {
      Products.countDocuments({}).then((cdata) => {
        return res.status(200).json({ data, cdata });
      });
    })
    .catch((er) => {
      res.status(404).json({});
    });
};

exports.DeleteProduct = (req, res) => {
  const user_id = req.userID;
  const _id = req.query._id;
  Products.findOne({ _id })
    .then((data) => {
      if (data.user_id === user_id) {
        const path = data.images.split("http://localhost:5000/")[1];
        fs.unlink(path, (er) => {
          if (er) {
            console.log(er);
          }
        });
        Products.deleteOne({ _id }).then((data) => {
          return res.status(200).json({});
        });
      } else {
        return res.status(404).json({});
      }
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({});
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({});
    });
};
