const express = require ("express");
const router = express.Router();


const Story = require("../../controllers/Story");


const likeStory = router.post("/", async (req, res, next)=>{
    const{
        body:{
            story,
            likes,
            author:{ _id: authorId}
        }
    }= req;

    const updatedStory = await Story.likeStory({authorId, story, likes});
    res.status(201).send({message: "post has been liked !"});
});

module.exports= likeStory;