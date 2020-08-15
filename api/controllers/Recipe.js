const mongoose = require("mongoose");

const Recipe = require("../models/Recipe");
const ArchivedRecipe = require("../models/ArchivedRecipe");

const SELECT_FIELDS_FOR_RECIPE_CARD = {
  title: 1,
  author: 1,
  cookingTime: 1,
  createdAt: 1,
  thumbnail: 1,
};

const getAllRecipesTitle = () =>
  Recipe.find({}, { title: 1, updatedAt: 1 }).exec();

const getPopularRecipesFeed = ({ count, page }) =>
  Recipe.find({}, SELECT_FIELDS_FOR_RECIPE_CARD)
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularIn = ({ count, page, time }) =>
  Recipe.find(
    {
      createdAt: {
        $gte:
          new Date(new Date() - new Date().getTimezoneOffset()).getTime() -
          time,
      },
    },
    SELECT_FIELDS_FOR_RECIPE_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestRecipesFeed = ({ count, page }) =>
  Recipe.find({}, SELECT_FIELDS_FOR_RECIPE_CARD)
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularInByTag = ({ count, page, time, tag }) =>
  Recipe.find(
    {
      createdAt: {
        $gte:
          new Date(new Date() - new Date().getTimezoneOffset()).getTime() -
          time,
      },
      tags: {
        $in: [tag],
      },
    },
    SELECT_FIELDS_FOR_RECIPE_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestRecipesByTag = ({ count, page, tag }) =>
  Recipe.find(
    {
      tags: {
        $in: [tag],
      },
    },
    SELECT_FIELDS_FOR_RECIPE_CARD
  )
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getAnyRecipesOfTag = ({ count, page, tags }) =>
  Recipe.find(
    {
      tags: {
        $in: tags,
      },
    },
    SELECT_FIELDS_FOR_RECIPE_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getRecipe = ({ _id }) =>
  Recipe.findOne({ _id }).populate("author").populate("comments.author").exec();

const findRecipes = ({ count, page, query }) =>
  Recipe.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" }, ...SELECT_FIELDS_FOR_RECIPE_CARD }
  )
    .sort({
      score: { $meta: "textScore" },
    })
    .limit(+count)
    .populate("author")
    .skip(count * (page - 1))
    .exec();

const createArchivedRecipe = ({
  _id,
  title,
  description,
  body,
  cookingTime,
  thumbnail,
  author,
}) =>
  new ArchivedRecipe({
    title,
    description,
    body,
    cookingTime,
    thumbnail,
    author,
    _id: new mongoose.Types.ObjectId(),
  }).save();

const createRecipe = ({ recipe }) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    comments: [],
    likedBy: [],
    likes: 0,
    ...recipe,
  }).save();

const updateRecipe = ({
  _id,
  recipe: { title, body, thumbnail, cookingTime, description, tags },
}) =>
  Recipe.findOneAndUpdate(
    { _id },
    {
      $set: {
        title,
        body,
        thumbnail,
        cookingTime,
        description,
        tags,
      },
    },
    { new: true }
  ).exec();

const deleteRecipe = ({ _id }) => Recipe.remove({ _id }).exec();

// Related to Comments
const addComment = ({ recipeId, comment: { author, comment } }) =>
  Recipe.findOneAndUpdate(
    { _id: recipeId },
    {
      $push: { comments: [{ author, comment: comment }] },
    },
    { new: true }
  ).exec();

const updateComment = ({ _id, commentId, updatedComment }) =>
  Recipe.update(
    { _id, "comments._id": commentId },
    { $set: { "comments.$.comment": updatedComment } }
  ).exec();

const deleteComment = ({ _id, commentId }) =>
  Recipe.findOneAndUpdate(
    {
      _id,
    },
    {
      $pull: {
        comments: {
          _id: commentId,
        },
      },
    }
  );

// Related to Likes
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
  getAllRecipesTitle,
  getNewestRecipesFeed,
  getPopularRecipesFeed,
  getNewestRecipesByTag,
  getPopularInByTag,
  getAnyRecipesOfTag,
  getPopularIn,
  findRecipes,
  getRecipe,
  createArchivedRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  like,
  updateLike,
  addComment,
  updateComment,
  deleteComment,
};
