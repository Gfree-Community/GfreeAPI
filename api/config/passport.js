const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../controllers/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Login Strategy
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    async (email, password, done) => {
      try {
        const user = await User.findUser({ email });
        if (
          !user ||
          !User.validatePassword({ password, hash: user.password })
        ) {
          return done(null, false, { message: `Email or password is invalid` });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Signup strategy
passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      try {
        const { fullname } = req.body.user;
        const user = await User.findUser({ email });
        if (user !== null) {
          return done(null, false, {
            message: "User already Exist",
          });
        } else {
          const hashedPassword = await User.setPassword({ password });
          const createdUser = await User.createUser({
            email,
            password: hashedPassword,
            fullname,
          });
          return done(null, createdUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Authorization with JWT Strategy
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "t7m08",
};
passport.use(
  "jwt",
  new JWTstrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findUser({ email: jwt_payload.id });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);
