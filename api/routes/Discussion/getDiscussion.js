const express = require("express");
const router = express.Router();

const Discussion = require("../../controllers/Discussion");

const createDiscussion = router.post("/", async (req, res, next) => {
  const {
    body: { discussion },
  } = req;

  const foundDiscussion = await Discussion.getDiscussion({
    _id: discussion._id,
  });

  res.status(200).send({ discussion: foundDiscussion });
});

module.exports = createDiscussion;
