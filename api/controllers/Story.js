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
 const getpopularIn= ({count, page, time})=>
 Story.find({
   createdAt:{
     $gte:
    new Date(new Date()- new Date.getTimezoneOffset()).getTime() - time,

   },
 })           
 .populate("author")
 .sort({ Likes: -1 })
 .limit(+count)
 .skip(count * (page - 1))
 .exec();


 const getNewestIn= ({count, page, time})=>
 Story.find({
   createdAt: {
     $lte:
     new Date(new Date()- new Date().getTimezoneOffset()).getTime() - time,

   },
 })
 .populate("author")
 .sort({ Likes: -1 })
 .limit(+count)
 .skip(count * (page - 1))
 .exec()
 .then((docs)=>({
   story: docs,
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


const addComment = ({storyId, comment:{author, comment} })=>
Story.updateOne(
  {_id: storyId},
  {
    $push: { comments:[{author, comment: comment}]}
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

const updateStory = ({ _id, ...story }) =>
                    Story.updateOne({ _id }, { $set: story })
                         .exec();


const deleteStory = ({ _id }) => 
                    Story.remove({ _id })
                         .exec();



const getStory = ({_id})=>
    Story.findOne({_id}).populate("author").populate("comments.author").exec();


const like =({author,storyId, likes, totalLikes})=>
  Story.updateOne({_id: recipeId}, 
    {$push: { likedBy: [{author,likes}]}, likes: totalLikes}).exec();

const updateLike = ({ authorId, recipeId,likes, totalLikes})=>
    Story.findByIdAndUpdate({
      _id: recipeId,
    },
    {
      $set:{"likedBy.$[elem].likes":+likes},
      likes: totalLikes
    },
    {
      arrayFilters:[{"elem.author": authorId}],
    });

module.exports={
    getNewestStoriesFeed,
    getPopularStoriesFeed,
    findStories,
    createArchivedStory,
    createStory,
    updateStory,
    deleteStory,
    getStory,
    like,
    updateLike,
    getNewestIn,
    getpopularIn,
    addComment,
};


