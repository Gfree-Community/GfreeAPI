const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Recipe = require("./api/routes/Recipe");

//..................................
const pwddb = "qwert12345A";
mongoose.connect(
  "mongodb+srv://jlo:" +
    pwddb +
    "@gfree-5rmfi.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
//..................................

app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//cors handelling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origins,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// routes which should handle requests
app.use("/getNewestRecipesFeed", Recipe.getNewestRecipesFeed);
app.use("/getPopularRecipesFeed", Recipe.getPopularRecipesFeed);
app.use("/findRecipe", Recipe.findRecipes);
app.use("/updateRecipe", Recipe.updateRecipe);
app.use("/ArchiveRecipe", Recipe.deleteRecipe);
app.use("/createRecipe", Recipe.createRecipe);

//handling errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
