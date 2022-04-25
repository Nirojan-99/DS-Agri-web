module.exports = (req, res, next) => {
  if (req.role !== "admin") {
    res.status(400).json({ auth: "fail" });
    return;
  }
  next();
};
