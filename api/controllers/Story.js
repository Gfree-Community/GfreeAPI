const mongoose = require("mongoose");

const Story = require("../models/Story");
const ArchivedStory = require("../models/SArchive");

const getNewestStoriesFeed = ({count, page}) =>
    Story.find()
        .sort({ createdAt : -1})
        .lomit(+count)
        .skip(count*(page - 1))
        .exec()
        .then((docs)=>({
            story: docs,
        }));

const getPopularStoriesFeed = ({count, page})=>
        Story.find()
            .sort({Likes: -1})
            .limit(+count)
            .skip(count* (page- 1))
            .exec()
            .then((docs)=>({
                story : docs
            }));

const findStories = ({count, page, query})=>
            Story.find({ title: query})
                .limit(+count)
                .skip(count * (page -1))
                .exec();
                
                
const createArchivedStory = ({ _id, ...story }) =>
            new Story({
                  ...story,
                  _id: new mongoose.Types.ObjectId(),
                    }).save();


const createStory = ({ story }) =>
            new Story({
                      _id: new mongoose.Types.ObjectId(),
                      comments: [],
                      likedBy: [],
                      likes: 0,
                      ...story,
                    }).save();

const updateStory = ({ _id, ...story }) =>
                    Story.updateOne({ _id }, { $set: story })
                         .exec();


const deleteStory = ({ _id }) => 
                    Story.remove({ _id })
                         .exec();

const likeStory = ({ authorId, story, likes }) =>
  Story.updateOne(
    { _id: story._id },
    { $push: { likedBy: { author: authorId, likes } }, $set: { likes: +likes } }
  ).exec();

module.exports={
    getNewestStoriesFeed,
    getPopularStoriesFeed,
    findStories,
    createArchivedStory,
    createStory,
    updateStory,
    deleteStory,
    likeStory
};


