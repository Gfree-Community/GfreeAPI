const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const updateDiscussion = router.post("/", async (req, res, next) => {
  const {
    body: { discussion },
  } = req;
  const updatedDiscussion = await Discussion.updateDiscussion({
    _id: discussion._id,
    discussion,
  });
  res.status(201).send({
    discussion: updatedDiscussion,
  });
});

module.exports = updateDiscussion;
