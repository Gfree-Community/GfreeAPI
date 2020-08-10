const mongoose = require("mongoose");

const Discussion = require("../models/Discussion");
const ArchivedDiscussion = require("../models/ArchivedDiscussion");

const SELECT_FIELDS_FOR_Discussion_CARD = {
  title: 1,
  author: 1,
  Body: 1,
  createdAt: 1,
  thumbnail: 1,
};

const getAllDiscussionsTitle = () =>
  Discussion.find({}, { title: 1, updatedAt: 1 }).exec();

const getPopularDiscussionsFeed = ({ count, page }) =>
  Discussion.find({}, SELECT_FIELDS_FOR_Discussion_CARD)
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularIn = ({ count, page, time }) =>
  Discussion.find(
    {
      createdAt: {
        $gte:
          new Date(new Date() - new Date().getTimezoneOffset()).getTime() -
          time,
      },
    },
    SELECT_FIELDS_FOR_DISCUSSION_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestDiscussionsFeed = ({ count, page }) =>
  Discussion.find({}, SELECT_FIELDS_FOR_DISCUSSION_CARD)
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getPopularInByTag = ({ count, page, time, tag }) =>
  Discussion.find(
    {
      createdAt: {
        $gte:
          new Date(new Date() - new Date().getTimezoneOffset()).getTime() -
          time,
      },
      tags: {
        $in: [tag],
      },
    },
    SELECT_FIELDS_FOR_DISCUSSION_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getAnyDiscussionsOfTag = ({ count, page, tags }) =>
  Discussion.find(
    {
      tags: {
        $in: tags,
      },
    },
    SELECT_FIELDS_FOR_DISCUSSION_CARD
  )
    .populate("author")
    .sort({ Likes: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getNewestDiscussionsByTag = ({ count, page, tag }) =>
  Discussion.find(
    {
      tags: {
        $in: [tag],
      },
    },
    SELECT_FIELDS_FOR_DISCUSSION_CARD
  )
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(+count)
    .skip(count * (page - 1))
    .exec();

const getDiscussion = ({ _id }) =>
  Discussion.findOne({ _id })
    .populate("author")
    .populate("comments.author")
    .exec();

const findStories = ({ count, page, query }) =>
  Discussion.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" }, ...SELECT_FIELDS_FOR_DISCUSSION_CARD }
  )
    .sort({
      score: { $meta: "textScore" },
    })
    .limit(+count)
    .populate("author")
    .skip(count * (page - 1))
    .exec();

const createArchivedDiscussion = ({ _id, title, body, thumbnail, author }) =>
  new ArchivedDiscussion({
    title,
    body,
    thumbnail,
    author,
    _id: new mongoose.Types.ObjectId(),
  }).save();

const addComment = ({ discussionId, comment: { author, comment } }) =>
  Discussion.updateOne(
    { _id: discussionId },
    {
      $push: { comments: [{ author, comment: comment }] },
    }
  ).exec();

const createDiscussion = ({ discussion }) =>
  new Discussion({
    _id: new mongoose.Types.ObjectId(),
    comments: [],
    likedBy: [],
    likes: 0,
    ...discussion,
  }).save();

const updateDiscussion = ({
  _id,
  discussion: { title, body, thumbnail, tags },
}) =>
  Discussion.findOneAndUpdate(
    { _id },
    {
      $set: {
        title,
        body,
        thumbnail,
        tags,
      },
    },
    { new: true }
  ).exec();

const deleteDiscussion = ({ _id }) => Discussion.remove({ _id }).exec();

const like = ({ author, discussionId, likes, totalLikes }) =>
  Discussion.updateOne(
    { _id: discussionId },
    { $push: { likedBy: [{ author, likes }] }, likes: totalLikes }
  ).exec();

const updateLike = ({ authorId, discussionId, likes, totalLikes }) =>
  Discussion.findByIdAndUpdate(
    {
      _id: discussionId,
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
  getAllDiscussionsTitle,
  getNewestDiscussionsFeed,
  getPopularDiscussionsFeed,
  getNewestDiscussionsByTag,
  getPopularInByTag,
  getAnyDiscussionOfTag,
  getPopularIn,
  findDiscussions,
  getDiscussion,
  createArchivedDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  like,
  updateLike,
  addComment,
};
