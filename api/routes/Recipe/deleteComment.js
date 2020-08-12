const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const deleteComment = router.post("/", async (req, res, next) => {
  const {
    body: {
      recipe: { _id, commentId },
    },
  } = req;

  await Recipe.deleteComment({ _id, commentId });
  res.status(201).send({ message: "Comment has been deleted" });
});

module.exports = deleteComment;
