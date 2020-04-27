const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const archiveRecipe = require('./api/routes/Recipe/archiveRecipe');
const commentRecipe = require('./api/routes/Recipe/commentRecipe');
const creatRecipe= require('./api/routes/Recipe/creatRcipe');
const getNewRecipe = require('./api/routes/Recipe/getNew');
const getPopularRecipe = require('./api/routes/Recipe/getPopular');
const likeRecipe =  require('./api/routes/Recipe/likes');
const searchRecipe =  require('./api/routes/Recipe/searchRecipe');
const updateRecipe =  require('./api/routes/Recipe/updateRecipe');





//..................................
const pwddb = 'qwert12345A';
mongoose.connect('mongodb+srv://jlo:' + pwddb + '@gfree-5rmfi.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//..................................

app.use(morgan('dev'));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//cors handelling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origins,X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
// routes which should handle requests
app.use('/ArchiveRecipe',archiveRecipe);
app.use('/postCommentOnRecipe',commentRecipe);
app.use('/createRecipe',creatRecipe);
app.use('/getNewestRecipesFeed',getNewRecipe);
app.use('/getPopularRecipesFeed',getPopularRecipe);
app.use('/likeRecipe',likeRecipe);
//app.use('/searchRecipe', searchRecipe);
app.use('/updateRecipe',updateRecipe);

//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
