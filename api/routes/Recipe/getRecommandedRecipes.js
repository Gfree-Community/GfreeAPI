const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const getRecommandedRecipes = router.post("/", async (req, res, next) => {
  const {
    recipe: { tags },
  } = req.body;
  const recipes = await Recipe.getAnyRecipesOfTag({
    count: 4,
    page: 1,
    tags,
  });
  if (recipes.length > 4) {
    res.status(200).json({ recipes: recipes.slice(1) });
    return;
  }

  const popularRecipes = await Recipe.getNewestRecipesFeed({
    count: 4,
    page: 1,
  });

  res.status(200).json({ recipes: popularRecipes });
});

module.exports = getRecommandedRecipes;
