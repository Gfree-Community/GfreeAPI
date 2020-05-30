const AsyncRouter = require('../../../lib/AsyncRoute');

const getNewestStoriesFeed = require("./getNewestStoriesFeed");
const getPopularStoriesFeed = require("./getPopularStoriesFeed");
const findStory = require("./findStory");
const deleteStory = require("./deleteStory");
const createStory = require("./creatStory");
const updateStory = require("./updateStory");
const likeStory = require("./likeStory");
const getStory = require("./getStory");

module.exports = AsyncRouter({
    getNewestStoriesFeed,
    getPopularStoriesFeed,
    findStory,
    deleteStory,
    createStory,
    updateStory,
    likeStory,
    getStory
});