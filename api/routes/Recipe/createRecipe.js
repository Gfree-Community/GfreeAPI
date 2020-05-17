const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");
const User = require("../../controllers/User");

const createRecipe = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    body: { recipe },
  } = req;

  const newRecipe = await Recipe.createRecipe({
    recipe: { ...recipe, author: user._id },
  });
  await User.addCreatedRecipe({ _id: user._id, recipeId: newRecipe._id });

  res.status(201).send({ recipe: newRecipe });
});

module.exports = createRecipe;
