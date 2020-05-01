const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const likeRecipe = router.post("/", async (req, res, next) => {
  const {
    body: {
      recipe,
      likes,
      author: { _id: authorId },
    },
  } = req;
  const updatedRecipe = await Recipe.likeRecipe({ authorId, recipe, likes });
  res
    .status(201)
    .send({ message: "Post has been liked"});
});

module.exports = likeRecipe;
