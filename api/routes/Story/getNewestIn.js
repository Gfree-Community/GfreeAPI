const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const WEEK = 7*24*60*60*100;
const MONTH = 4*WEEK;
const YEAR = 12*MONTH;

const getNewstIn = router.get("/", async (req, res, next)=>{
    const{
        query:{ count = 10, page = 1, time="forever"},
    }= req;
    const times = {
        forever: 0,
        week: WEEK,
        month: MONTH,
        year: YEAR
    };
    const story = await Story.getNewestIn({
        counst,
        page,
        time: times[time] || 0,
    });
    console.log(story);
    res.status(200).json({story});

    
});


module.exports = getNewstIn;