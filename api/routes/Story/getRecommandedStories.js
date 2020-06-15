const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const getRecommandedStories = router.post("/", async (req, res, next) => {
  const {
    story: { tags },
  } = req.body;
  const stories = await Story.getAnyStoriesOfTag({
    count: 4,
    page: 1,
    tags,
  });

  if (stories.length > 4) {
    res.status(200).json({ stories: stories.slice(1) });
    return;
  }

  const popularStories = await Story.getNewestStoriesFeed({
    count: 4,
    page: 1,
  });

  res.status(200).json({ stories: popularStories });
});

module.exports = getRecommandedStories;
