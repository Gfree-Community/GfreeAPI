const mongoose = require("mongoose");

const Story = require("../models/Story");
const ArchivedStory = require("../models/ArchivedStory");

const getPopularStoriesFeed = ({ count, page }) =>
  Story.find()
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularIn = ({ count, page, time }) =>
  Story.find({
    createdAt: {
      $gte:
        new Date(new Date() - new Date().getTimezoneOffset()).getTime() - time,
    },
  })
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestStoriesFeed = ({ count, page }) =>
  Story.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularInByTag = ({ count, page, time, tag }) =>
  Story.find({
    createdAt: {
      $gte:
        new Date(new Date() - new Date().getTimezoneOffset()).getTime() - time,
    },
    tags: {
      $in: [tag],
    },
  })
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getAnyStoriesOfTag = ({ count, page, tags }) =>
  Story.find({
    tags: {
      $in: tags,
    },
  })
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestStoriesByTag = ({ count, page, tag }) =>
  Story.find({
    tags: {
      $in: [tag],
    },
  })
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getStory = ({ _id }) =>
  Story.findOne({ _id }).populate("author").populate("comments.author").exec();

const findStories = ({ count, page, query }) =>
  Story.find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
    .sort({
      score: { $meta: "textScore" },
    })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const createArchivedStory = ({
  _id,
  title,
  description,
  body,
  readtime,
  thumbnail,
  author,
}) =>
  new ArchivedStory({
    title,
    description,
    body,
    readtime,
    thumbnail,
    author,
    _id: new mongoose.Types.ObjectId(),
  }).save();

const addComment = ({ storyId, comment: { author, comment } }) =>
  Story.updateOne(
    { _id: storyId },
    {
      $push: { comments: [{ author, comment: comment }] },
    }
  ).exec();

const createStory = ({ story }) =>
  new Story({
    _id: new mongoose.Types.ObjectId(),
    comments: [],
    likedBy: [],
    likes: 0,
    ...story,
  }).save();

const updateStory = ({
  _id,
  story: { title, body, thumbnail, readtime, description, tags },
}) =>
  Story.findOneAndUpdate(
    { _id },
    {
      $set: {
        title,
        body,
        thumbnail,
        readtime,
        description,
        tags,
      },
    },
    { new: true }
  ).exec();

const deleteStory = ({ _id }) => Story.remove({ _id }).exec();

const like = ({ author, storyId, likes, totalLikes }) =>
  Story.updateOne(
    { _id: storyId },
    { $push: { likedBy: [{ author, likes }] }, likes: totalLikes }
  ).exec();

const updateLike = ({ authorId, storyId, likes, totalLikes }) =>
  Story.findByIdAndUpdate(
    {
      _id: storyId,
    },
    {
      $set: { "likedBy.$[elem].likes": +likes },
      likes: totalLikes,
    },
    {
      arrayFilters: [{ "elem.author": authorId }],
    }
  );

module.exports = {
  getNewestStoriesFeed,
  getPopularStoriesFeed,
  getNewestStoriesByTag,
  getPopularInByTag,
  getAnyStoriesOfTag,
  getPopularIn,
  findStories,
  getStory,
  createArchivedStory,
  createStory,
  updateStory,
  deleteStory,
  like,
  updateLike,
  addComment,
};
