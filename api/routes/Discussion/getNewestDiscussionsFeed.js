const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const getNewestDiscussionsFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const NewestDiscussions = await Discussion.getNewestDiscussionsFeed({ count, page });
  res.status(200).json(NewestDiscussions);
});

module.exports = getNewestDiscussionsFeed;

