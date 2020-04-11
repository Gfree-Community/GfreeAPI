const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require("../../models/Recipe");
const like = require("../../routes/Recipe/functions/update");

router.patch("/",(req,res,next )=>{
const id = req.body._id
    like(id,req,res);

});
//this needs reworking