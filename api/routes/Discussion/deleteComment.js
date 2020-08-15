const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const deleteComment = router.post("/", async (req, res, next) => {
  const {
    body: {
      discussion: { _id, commentId },
    },
  } = req;

  await Discussion.deleteComment({ _id, commentId });
  res.status(201).send({ message: "Comment has been deleted" });
});

module.exports = deleteComment;
