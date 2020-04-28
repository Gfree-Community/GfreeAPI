const router = express.Router();
const mongoose = require("mongoose");

const Recipe = require("../../models/Recipe");

router.get("/", async (req, res, next) => {
  try {
    const { query, count } = req.body;
    const FoundRecipes = await Recipe.find({ title: /${query}/i })
      .limit(+count)
      .exec();
    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
