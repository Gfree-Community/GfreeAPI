const router = require("express").Router();
const User = require("../../controllers/User");

const getProfile = router.post("/", async (req, res, next) => {
  const _id = req.body.user;
  const user = await User.findUserById({ _id });
  if (!user) {
    res.status(401).json({ message: "Oops profile not found" });
  }
  
  // Delete email and password for security
  delete user.password;
  delete user.email;
  res.status(200).json({ user });
});

module.exports = getProfile;
