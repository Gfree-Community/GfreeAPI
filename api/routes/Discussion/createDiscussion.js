const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");
const User = require("../../controllers/User");

const createDiscussion = router.post("/", async (req, res, next) => {
  const user = req.user;
  const {
    body: { discussion },
  } = req;

  const newDiscussion = await Discussion.createDiscussion({
    discussion: { ...discussion, author: user._id },
  });
  await User.addCreatedDiscussion({
    _id: user._id,
    discussionId: newDiscussion._id,
  });

  res.status(201).send({ discussion: newDiscussion });
});

module.exports = createDiscussion;
