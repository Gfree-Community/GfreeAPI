const mongoose = require("mongoose");
const timestamps = require("../../lib/mongooseTimestamp");

const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String, required: false },
    profilePicture: { type: String, required: false },
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    discussions: [{ type: Schema.Types.ObjectId, ref: "Discussion" }],
    links: {
      website: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
    likedStories: [
      {
        story: { type: Schema.Types.ObjectId, ref: "Story" },
        likes: { type: Number, default: 0 },
      },
    ],
    likedDiscussions: [
      {
        discussion: { type: Schema.Types.ObjectId, ref: "Story" },
        likes: { type: Number, default: 0 },
      },
    ],
    likedRecipes: [
      {
        recipe: {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
        },
        likes: { type: Number, default: 0 },
      },
    ],
    permissions: { type: String, required: false },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: timestamps },
  }
);

UserSchema.plugin(timestamps);

module.exports = mongoose.model("User", UserSchema);
