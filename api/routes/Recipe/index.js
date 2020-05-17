const AsyncRouter = require("../../../lib/AsyncRoute");

const getNewestRecipesFeed = require("./getNewestRecipesFeed");
const getPopularRecipesFeed = require("./getPopularRecipesFeed");
const findRecipes = require("./findRecipes");
const deleteRecipe = require("./deleteRecipe");
const createRecipe = require("./createRecipe");
const updateRecipe = require("./updateRecipe");
const likeRecipe = require("./likeRecipe");
const getRecipe = require("./getRecipe");

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  getRecipe,
  findRecipes,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  likeRecipe,
});
