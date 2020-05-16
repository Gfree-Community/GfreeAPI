const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");


const getPopularStoriesFeed = router.get("/", async ( req, res, next)=>{
    const{
        query:{ count=10, page=1},
    } = req;
    const PopularStories = await Story.getPopularStoriesFeed({count, page});
    res.status(200).json(PopularStories);
});

module.exports= getPopularStoriesFeed;