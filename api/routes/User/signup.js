const router = require("express").Router();
const passport = require("passport");

const signup = router.post("/", async (req, res, next) => {
  await passport.authenticate("register", (err, user, info) => {
    if (err) {
      next(err);
    }
    console.log(info);
    if (info !== undefined) {
      res.status(403).json(info);
    } else {
      res.status(201).json({ message: "User has been created", user });
    }
  })(req, res, next);
});

module.exports = signup;
