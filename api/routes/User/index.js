const AsyncRouter = require("../../../lib/AsyncRoute");

const signup = require("./signup");
const authenticate = require("./authenticate");
const signin = require("./signin");
const getUser = require("./getUser");
const updateProfile = require("./updateProfile");
const requestPasswordChange = require("./requestPasswordChange");
const resetPassword = require("./resetPassword");
const getProfile = require("./getProfile");

module.exports = {
  signin,
  signup,
  authenticate,
  ...AsyncRouter({
    getUser,
    updateProfile,
    requestPasswordChange,
    getProfile,
    resetPassword,
  }),
};
