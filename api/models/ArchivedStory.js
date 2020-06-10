const mongoose = require("mongoose");
const timestamps = require("../../lib/mongooseTimestamp");
const { Schema } = mongoose;

const ArchivedStorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: false },
    body: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, required: false },
    likedBy: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        likes: {
          type: Number,
          required: true,
        },
      },
    ],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: false },
      },
    ],
    thumbnail: { type: String, required: true },
    readtime: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: timestamps },
  }
);

module.exports = mongoose.model("ArchivedStory", ArchivedStorySchema);
