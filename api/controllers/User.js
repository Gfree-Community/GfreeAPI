const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");

const setPassword = ({ password }) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 11, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

const validatePassword = ({ password, hash }) =>
  bcrypt.compareSync(password, hash);

const findUser = ({ email }) => User.findOne({ email }).exec();
const findUserById = ({ _id }) => User.findById(_id).populate("recipes").exec();

const updateUser = (_id, { email, fullname, about, profilePicture, links }) =>
  User.updateOne(
    { _id },
    {
      email,
      fullname,
      about,
      profilePicture,
      links,
    }
  );

const changePassword = (_id, { hashedPassword }) =>
  User.updateOne(
    { _id },
    {
      password: hashedPassword,
    }
  );

const createUser = ({ email, password, fullname }) =>
  new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
    fullname,
  }).save();

// Recipe Related
const updateLikedRecipe = ({ recipeId, _id, likes }) =>
  User.findByIdAndUpdate(
    { _id },
    {
      $set: { "likedRecipes.$[elem].likes": +likes },
    },
    {
      arrayFilters: [{ "elem.recipe": recipeId }],
    }
  );

const likeRecipe = ({ recipe, _id, likes }) =>
  User.updateOne(
    { _id },
    {
      $push: { likedRecipes: [{ recipe, likes }] },
    }
  );

const addCreatedRecipe = ({ _id, recipeId }) =>
  User.updateOne(
    { _id },
    {
      $push: { recipes: recipeId },
    }
  );

const findUsers = () => User.find().exec();

module.exports = {
  setPassword,
  validatePassword,
  findUser,
  createUser,
  updateUser,
  findUsers,
  changePassword,
  findUserById,
  addCreatedRecipe,
  likeRecipe,
  updateLikedRecipe,
};
