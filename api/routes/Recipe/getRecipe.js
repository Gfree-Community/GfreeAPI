const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const createRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;

  const foundRecipe = await Recipe.getRecipe({ _id: recipe._id });

  res.status(200).send({ recipe: foundRecipe });
});

module.exports = createRecipe;
