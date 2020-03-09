const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    fullname:{type:String,required:true},
    password:{type: String, required:true},
    about:{type:String,required:true},
    profilePicture:{type:String,required:false},
    stories:[{link:{type:String,required:false}}],
    recipes:[{link:{type:String,required:false}}],
    likedStories:[{link:{type:String,required:false}}],
    likedRecipes:[{link:{type:String,required:false}}],
    permissions:{type:String,required:false}
    
});

UserSchema.plugin(timestamps);

module.exports= mongoose.Schema('User',UserSchema);