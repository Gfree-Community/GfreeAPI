const AsyncRouter = require("../../../lib/AsyncRoute");

const signup = require("./signup");
const authenticate = require("./authenticate");
const signin = require("./signin");
const getUser = require("./getUser");
const updateProfile = require("./updateProfile")

module.exports = {
  signin,
  signup,
  authenticate,
  getUser,
  updateProfile
};
