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
        res.status(422).json(info);
      } else {
        // pass the user object to following middleware
        req.logIn(user, (err) => {
          const token = jwt.sign({ id: user.email }, "t7m08", {
            expiresIn: "15d",
          }); 
          res.status(201).json({
            auth: true,
            token,
            user,
            message: "user has been found and logged in",
          });
        });
      }
    }
  )(req, res, next);
});

module.exports = signin;
