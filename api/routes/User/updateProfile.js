const router = require("express").Router();
const User = require("../../controllers/User");
const getUser = router.post("/", async (req, res, next) => {
  const updatedEmail = req.body.user.email;
  const currentUser = req.user;
  /**
   If user want to update Email,
   we should make sure the email doesn't exist already.
  *  */
  if (updatedEmail !== currentUser.email) {
    const user = await User.findUser({ updatedEmail });
    if (user) {
      res.status(403).json({ message: "Email already exists." });
      return;
    }
  }

  await User.updateUser(req.user._id, req.body.user);
  // Get updatedUser and delete its password property.
  const updatedUser = await User.findUser({ email: updatedEmail });
  delete updatedUser.password;

  res.status(201).json({
    user: updatedUser,
  });
});

module.exports = getUser;
