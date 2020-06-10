const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const getNewestStoriesByTag = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, tag },
  } = req;
  const NewestStories = await Story.getNewestStoriesByTag({
    count,
    page,
    tag,
  });
  res.status(200).json(NewestStories);
});

module.exports = getNewestStoriesByTag;

