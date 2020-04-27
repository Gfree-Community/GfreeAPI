const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require("../../models/Recipe");
const comment = require("../../routes/Recipe/functions/update");

router.patch("/",(req,res,next )=>{
const id = req.body._id
    comment(id,req,res);

});
module.exports= router;
