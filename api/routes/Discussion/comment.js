const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    discussion,
    comment: { comment },
  } = req.body;
  const { comments } = await Discussion.addComment({
    discussionId: discussion._id,
    comment: { author: user, comment },
  });

  const newComment = comments[comments.length - 1];

  res.status(201).send({ comment: newComment });
});

module.exports = comment;
