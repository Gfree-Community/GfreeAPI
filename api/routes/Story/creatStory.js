const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");

const createStory = router.post("/",async(req, res, next)=>{
    const{
        body: {story}
    } = req;
    const newStory = await Story.createStory({story});
    res.status(201).send(newStory);
});
module.exports = createStory;