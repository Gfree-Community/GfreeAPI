const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");
const getNewestStoriesFeed = router.get("/", async (req, res, next)=>{
    const {
        query: { count = 10, page = 1 },
      } = req;
      const NewestStory = await Story.getNewestStoriesFeed({ count, page });
      res.status(200).json(NewestRecipes);
});

module.exports = getNewestStoriesFed;