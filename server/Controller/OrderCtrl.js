const Orders = require("../Models/OrderModel");
const fs = require("fs");

exports.AddOrder = (req, res) => {
  const { products, user_id, total } = req.body;
  const newOrder = new Orders({ products, user_id, total });
  newOrder
    .save()
    .then((data) => {
      return res.status(200).json({ _id: data._id });
    })
    .catch((er) => {
      return req.stat(404).json({});
    });
};

exports.UpdateOrder = (req, res) => {
  console.log("xx");
  const { address, city, province, postalcode, country, _id, payment } =
    req.body;
  let filter = {};

  if (address) {
    filter.address = { address, city, province, postalcode, country };
  }
  if (payment) {
    filter.payment = true;
  }
  console.log(filter);

  Orders.updateOne({ _id }, { $set: filter })
    .then((data) => {
      res.status(200).json({});
    })
    .catch((er) => {
      res.status(404).json({});
    });
};

exports.GetOrder = (req, res) => {
  const { _id } = req.query;
  Orders.findById({ _id })
    .then((data) => {
      if (data.address.address) {
        return res.status(200).json(data.address);
      } else {
        return res.status(404).json({});
      }
    })
    .catch((er) => {
      return res.status(404).json({});
    });
};
