const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const getNewestRecipesFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const NewestRecipes = await Recipe.getNewestRecipesFeed({ count, page });
  res.status(200).json(NewestRecipes);
});

module.exports = getNewestRecipesFeed;
