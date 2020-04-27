const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const archive = require("../../routes/Recipe/functions/archive");
const delet = require("../../routes/Recipe/functions/delete");

router.post("/", async (req, res, next) => {
  const id = req.body._id;
  try {
    const archivedRecipe = await archive(req.body);
    await delet(id);
    await res
      .status(201)
      .json({ message: "Recipe Deleted", oldId: id, archivedRecipe });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
