const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const getPopularRecipesFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const PopularRecipes = await Recipe.getPopularRecipesFeed({ count, page });
  res.status(200).json(PopularRecipes);
});

module.exports = getPopularRecipesFeed;