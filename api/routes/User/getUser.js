const router = require("express").Router();
const User = require("../../controllers/User");
const getUser = router.get("/", async (req, res, next) => {
  const user = await User.findUserById(req.user._id);
  res.status(200).json({ user });
});

module.exports = getUser;
