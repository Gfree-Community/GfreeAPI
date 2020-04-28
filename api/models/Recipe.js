const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { Schema } = mongoose;
const RecipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  body: {
    ingrdients: { type: String, required: true },
    preparations: { type: String, required: true },
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  Likes: { type: Number, required: false },
  likedBy: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User" },
      likes: {
        type: Number,
        required: true,
      },
    },
  ],
  recipeComments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: false },
    },
  ],
  thumbnail: { type: String, required: true },
  cookingTime: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ tag: { type: String, required: true } }],
});
RecipeSchema.plugin(timestamps);

module.exports = mongoose.model("Recipe", RecipeSchema);
