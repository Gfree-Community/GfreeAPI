const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../controllers/User");

const signin = router.use(async (req, res, next) => {
  await passport.authenticate(
    "login",
    { session: false },
    (err, user, info) => {
      if (err) {
        next(err);
      }
      if (info !== undefined) {
        res.status(403).json(info);
      } else {
        // pass the user object to following middleware
        req.logIn(user, (err) => {
          User.findUser({ email: user.email }).then((user) => {
            const token = jwt.sign({ id: user.email }, "t7m08", {
              expiresIn: "15d",
            });
            res.status(200).json({
              auth: true,
              token,
              message: "user has been found and logged in",
            });
          });
        });
      }
    }
  )(req, res, next);
});

module.exports = signin;
