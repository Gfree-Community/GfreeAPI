const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");
const { updateComment } = require("../../controllers/Story");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    story,
    comment: { comment },
  } = req.body;
  const { comments } = await Story.addComment({
    storyId: story._id,
    comment: { author: user, comment },
  });

  //This is the added comment.
  const newComment = comments[comments.length - 1];

  res.status(201).send({
    comment: newComment,
  });
});

module.exports = comment;
