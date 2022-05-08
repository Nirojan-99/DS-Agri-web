const Orders = require("../Models/OrderModel");
const Products = require("../Models/ProductModel");

exports.AddOrder = (req, res) => {
  const { products, user_id, total } = req.body;
  const newOrder = new Orders({ products, user_id, total });
  newOrder
    .save()
    .then((data) => {
      return res.status(200).json({ _id: data._id });
    })
    .catch((er) => {
      return req.stat(404).json({ added: false });
    });
};

exports.UpdateOrder = (req, res) => {
  const { address, city, province, postalcode, country, _id, payment } =
    req.body;
  let filter = {};

  if (address) {
    filter.address = { address, city, province, postalcode, country };
  }
  if (payment) {
    filter.payment = true;
  }

  Orders.updateOne({ _id }, { $set: filter })
    .then((data) => {
      res.status(200).json({ updated: true });
    })
    .catch((er) => {
      res.status(404).json({ updated: false });
    });
};

exports.GetOrder = (req, res) => {
  const { _id, userID } = req.query;
  if (userID) {
    Orders.find({ user_id: userID })
      .then((data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ fetched: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  } else {
    Orders.findById({ _id })
      .then((data) => {
        if (data.address.address) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ fetched: false });
        }
      })
      .catch((er) => {
        return res.status(404).json({ fetched: false });
      });
  }
};

exports.GetOrders = async (req, res) => {
  const { id } = req.params;
  let product_id = [];
  let data1 = {};

  Products.find({ user_id: id })
    .then((data) => {
      if (data) {
        data.forEach((row) => {
          product_id.push(row._id);
        });

        product_id.forEach((row) => {
          data1[row] = [];
        });

        Orders.find({ status: false }, { products: 1, address: 1 }).then(
          (data) => {
            data.forEach((val) => {
              product_id.forEach((row) => {
                if (val.products[row]) {
                  data1[row].push({
                    address: val.address,
                    count: val.products[row],
                  });
                }
              });
            });

            return res.status(200).json(data1);
          }
        );
      } else {
        return res.status(404).json({ fetched: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

exports.DeleteOrder = (req, res) => {
  //TODO
};
