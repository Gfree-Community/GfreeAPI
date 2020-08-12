const AsyncRouter = require("../../../lib/AsyncRoute");

const getNewestStoriesFeed = require("./getNewestStoriesFeed");
const getPopularStoriesFeed = require("./getPopularStoriesFeed");
const getPopularIn = require("./getPopularIn");
const findStories = require("./findStories");
const deleteStory = require("./deleteStory");
const createStory = require("./createStory");
const updateStory = require("./updateStory");
const likeStory = require("./likeStory");
const getStory = require("./getStory");
const getPopularInByTag = require("./getPopularInByTag");
const getNewestStoriesByTag = require("./getNewestStoriesByTag");
const getRecommandedStories = require("./getRecommandedStories");
const getAllStoriesTitle = require("./getAllStoriesTitle");
const comment = require("./comment");
const deleteComment = require("./deleteComment")
const updateComment = require("./updateComment")

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getAllStoriesTitle,
  getPopularStoriesFeed,
  getNewestStoriesFeed,
  getNewestStoriesByTag,
  getPopularInByTag,
  getRecommandedStories,
  getPopularIn,
  getStory,
  findStories,
  deleteStory,
  createStory,
  updateStory,
  likeStory,
  comment,
  deleteComment,
  updateComment
});
