const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const createStory = router.post("/",async (req, res, next)=>{
    const{
        body: {story}
    } = req;

    const foundStory = await Story.getStory({_id:story._id});
        res.status(200).send({recipe: foundStory});
});

module.exports = createStory;