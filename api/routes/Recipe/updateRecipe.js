const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const updateRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;
  const updatedRecipe = await Recipe.updateRecipe({
    _id: recipe._id,
    recipe,
  });
  res.status(201).send({
    recipe: updatedRecipe,
  });
});

module.exports = updateRecipe;
