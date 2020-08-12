const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const deleteComment = router.post("/", async (req, res, next) => {
  const {
    body: {
      story: { _id, commentId },
    },
  } = req;

  await Story.deleteComment({ _id, commentId });
  res.status(201).send({ message: "Comment has been deleted" });
});

module.exports = deleteComment;
