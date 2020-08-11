const mongoose = require("mongoose");
const timestamps = require("../../lib/mongooseTimestamp");
const { Schema } = mongoose;

const ArchivedDiscussionSchema = mongoose.Schema(
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
    tags: [{ type: String, required: true }],
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: timestamps },
  }
);

ArchivedDiscussionSchema.index({
  title: "text",
  body: "text",
});

module.exports = mongoose.model("ArchivedDiscussion", ArchivedDiscussionSchema);
