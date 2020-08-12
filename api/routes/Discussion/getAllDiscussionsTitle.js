const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const getAllDiscussionsTitle = router.get("/", async (req, res, next) => {
  const foundDiscussions = await Discussion.getAllDiscussionsTitle();
  res.status(200).send({ discussions: foundDiscussions });
});

module.exports = getAllDiscussionsTitle;
