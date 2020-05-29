const express = require("express");
const router = express.Router();

const Recipe = require("../../controllers/Recipe");

const WEEK = 7 * 24 * 60 * 60 * 1000;
const MONTH = 4 * WEEK;
const YEAR = 12 * MONTH;

const getNewestIn = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, time = "forever" },
  } = req;
  const times = {
    forever: 0,
    week: WEEK,
    month: MONTH,
    year: YEAR,
  };
  const recipes = await Recipe.getNewestIn({
    count,
    page,
    time: times[time] || 0,
  });
  console.log(recipes);
  res.status(200).json({ recipes });
});

module.exports = getNewestIn;
