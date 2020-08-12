const AsyncRouter = require("../../../lib/AsyncRoute");

const getNewestRecipesFeed = require("./getNewestRecipesFeed");
const getPopularRecipesFeed = require("./getPopularRecipesFeed");
const getPopularIn = require("./getPopularIn");
const findRecipes = require("./findRecipes");
const deleteRecipe = require("./deleteRecipe");
const createRecipe = require("./createRecipe");
const updateRecipe = require("./updateRecipe");
const likeRecipe = require("./likeRecipe");
const getRecipe = require("./getRecipe");
const comment = require("./comment");
const getPopularInByTag = require("./getPopularInByTag");
const getNewestRecipesByTag = require("./getNewestRecipesByTag");
const getRecommandedRecipes = require("./getRecommandedRecipes");
const getAllRecipesTitle = require("./getAllRecipesTitle");
const commentDelete = require("./commentDelete")

// Helper function to Apply AsyncRoute to all Routers in the current Dir
module.exports = AsyncRouter({
  getAllRecipesTitle,
  getPopularRecipesFeed,
  getNewestRecipesFeed,
  getNewestRecipesByTag,
  getPopularInByTag,
  getRecommandedRecipes,
  getPopularIn,
  getRecipe,
  findRecipes,
  deleteRecipe,
  createRecipe,
  updateRecipe,
  likeRecipe,
  comment,
  commentDelete
});
