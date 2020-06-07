const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const getNewestRecipesByTag = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, tag },
  } = req;
  const NewestRecipes = await Recipe.getNewestRecipesByTag({
    count,
    page,
    tag,
  });
  res.status(200).json(NewestRecipes);
});

module.exports = getNewestRecipesByTag;
