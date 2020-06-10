const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const updateStory = router.post("/", async (req, res, next) => {
  const {
    body: { story },
  } = req;
  const updatedStory = await Story.updateStory({
    _id: story._id,
    story,
  });
  res.status(201).send({
    story: updatedStory,
  });
});

module.exports = updateStory;

