const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const getRecommandedDiscussions = router.post("/", async (req, res, next) => {
  const {
    discussion: { tags },
  } = req.body;
  const discussions = await Discussion.getAnyDiscussionsOfTag({
    count: 4,
    page: 1,
    tags,
  });

  if (discussions.length > 4) {
    res.status(200).json({ discussions: discussions.slice(1) });
    return;
  }

  const popularDiscussions = await Discussion.getNewestDiscussionsFeed({
    count: 4,
    page: 1,
  });

  res.status(200).json({ discussions: popularDiscussions });
});

module.exports = getRecommandedDiscussions;
