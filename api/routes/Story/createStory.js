const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");
const User = require("../../controllers/User");

const createStory = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    body: { story },
  } = req;

  const newStory = await Story.createStory({
    story: { ...story, author: user._id },
  });
  await User.addCreatedStory({ _id: user._id, storyId: newStory._id });

  res.status(201).send({ story: newStory });
});

module.exports = createStory;
