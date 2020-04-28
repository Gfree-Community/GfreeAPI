const Recipe = require("../../../models/Recipe");
const ArchivedRecipe = require("../../../models/ArchivedRecipe");
const mongoose = require("mongoose");

const getNewestRecipesFeed = ({ count, page }) =>
  Recipe.find()
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec()
    .then(({ length, ...docs }) => ({
      count: length,
      recipe: docs.map((doc) => doc),
    }));

const getPopularRecipesFeed = ({ count, page }) =>
  Recipe.find()
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (pages - 1))
    .exec()
    .then(({ length, ...docs }) => ({
      count: length,
      recipe: docs.map((doc) => doc),
    }));

const findRecipes = ({ count, page, query }) =>
  Recipe.find({ title: query })
    .limit(+count)
    .skip(count(page - 1))
    .exec();

const createArchivedRecipe = ({ _id, ...recipe }) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    ...recipe,
  }).save();

const createRecipe = ({ recipe }) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    ...recipe,
  }).save();

const updateRecipe = ({ _id, ...recipe }) =>
  Recipe.updateOne({ _id }, { $set: recipe }).exec();

const deleteRecipe = ({ _id }) => Recipe.remove({ _id }).exec();

module.exports = {
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  findRecipes,
  createArchivedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
