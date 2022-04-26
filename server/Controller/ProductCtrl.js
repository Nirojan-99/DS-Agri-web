const Products = require("../Models/ProductModel");

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

  const skip = (pagination - 1) * 6;
  const limit = 6;

  Products.find({}, {}, { skip, limit })
    .then((data) => {
      Products.countDocuments({}).then((cdata) => {
        return res.status(200).json({ data, cdata });
      });
    })
    .catch((er) => {
      res.status(404).json({});
    });
};

exports.GetProduct = (req, res) => {};
