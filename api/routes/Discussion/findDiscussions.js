const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const findDiscussions = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, query = "" },
  } = req;
  const foundDiscussions = await Discussion.findDiscussions({
    count,
    page,
    query,
  });
  res.status(200).json({ discussions: foundDiscussions });
});

module.exports = findDiscussions;
