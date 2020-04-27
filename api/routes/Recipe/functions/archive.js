const Recipe = require("../../../models/RArchive");
const mongoose = require("mongoose");

module.exports = ({
  title,
  body,
  author,
  thumbnail,
  cookingTime,
  description,
  tags,
}) =>
  new Recipe({
    _id: new mongoose.Types.ObjectId(),
    title,
    body,
    author,
    thumbnail,
    cookingTime,
    description,
    tags,
  }).save();
