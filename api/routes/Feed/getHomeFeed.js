const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");
const Story = require("../../controllers/Story");

const getHomeFeed = router.get("/", async (req, res, next) => {
  const forever = new Date(
    new Date() - new Date().getTimezoneOffset()
  ).getTime();
  const recipes = await Recipe.getPopularIn({
    count: 8,
    page: 1,
    time: forever,
  });

  const stories = await Story.getPopularIn({
    count: 8,
    page: 1,
    time: forever,
  });

  res.status(200).json({ recipes, stories });
});

module.exports = getHomeFeed;
