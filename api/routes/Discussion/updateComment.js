const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const updateComment = router.post("/", async (req, res, next) => {
  const {
    body: {
      discussion: { _id, commentId, updatedComment },
    },
  } = req;

  await Discussion.updateComment({ _id, commentId, updatedComment });
  res.status(201).send({ message: "Comment has been updated" });
});

module.exports = updateComment;;
