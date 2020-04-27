const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const SArchiveSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String,required:false},
    body: {type:String,required:false},
    author: {type:String,required:false},
    likedBy:[{fullname:{type:String,required:false}}],
    comments:[{fullname:{type:String,required:false},
                comment:{type:String,required:false}}],
    thumbnail:{type:String,required:false},
    readtime:{type:String,required:false},
    description:{type:String,required:false},
    tags:[{tag:{type:String,required:false}}]    


});

SArchiveSchema.plugin(timestamps);

module.exports= mongoose.model('SArchive', SArchiveSchema);