const router = require("express").Router();
const passport = require("passport");

const signup = router.post("/", async (req, res, next) => {
  await passport.authenticate("register", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (info !== undefined) {
      console.log(info,req.body)
      res.status(403).json(info);
    } else {
      // remove password property for security reasons.
      delete user.password
      res.status(201).json({ message: "User has been created", user });
    }
  })(req, res, next);
});

module.exports = signup;
