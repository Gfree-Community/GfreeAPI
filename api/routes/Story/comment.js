const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const comment = router.post("/", async (req, res, next)=>
{
    const user = req.user;
    const{
        recipe,
        comment: { comment},
    }= req.body;
    Story.addComment({
        storyId: recipe._id,
        comment: { author: user, comment},

    });
    res.status(201).json({message: "comment has been added"});
});

module.exports = comment;