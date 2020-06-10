const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const comment = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    story,
    comment: { comment },
  } = req.body;
  Story.addComment({
    storyId: story._id,
    comment: { author: user, comment },
  });
  res.status(201).json({ message: "Comment has been added" });
});

module.exports = comment;
