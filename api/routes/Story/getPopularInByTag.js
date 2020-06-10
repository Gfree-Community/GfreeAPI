const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const WEEK = 7 * 24 * 60 * 60 * 1000;
const MONTH = 4 * WEEK;
const YEAR = 12 * MONTH;

const getPopularInByTag = router.get("/", async (req, res, next) => {
  const {
    query: { count = 10, page = 1, time = "forever", tag },
  } = req;
  const times = {
    forever: new Date(new Date() - new Date().getTimezoneOffset()).getTime(),
    week: WEEK,
    month: MONTH,
    year: YEAR,
  };
  const stories = await Story.getPopularInByTag({
    count,
    page,
    time: times[time] || 0,
    tag,
  });
  res.status(200).json({ stories });
});

module.exports = getPopularInByTag;

