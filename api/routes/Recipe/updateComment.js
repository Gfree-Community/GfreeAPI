const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const deleteComment = router.post("/", async (req, res, next) => {
  const {
    body: {
      recipe: { _id, commentId, updatedComment },
    },
  } = req;

  await Recipe.updateComment({ _id, commentId, updatedComment });
  res.status(201).send({ message: "Comment has been updated" });
});

module.exports = deleteComment;
