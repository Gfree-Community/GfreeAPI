const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const getAllRecipesTitle = router.get("/", async (req, res, next) => {
  const foundRecipes = await Recipe.getAllRecipesTitle();
  res.status(200).send({ recipes: foundRecipes });
});

module.exports = getAllRecipesTitle;
