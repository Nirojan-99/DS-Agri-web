module.exports = (req, res, next) => {
  if (req.role !== "farmer") {
    res.status(400).json({ auth: "fail" });
    return;
  }
  next();
};
