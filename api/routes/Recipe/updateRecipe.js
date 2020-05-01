const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const updateRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;
  const UpdatedRecipe = await Recipe.updateRecipe(recipe);
  res.status(201).send(UpdatedRecipe);
});

module.exports = updateRecipe;
