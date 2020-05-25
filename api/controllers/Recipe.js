const mongoose = require("mongoose");

const Recipe = require("../models/Recipe");
const ArchivedRecipe = require("../models/ArchivedRecipe");

const getNewestRecipesFeed = ({ count, page }) =>
  Recipe.find()
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec()
    .then((docs) => ({
      recipe: docs,
    }));

const getRecipe = ({ _id }) =>
  Recipe.findOne({ _id }).populate("author").populate("comments.author").exec();

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
    ...recipe,
    _id: new mongoose.Types.ObjectId(),
  }).save();

const addComment = ({ recipeId, comment: { author, comment } }) =>
  Recipe.updateOne(
    { _id: recipeId },
    {
      $push: { comments: [{ author, comment: comment }] },
    }
  ).exec();

const createRecipe = ({ recipe }) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    comments: [],
    likedBy: [],
    likes: 0,
    ...recipe,
  }).save();

const updateRecipe = ({ _id, ...recipe }) =>
  Recipe.updateOne({ _id }, { $set: recipe }).exec();

const deleteRecipe = ({ _id }) => Recipe.remove({ _id }).exec();

const like = ({ author, recipeId, likes, totalLikes }) =>
  Recipe.updateOne(
    { _id: recipeId },
    { $push: { likedBy: [{ author, likes }] }, likes: totalLikes }
  ).exec();

const updateLike = ({ authorId, recipeId, likes, totalLikes }) =>
  Recipe.findByIdAndUpdate(
    {
      _id: recipeId,
    },
    {
      $set: { "likedBy.$[elem].likes": +likes },
      likes: totalLikes,
    },
    {
      arrayFilters: [{ "elem.author": authorId }],
    }
  );

module.exports = {
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  findRecipes,
  getRecipe,
  createArchivedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  like,
  updateLike,
  addComment,
};
