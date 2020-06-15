const AsyncRouter = require("../../../lib/AsyncRoute");
const getHomeFeed = require("./getHomeFeed");

module.exports = {
  ...AsyncRouter({
    getHomeFeed,
  }),
};
