const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const getNewestDiscussionsByTag = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, tag },
  } = req;
  const NewestDiscussions = await Discussion.getNewestDiscussionsByTag({
    count,
    page,
    tag,
  });
  res.status(200).json(NewestDiscussions);
});

module.exports = getNewestDiscussionsByTag;

