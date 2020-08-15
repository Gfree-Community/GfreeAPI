const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    recipe,
    comment: { comment },
  } = req.body;
  const { comments } = await Recipe.addComment({
    recipeId: recipe._id,
    comment: { author: user, comment },
  });

  const newComment = comments[comments.length - 1];

  res.status(201).send({ comment: newComment });
});

module.exports = comment;
