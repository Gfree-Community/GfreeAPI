const express = require("express");
const router = express.Router();

const Story = require("../../controllers/Story");

const deleteStory = router.post("/", async (req, res, next) => {
  const {
    body: {
      story: { _id },
    },
  } = req;
  const story = await Story.getStory({ _id });
  await Story.createArchivedStory(story);
  await Story.deleteStory({ _id });
  res.status(201).send({ message: "Post has been deleted" });
});

module.exports = deleteStory;

