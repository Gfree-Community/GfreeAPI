const Story = require("../../../models/Story");
const mongoose = require("mongoose");

module.exports = (num, res) => {
  Story.find()
    .sort({ createdAt: 1 })
    .limit(+num)
    .exec()
    .then((docs) => {
      const response = {
        count: docs.lenght,
        recipe: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            body: doc.body,
            author: doc.author,
            likedBy: doc.likedBy,
            comments: doc.comments,
            thumbnail: doc.thumbnail,
            readtime: doc.readtime,
            description: doc.description,
            tags: doc.tags,
          };
        }),
      };
      res.status(200).json(response);
    });
};
