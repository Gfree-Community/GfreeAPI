const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");
const User = require("../../controllers/User");

const isDiscussionLiked = ({ user, discussionId }) => {
  return user.likedDiscussions.some(({ discussion }) => {
    return String(discussion) === String(discussionId);
  });
};

const findCurrentLikes = ({ user, discussionId }) => {
  for (let discussion of user.likedDiscussions) {
    if (String(discussion.discussion) === String(discussionId)) {
      return discussion.likes;
    }
  }
};

const likeDiscussion = router.post("/", async (req, res, next) => {
  const {
    body: {
      discussion: { _id: discussionId },
      likes,
    },
  } = req;
  const user = req.user;

  /**If User Already Liked the discussion before */
  const discussion = await Discussion.getDiscussion({ _id: discussionId });
  if (!discussion) {
    res.status(404).send({ message: " Discussion Not found" });
    return;
  }

  if (!isDiscussionLiked({ user, discussionId })) {
    await User.likeDiscussion({ discussion, _id: user._id, likes });
    await Discussion.like({
      author: user,
      discussionId,
      likes,
      totalLikes: discussion.likes + likes,
    });
    res.status(201).send({ message: "Discussion has been liked" });
    return;
  }

  /** if User first time likes the discussion */
  const oldLikes = findCurrentLikes({ user, discussionId });
  await User.updateLikedDiscussion({ discussionId, _id: user._id, likes });
  await Discussion.updateLike({
    authorId: user._id,
    discussionId,
    likes,
    totalLikes: discussion.likes + (likes - oldLikes),
  });
  res.status(201).send({ message: "Discussion has been liked" });
});

module.exports = likeDiscussion;
