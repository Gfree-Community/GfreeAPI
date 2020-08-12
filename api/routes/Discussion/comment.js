const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    discussion,
    comment: { comment },
  } = req.body;
  Discussion.addComment({
    discussionId: discussion._id,
    comment: { author: user, comment },
  });
  res.status(201).json({ message: "Comment has been added" });
});

module.exports = comment;

