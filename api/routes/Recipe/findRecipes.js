const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const findRecipes = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, query = "" },
  } = req;
  const foundRecipes = await Recipe.findRecipes({ count, page, query });
  res.status(200).json({ recipes: foundRecipes });
});

module.exports = findRecipes;
