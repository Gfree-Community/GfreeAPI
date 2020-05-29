const AsyncRouter = require("../../../lib/AsyncRoute");

const getNewestRecipesFeed = require("./getNewestRecipesFeed");
const getPopularRecipesFeed = require("./getPopularRecipesFeed");
const getPopularIn = require("./getPopularIn");
const getNewestIn = require("./getNewestIn");
const findRecipes = require("./findRecipes");
const deleteRecipe = require("./deleteRecipe");
const createRecipe = require("./createRecipe");
const updateRecipe = require("./updateRecipe");
const likeRecipe = require("./likeRecipe");
const getRecipe = require("./getRecipe");
const comment = require("./comment");

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  getPopularIn,
  getNewestIn,
  getRecipe,
  findRecipes,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  likeRecipe,
  comment,
});
