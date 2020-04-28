const Recipe = require("../models/Recipe");
const ArchivedRecipe = require("../models/ArchivedRecipe");
const mongoose = require("mongoose");

const getNewestRecipesFeed = ({ count, page }) =>
  Recipe.find()
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec()
    .then((docs) => ({
      recipe: docs,
    }));

const getPopularRecipesFeed = ({ count, page }) =>
  Recipe.find()
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec()
    .then((docs) => ({
      recipe: docs,
    }));

const findRecipes = ({ count, page, query }) =>
  Recipe.find({ title: query })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const createArchivedRecipe = ({ _id, ...recipe }) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    ...recipe,
  }).save();

const createRecipe = ({ recipe }) =>
  new Recipe({
    ...recipe,
    _id: new mongoose.Types.ObjectId(),
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
