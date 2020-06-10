const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");
const User = require("../../controllers/User");

const isRecipeLiked = ({ user, recipeId }) => {
  return user.likedRecipes.some(({ recipe }) => {
    return String(recipe) === String(recipeId);
  });
};

const findCurrentLikes = ({ user, recipeId }) => {
  for (let recipe of user.likedRecipes) {
    if (String(recipe.recipe) === String(recipeId)) {
      return recipe.likes;
    }
  }
};

const likeRecipe = router.post("/", async (req, res, next) => {
  const {
    body: {
      recipe: { _id: recipeId },
      likes,
    },
  } = req;
  const user = req.user;

  /**If User Already Liked the recipe before */
  const recipe = await Recipe.getRecipe({ _id: recipeId });
  if (!recipe) {
    res.status(404).send({ message: " Recipe Not found" });
    return;
  }

  if (!isRecipeLiked({ user, recipeId })) {
    await User.likeRecipe({ recipe, _id: user._id, likes });
    await Recipe.like({
      author: user,
      recipeId,
      likes,
      totalLikes: recipe.likes + likes,
    });
    res.status(201).send({ message: "Recipe has been liked" });
    return;
  }

  /** if User first time likes the recipe */
  const oldLikes = findCurrentLikes({ user, recipeId });
  await User.updateLikedRecipe({ recipeId, _id: user._id, likes });
  await Recipe.updateLike({
    authorId: user._id,
    recipeId,
    likes,
    totalLikes: recipe.likes + (likes - oldLikes),
  });
  res.status(201).send({ message: "Recipe has been liked" });
});

module.exports = likeRecipe;
