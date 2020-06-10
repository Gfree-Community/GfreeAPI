const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");
const User = require("../../controllers/User");

const isStoryLiked = ({ user, storyId }) => {
  return user.likedStories.some(({ story }) => {
    return String(story) === String(storyId);
  });
};

const findCurrentLikes = ({ user, storyId }) => {
  for (let story of user.likedStories) {
    if (String(story.story) === String(storyId)) {
      return story.likes;
    }
  }
};

const likeStory = router.post("/", async (req, res, next) => {
  const {
    body: {
      story: { _id: storyId },
      likes,
    },
  } = req;
  const user = req.user;

  /**If User Already Liked the story before */
  const story = await Story.getStory({ _id: storyId });
  if (!story) {
    res.status(404).send({ message: " Story Not found" });
    return;
  }

  if (!isStoryLiked({ user, storyId })) {
    await User.likeStory({ story, _id: user._id, likes });
    await Story.like({
      author: user,
      storyId,
      likes,
      totalLikes: story.likes + likes,
    });
    res.status(201).send({ message: "Story has been liked" });
    return;
  }

  /** if User first time likes the story */
  const oldLikes = findCurrentLikes({ user, storyId });
  await User.updateLikedStory({ storyId, _id: user._id, likes });
  await Story.updateLike({
    authorId: user._id,
    storyId,
    likes,
    totalLikes: story.likes + (likes - oldLikes),
  });
  res.status(201).send({ message: "Story has been liked" });
});

module.exports = likeStory;