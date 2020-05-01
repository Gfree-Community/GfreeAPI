const AsyncRouter = require("../../../lib/AsyncRoute");

const signup = require("./signup");
const authenticate = require("./authenticate");
const signin = require("./signin");
const getUser = require("./getUser");

module.exports = {
  signin,
  signup,
  authenticate,
  getUser,
};
