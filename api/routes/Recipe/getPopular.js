const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require("../../models/Recipe");
const getpopular = require("../../routes/Recipe/functions/getp");

router.get("/",(req,res,next )=>{
const num = req.body.num;

getpopular(num,res);

});//needs more work 
module.exports= router;
