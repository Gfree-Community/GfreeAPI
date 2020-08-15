const AsyncRouter = require("../../../lib/AsyncRoute");

const getNewestDiscussionsFeed = require("./getNewestDiscussionsFeed");
const getPopularDiscussionsFeed = require("./getPopularDiscussionsFeed");
const getPopularIn = require("./getPopularIn");
const findDiscussions = require("./findDiscussions");
const deleteDiscussion = require("./deleteDiscussion");
const createDiscussion = require("./createDiscussion");
const updateDiscussion = require("./updateDiscussion");
const likeDiscussion = require("./likeDiscussion");
const getDiscussion = require("./getDiscussion");
const getPopularInByTag = require("./getPopularInByTag");
const getNewestDiscussionsByTag = require("./getNewestDiscussionsByTag");
const getRecommandedDiscussions = require("./getRecommandedDiscussions");
const getAllDiscussionsTitle = require("./getAllDiscussionsTitle");
const comment = require("./comment");
const deleteComment = require("./deleteComment");
const updateComment = require("./updateComment");

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getAllDiscussionsTitle,
  getPopularDiscussionsFeed,
  getNewestDiscussionsFeed,
  getNewestDiscussionsByTag,
  getPopularInByTag,
  getRecommandedDiscussions,
  getPopularIn,
  getDiscussion,
  findDiscussions,
  deleteDiscussion,
  createDiscussion,
  updateDiscussion,
  likeDiscussion,
  comment,
  deleteComment,
  updateComment,
});
