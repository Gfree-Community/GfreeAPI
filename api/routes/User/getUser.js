const router = require("express").Router();
const User = require("../../controllers/User");
const getUser = router.get("/", async (req, res, next) => {
  const user = await User.findUserById(req.user._id);
  // Delete email and password for security
  delete user.password;
  res.status(200).json({ user });
});

module.exports = getUser;
