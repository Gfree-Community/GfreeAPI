const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const getPopularDiscussionFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const PopularDiscussions = await Discussion.getPopularDiscussionFeed({
    count,
    page,
  });
  res.status(200).json(PopularDiscussions);
});

module.exports = getPopularDiscussionFeed;
