const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const deleteRecipe = router.post("/", async (req, res, next) => {
  const {
    body: { _id, ...recipe },
  } = req;
  await Recipe.createArchivedRecipe(recipe);
  await Recipe.deleteRecipe({ _id });
  res.status(201).send({ message: "Post has been deleted" });
});

module.exports = deleteRecipe;