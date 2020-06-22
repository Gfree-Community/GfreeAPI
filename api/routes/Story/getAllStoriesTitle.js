const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const getAllStoriesTitle = router.get("/", async (req, res, next) => {
  const foundStories = await Story.getAllStoriesTitle();
  res.status(200).send({ stories: foundStories });
});

module.exports = getAllStoriesTitle;
