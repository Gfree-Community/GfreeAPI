const express = require("express");
const router = express.Router();
const AsyncRouter = require("../../lib/AsyncRoute");

const Recipe = require("../controllers/Recipe");

const getNewestRecipesFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const NewestRecipes = await Recipe.getNewestRecipesFeed({ count, page });
  res.status(200).json(NewestRecipes);
});

const getPopularRecipesFeed = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1 },
  } = req;
  const PopularRecipes = await Recipe.getPopularRecipesFeed({ count, page });
  res.status(200).json(PopularRecipes);
});

const findRecipes = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, query = "" },
  } = req;
  const foundRecipes = await Recipe.findRecipes({ count, page, query });
  res.status(200).json(foundRecipes);
});

const deleteRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { _id, ...recipe },
  } = req;
  await Recipe.createArchivedRecipe(recipe);
  await Recipe.deleteRecipe({ _id });
  res.status(201).send({ message: "Post has been deleted" });
});

const createRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;
  const Recipe = await Recipe.createRecipe({ recipe });
  res.status(201).send(Recipe);
});

const updateRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;
  const UpdatedRecipe = await Recipe.updateRecipe(recipe);
  res.status(201).send(UpdatedRecipe);
});

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  findRecipes,
  deleteRecipe,
  createRecipe,
  updateRecipe,
});
