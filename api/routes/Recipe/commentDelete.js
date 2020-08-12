const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const deleteComment = router.post("/", async (req, res, next) => {
  const _id = req.body._id;
  const delcomment = req.body.commentid;
  const recipe = await Recipe.getRecipe({ _id });
  await Recipe.deleteComment({ _id, delcomment });
  res.status(201).send({ message: "comment has been deleted" });
});

module.exports = deleteComment;
