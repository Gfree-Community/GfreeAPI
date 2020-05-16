const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");

const deleteStory = router.post("/", async(req, res, next)=>{
    const{ body: {_id, ...story}} = req;
    await Story.createArchivedStory(story);
    await Story.deleteStory({_id});
    res.status(201).send({message: "the stoy has been deleted"});
});

module.exports= deleteStory;