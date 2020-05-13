const router = require("express").Router();
const User = require("../../controllers/User");

const ResetPassword = router.post("/", async (req, res, next) => {
  const { _id } = req.user;
  const { password } = req.body.user;
  const hashedPassword = await User.setPassword({ password });
  await User.changePassword(_id, { hashedPassword });
  req.send(201).json({ message: "Password Changed Successfuly" });
});

module.exports = ResetPassword;
