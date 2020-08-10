const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const deleteDiscussion = router.post("/", async (req, res, next) => {
  const {
    body: {
      discussion: { _id },
    },
  } = req;
  const discussion = await Discussion.getDiscussion({ _id });
  await Discussion.createArchivedDiscussion(discussion);
  await Discussion.deleteDiscussion({ _id });
  res.status(201).send({ message: "Post has been deleted" });
});

module.exports = deleteDiscussion;
