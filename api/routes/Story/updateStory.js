const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");


const updateStory = router.post("/", async (req,res, next)=>{
    const{
        body: {story}
    }=req;
    const UpdateStory = await Story.updateStory(story);
    res.status(201).send(UpdateStory);
});


module.exports= updateStory;