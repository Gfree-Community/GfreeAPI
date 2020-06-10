const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const findStories = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, query = "" },
  } = req;
  const foundStories = await Story.findStories({ count, page, query });
  res.status(200).json({ stories: foundStories });
});

module.exports = findStories;
