const router = require("express").Router();
const passport = require("passport");

const authenticate = router.use(async (req, res, next) => {
  await passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      next(err);
    }
    if (info !== undefined) {
      res.status(403).json(info);
    } else {
      // pass the user object to following middleware
      req.user = user;
      next();
    }
  })(req, res, next);
});

module.exports = authenticate;
