const mongodb = require("mongodb");
const mongoose = require("mongoose");

// const MongoClient = mongodb.MongoClient;
const mongoDbUrl =
  "mongodb+srv://nirojan:sliit2020@cluster0.8piet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let _db;

const initDb = (callback) => {
  if (_db) {
    return callback(null, _db);
  }
  mongoose.connect(mongoDbUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialzed");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
