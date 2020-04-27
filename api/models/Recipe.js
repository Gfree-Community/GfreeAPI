const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const RecipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: false },
  body: { type: String, required: false },
  author: { type: String, required: false },
  Likes: { type: Number, required: false },
  likedBy: [{ fullname: { type: String, required: false } }],
  recipeComments: [
    {
      fullname: { type: String, required: false },
      comment: { type: String, required: false },
    },
  ],
  thumbnail: { type: String, required: false },
  cookingTime: { type: String, required: false },
  description: { type: String, required: false },
  tags: [{ tag: { type: String, required: false } }],
});
RecipeSchema.plugin(timestamps);

module.exports = mongoose.model("Recipe", RecipeSchema);
