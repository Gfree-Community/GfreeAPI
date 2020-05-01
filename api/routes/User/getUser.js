const router = require("express").Router();
const User = require("../../controllers/User");
const getUser = router.get("/", async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

module.exports = getUser;
