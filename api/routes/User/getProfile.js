const router = require("express").Router();
const User = require("../../controllers/User");

const getProfile = router.post("/", async (req, res, next) => {
  const _id = req.body.user;
  const user = await User.findUserById({ _id });
  console.log(_id, user);
  if (!user) {
    res.status(401).json({ message: "Oops profile not found" });
  }
  delete user.password;
  res.status(200).json({ user });
});

module.exports = getProfile;
