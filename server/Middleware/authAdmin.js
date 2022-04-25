module.exports = (req, res, next) => {
  if (req.type !== "admin") {
    res.status(400).json({ auth: "fail" });
    return;
  }
  next();
};
