const Products = require("../Models/ProductModel");
const fs = require("fs");

//add new product
exports.NewProduct = (req, res) => {
  const { price, title, description, category, id, user_id } = req.body;
  const date = Date.now();

  if (req.files) {
    let fileToUpload = req.files.image;
    const fileName = id + date + fileToUpload.name;

    fileToUpload.mv("Uploads/" + fileName, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).json({ added: false });
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
            return res.status(200).json({ added: true });
          })
          .catch(() => {
            return res.status(404).json({ added: false });
          });
      }
    });
  }
};

//get products data according to the query
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
      Products.countDocuments({...findFiler}).then((cdata) => {
        return res.status(200).json({ data, cdata });
      });
    })
    .catch((er) => {
      res.status(404).json({ fetched: false });
    });
};

//delete product
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
          return res.status(200).json({ deleted: true });
        });
      } else {
        return res.status(404).json({ deleted: false });
      }
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({ deleted: false });
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({ deleted: false });
    });
};

//get single product data
exports.GetProduct = (req, res) => {
  const { _id } = req.params;
  Products.findById({ _id })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

//update single product data
exports.UpdateProduct = (req, res) => {
  const { price, title, description, category, id, user_id, _id } = req.body;
  const date = Date.now();
  let oldImage;

  if (req.files) {
    Products.findById({ _id }, { images: 1 }).then((data) => {
      oldImage = data.images;
      const oldPath = oldImage.split("http://localhost:5000/")[1];
      let fileToUpload = req.files.image;
      const fileName = id + date + fileToUpload.name;

      fileToUpload.mv("Uploads/" + fileName, (error) => {
        if (error) {
          return res.status(404).json({ updated: false });
        } else {
          const link = "http://localhost:5000/Uploads/" + fileName;
          Products.findByIdAndUpdate(
            { _id },
            { $set: { price, title, description, category, id, images: link } }
          )
            .then((data) => {
              fs.unlink(oldPath, (er) => {
                if (er) {
                  console.log(er);
                } else {
                  return res.status(200).json({ updated: true });
                }
              });
            })
            .catch((er) => {
              return res.status(404).json({ updated: false });
            });
        }
      });
    });
  } else {
    Products.findByIdAndUpdate(
      { _id },
      { $set: { price, title, description, category, id } }
    )
      .then((data) => {
        return res.status(200).json({ updated: true });
      })
      .catch((er) => {
        return res.status(404).json({ updated: false });
      });
  }
};
