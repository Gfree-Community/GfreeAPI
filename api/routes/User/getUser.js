const router = require("express").Router();
const User = require("../../controllers/User");
const getUser = router.get("/", async (req, res, next) => {
  const users = await User.findUsers();
  res.status(200).json({ users });
});

module.exports = getUser;
