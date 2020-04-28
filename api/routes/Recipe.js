const express = require("express");
const router = express.Router();

const Recipe = require("../controllers/Recipe");

const getNewestRecipesFeed = router.get("/", async (req, res, next) => {
  try {
    const {
      query: { count = 10, page = 1 },
    } = req;
    const NewestRecipes = await Recipe.getNewestRecipesFeed({ count, page });
    res.status(200).json(NewestRecipes);
  } catch (err) {
    next(err);
  }
});

const getPopularRecipesFeed = router.get("/", async (req, res, next) => {
  try {
    const {
      query: { count = 10, page = 1 },
    } = req;
    const PopularRecipes = await Recipe.getPopularRecipesFeed({ count, page });
    res.status(200).json(PopularRecipes);
  } catch (err) {
    next(err);
  }
});

const findRecipes = router.get("/", async (req, res, next) => {
  try {
    const {
      query: { count = 10, page = 1, query = "" },
    } = req;
    const foundRecipes = await Recipe.findRecipes({ count, page, query });
    res.status(200).json(foundRecipes);
  } catch (err) {
    next(err);
  }
});

const deleteRecipe = router.post("/", async (req, res, next) => {
  try {
    const {
      body: { _id, ...recipe },
    } = req;
    await Recipe.createArchivedRecipe(recipe);
    await Recipe.deleteRecipe({ _id });
    res.status(201).send({ message: "Post has been deleted" });
  } catch (err) {
    next(err);
  }
});

const createRecipe = router.post("/", async (req, res, next) => {
  try {
    const {
      body: { recipe },
    } = req;
    const Recipe = await Recipe.createRecipe({ recipe });
    res.status(201).send(Recipe);
  } catch (err) {
    next(err);
  }
});

const updateRecipe = router.post("/", async (req, res, next) => {
  try {
    const {
      body: { recipe },
    } = req;
    const UpdatedRecipe = await Recipe.updateRecipe(recipe);
    res.status(201).send(UpdatedRecipe);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  findRecipes,
  deleteRecipe,
  createRecipe,
  updateRecipe,
};
