const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const createRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { recipe },
  } = req;
  const newRecipe = await Recipe.createRecipe({ recipe });
  res.status(201).send(newRecipe);
});

module.exports = createRecipe;