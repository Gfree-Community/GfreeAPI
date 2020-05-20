const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    recipe,
    comment: { comment },
  } = req.body;
  Recipe.addComment({
    recipeId: recipe._id,
    comment: { author: user, comment },
  });
  res.status(201).json({ message: "Comment has been added" });
});

module.exports = comment;
